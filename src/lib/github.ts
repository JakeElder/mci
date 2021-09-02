import { Octokit } from "octokit";

export async function getRepo(id: string) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const [owner, repo] = id.split("/");
  const r = await octokit.rest.repos.get({ owner, repo });
  return r.data;
}
