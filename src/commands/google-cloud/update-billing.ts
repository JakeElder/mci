import { Command, flags } from "@oclif/command";
import PrettyError from "pretty-error";
import { updateBilling } from "../../lib/google-cloud";
import prettyjson from "prettyjson";

export default class SetupProject extends Command {
  static description =
    "updates a projects billing account using GOOGLE_APPLICATION_CREDENTIALS env var";

  static flags = {
    projectId: flags.string({
      required: true,
      description: "The id of the project",
    }),
    billingAccountName: flags.string({
      required: true,
      description: "The billing account to set",
    }),
  };

  async run() {
    const { flags } = this.parse(SetupProject);
    const { projectId, billingAccountName } = flags;

    if (typeof process.env.GOOGLE_APPLICATION_CREDENTIALS !== "string") {
      this.error(`GOOGLE_APPLICATION_CREDENTIALS needs to be set`);
    }

    try {
      this.log(
        prettyjson.render(
          await updateBilling({ projectId, billingAccountName })
        )
      );
    } catch (e) {
      this.error(new PrettyError().render(e));
    }
  }
}
