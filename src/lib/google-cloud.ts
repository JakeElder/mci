import delay from "delay";
import { cloudresourcemanager_v1, google } from "googleapis";

type Schema$Project = cloudresourcemanager_v1.Schema$Project;

class OperationNotCompleteError extends Error {}
class InvalidOperationError extends Error {}
class InvalidProjectError extends Error {}

export async function getAuth(scopes: string[] = []) {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform", ...scopes],
  });
  return await auth.getClient();
}

async function checkOperation<T>(operationName: string): Promise<T | null> {
  const resourcemanager = google.cloudresourcemanager("v1");
  const { data: operation } = await resourcemanager.operations.get({
    name: operationName,
    auth: await getAuth(),
  });
  if (operation.done) {
    return operation.response as T;
  }
  return null;
}

async function operationResult<T>(name: string, attempt = 1): Promise<T> {
  const operation = await checkOperation<T>(name);
  if (operation !== null) {
    return operation;
  }
  await delay(3000);
  if (attempt <= 5) {
    return await operationResult<T>(name, attempt + 1);
  }
  throw new OperationNotCompleteError();
}

export async function getProject(id: string) {
  const resourcemanager = google.cloudresourcemanager("v1");
  try {
    const res = await resourcemanager.projects.get({
      projectId: id,
      auth: await getAuth(),
    });
    return res.data;
  } catch (e) {
    return null;
  }
}

export async function createProject({
  name,
  id,
}: {
  name: string;
  id: string;
}) {
  const resourcemanager = google.cloudresourcemanager("v1");

  const { data: operation } = await resourcemanager.projects.create({
    requestBody: {
      name,
      projectId: id,
      parent: { type: "folder", id: process.env.GOOGLE_CLOUD_PARENT_FOLDER_ID },
    },
    auth: await getAuth(),
  });

  if (typeof operation.name !== "string") {
    throw new InvalidOperationError();
  }

  return await operationResult<Schema$Project>(operation.name);
}

export async function updateBilling({
  projectId,
  billingAccountName,
}: {
  projectId: string;
  billingAccountName: string;
}) {
  console.log(`enabling billing`);
  const cloudbilling = google.cloudbilling("v1");
  try {
    const r = await cloudbilling.projects.updateBillingInfo({
      name: `projects/${projectId}`,
      requestBody: {
        name: `projects/${projectId}/billingInfo`,
        projectId,
        billingAccountName,
        billingEnabled: true,
      },
      auth: await getAuth(["https://www.googleapis.com/auth/cloud-billing"]),
    });
    console.log(r);
  } catch (e) {
    console.log(e);
  }
}

export async function enableService({
  projectNumber,
  service,
}: {
  projectNumber: string;
  service: string;
}) {
  console.log(`enabling ${service}`);
  const serviceusage = google.serviceusage("v1");
  const r = await serviceusage.services.enable({
    name: `projects/${projectNumber}/services/${service}`,
    auth: await getAuth(["https://www.googleapis.com/auth/service.management"]),
  });
  return r;
}

export async function createApp({ projectId }: { projectId: string }) {
  const appengine = google.appengine("v1");
  return appengine.apps.create({
    requestBody: {
      id: projectId,
      locationId: "asia-south1",
    },
    auth: await getAuth(),
  });
}

export async function setupProject(
  name: string,
  id: string
): Promise<Schema$Project> {
  let project: Schema$Project;

  project = await createProject({ name, id });

  if (
    typeof project.createTime !== "string" ||
    typeof project.projectNumber !== "string" ||
    typeof project.projectId !== "string"
  ) {
    throw new InvalidProjectError();
  }

  await enableService({
    projectNumber: project.projectNumber,
    service: "cloudbilling.googleapis.com",
  });

  await updateBilling({
    projectId: project.projectId,
    billingAccountName: process.env.GOOGLE_CLOUD_BILLING_ACCOUNT_ID as string,
  });

  await enableService({
    projectNumber: project.projectNumber,
    service: "appengine.googleapis.com",
  });

  await enableService({
    projectNumber: project.projectNumber,
    service: "cloudbuild.googleapis.com",
  });

  await createApp({ projectId: project.projectId });

  return project;
}
