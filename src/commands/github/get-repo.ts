import { Command } from "@oclif/command";
import PrettyError from "pretty-error";
import { getRepo } from "../../lib/github";
import prettyjson from "prettyjson";

export default class GetRepo extends Command {
  static description = "gets a repo using the GITHUB_TOKEN env variable";

  static args = [
    {
      name: "id",
      required: true,
      description: "The repo to retrieve, in org/repo format",
    },
  ];

  async run() {
    const { args } = this.parse(GetRepo);

    const { id } = args;

    try {
      this.log(prettyjson.render(await getRepo(id)));
    } catch (e) {
      this.error(new PrettyError().render(e));
    }
  }
}
