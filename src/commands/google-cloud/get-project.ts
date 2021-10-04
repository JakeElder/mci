import { Command } from "@oclif/command";
import PrettyError from "pretty-error";
import { getProject } from "../../lib/google-cloud";
import prettyjson from "prettyjson";

export default class GetProject extends Command {
  static description =
    "gets up a Google Cloud project using GOOGLE_APPLICATION_CREDENTIALS";

  static args = [
    {
      name: "id",
      required: true,
      description: "The name of the project",
    },
  ];

  async run() {
    const { args } = this.parse(GetProject);
    const { id } = args;

    if (typeof process.env.GOOGLE_APPLICATION_CREDENTIALS !== "string") {
      this.error(`GOOGLE_APPLICATION_CREDENTIALS needs to be set`);
    }

    try {
      this.log(prettyjson.render(await getProject(id)));
    } catch (e) {
      this.error(new PrettyError().render(e));
    }
  }
}
