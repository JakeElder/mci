import { Command } from "@oclif/command";
import PrettyError from "pretty-error";
import { setAuth, getUser } from "../../lib/atlas";
import prettyjson from "prettyjson";

export default class GetUser extends Command {
  static description =
    "gets a user using the MONGO_USER_ID and MONGO_USER_TOKEN env variables";

  static args = [
    {
      name: "projectId",
      required: true,
      description: "The project Id",
    },
    {
      name: "name",
      required: true,
      description: "The users name",
    },
  ];

  async run() {
    const { args } = this.parse(GetUser);
    const { projectId, name } = args;

    if (
      typeof process.env.MONGO_USER_ID !== "string" ||
      typeof process.env.MONGO_USER_TOKEN !== "string"
    ) {
      this.error(`MONGO_USER_ID and MONGO_USER_TOKEN need to be set`);
    }

    try {
      setAuth(process.env.MONGO_USER_ID, process.env.MONGO_USER_TOKEN);
      this.log(prettyjson.render(await getUser(projectId, name)));
    } catch (e) {
      this.error(new PrettyError().render(e));
    }
  }
}
