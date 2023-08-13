import { CustomClient } from "./structures/CustomClient";

const client = new CustomClient(process.env.TOKEN, {
    commandsPath: __dirname + '/commands',
    eventsPath: __dirname + '/events'
});

client.launch();