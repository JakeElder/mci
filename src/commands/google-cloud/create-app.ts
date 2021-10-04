import { Command, flags } from "@oclif/command";
import PrettyError from "pretty-error";
import { createApp } from "../../lib/google-cloud";
import prettyjson from "prettyjson";

export default class EnableService extends Command {
  static description =
    "updates a projects billing account using GOOGLE_APPLICATION_CREDENTIALS env var";

  static flags = {
    projectId: flags.string({
      required: true,
      description: "The parent project Id",
    }),
  };

  async run() {
    const { flags } = this.parse(EnableService);
    const { projectId } = flags;

    if (typeof process.env.GOOGLE_APPLICATION_CREDENTIALS !== "string") {
      this.error(`GOOGLE_APPLICATION_CREDENTIALS needs to be set`);
    }

    try {
      this.log(prettyjson.render(await createApp({ projectId })));
    } catch (e) {
      this.error(new PrettyError().render(e));
    }
  }
}
