import { Command } from "@oclif/command";
import PrettyError from "pretty-error";
import { getProject } from "../../lib/vercel";
import prettyjson from "prettyjson";

export default class GetProject extends Command {
  static description = "gets a project using the VERCEL_TOKEN env variables";

  static args = [
    {
      name: "id",
      required: true,
      description: "The project Id",
    },
  ];

  async run() {
    const { args } = this.parse(GetProject);
    const { id } = args;

    if (typeof process.env.VERCEL_TOKEN !== "string") {
      this.error(`VERCEL_TOKEN needs to be set`);
    }

    try {
      this.log(prettyjson.render(await getProject(id)));
    } catch (e) {
      this.error(new PrettyError().render(e));
    }
  }
}
