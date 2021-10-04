import { Command, flags } from "@oclif/command";
import PrettyError from "pretty-error";
import { setupProject } from "../../lib/google-cloud";
import prettyjson from "prettyjson";

export default class SetupProject extends Command {
  static description =
    "sets up a Google Cloud project using GOOGLE_APPLICATION_CREDENTIALS GOOGLE_CLOUD_PARENT_FOLDER_ID and GOOGLE_CLOUD_BILLING_ACCOUNT_ID";

  static flags = {
    name: flags.string({
      required: true,
      description: "The name of the project",
    }),
    id: flags.string({
      required: true,
      description: "The project Id",
    }),
  };

  async run() {
    const { flags } = this.parse(SetupProject);
    const { id, name } = flags;

    if (
      typeof process.env.GOOGLE_APPLICATION_CREDENTIALS !== "string" ||
      typeof process.env.GOOGLE_CLOUD_PARENT_FOLDER_ID !== "string" ||
      typeof process.env.GOOGLE_CLOUD_BILLING_ACCOUNT_ID !== "string"
    ) {
      this.error(
        `GOOGLE_APPLICATION_CREDENTIALS, GOOGLE_CLOUD_PARENT_FOLDER_ID and GOOGLE_CLOUD_BILLING_ACCOUNT_ID need to be set`
      );
    }

    try {
      this.log(prettyjson.render(await setupProject(name, id)));
    } catch (e) {
      this.error(new PrettyError().render(e));
    }
  }
}
