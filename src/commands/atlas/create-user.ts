import { Command, flags } from "@oclif/command";
import PrettyError from "pretty-error";
import { setAuth, createUser } from "../../lib/atlas";
import prettyjson from "prettyjson";

export default class CreateUser extends Command {
  static description =
    "Creates a user using the MONGO_USER_ID and MONGO_USER_TOKEN env variables. Sets dbAdmin and readWrite roles on database of the same name";

  static flags = {
    projectId: flags.string({
      required: true,
      description: "The project Id",
    }),
    name: flags.string({
      required: true,
      description: "The users name",
    }),
    password: flags.string({
      required: true,
      description: "The users password",
    }),
  };

  async run() {
    const { flags } = this.parse(CreateUser);
    const { projectId, name, password } = flags;

    if (
      typeof process.env.MONGO_USER_ID !== "string" ||
      typeof process.env.MONGO_USER_TOKEN !== "string"
    ) {
      this.error(`MONGO_USER_ID and MONGO_USER_TOKEN need to be set`);
    }

    try {
      setAuth(process.env.MONGO_USER_ID, process.env.MONGO_USER_TOKEN);
      const res = await createUser(projectId, name, password);
      this.log(prettyjson.render(res));
    } catch (e) {
      this.error(new PrettyError().render(e));
    }
  }
}
