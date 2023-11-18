import { writeFileSync } from "fs";
import dayjs from "dayjs";

export default class Logger {
  public static async success(type: string, message: string) {
    try {
      await writeFileSync('logs.txt', `{${dayjs(Date.now()).format('HH:mm:ss')}} : [${type.toUpperCase()}] - ${message}\n`, {
        flag: "a+",
        mode: 0o666
      });
      console.log(`[${type.toUpperCase()}] - ${message}`);
    } catch (err) {
      console.error(`An error has occured : ${err}`)
    }
  }

  public static async header(message: string) {
    try {
      await writeFileSync(
        "logs.txt",
        `============= ${message} =============\n`,
        {
          flag: "a+",
          mode: 0o666,
        }
      );
      console.log(`============= ${message} =============`);
    } catch (err) {
      console.error(`An error has occured : ${err}`)
    }
  }
}