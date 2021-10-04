import { Command, flags } from "@oclif/command";
import PrettyError from "pretty-error";
import { enableService } from "../../lib/google-cloud";
import prettyjson from "prettyjson";

export default class EnableService extends Command {
  static description =
    "updates a projects billing account using GOOGLE_APPLICATION_CREDENTIALS env var";

  static flags = {
    projectNumber: flags.string({
      required: true,
      description: "The project number",
    }),
    service: flags.string({
      required: true,
      description: "The service to enable",
    }),
  };

  async run() {
    const { flags } = this.parse(EnableService);
    const { projectNumber, service } = flags;

    if (typeof process.env.GOOGLE_APPLICATION_CREDENTIALS !== "string") {
      this.error(`GOOGLE_APPLICATION_CREDENTIALS needs to be set`);
    }

    console.log(projectNumber, service);

    try {
      this.log(
        prettyjson.render(await enableService({ projectNumber, service }))
      );
    } catch (e) {
      this.error(new PrettyError().render(e));
    }
  }
}
