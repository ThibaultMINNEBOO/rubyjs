import dayjs from "dayjs";
import { CustomClient } from "./structures/CustomClient";
import Logger from "./utils/Logger";

const client = new CustomClient(process.env.TOKEN, {
    commandsPath: __dirname + '/commands',
    eventsPath: __dirname + '/events'
});

Logger.header(`Session #${Date.now()}`)

client.launch();