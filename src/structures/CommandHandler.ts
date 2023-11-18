import { readdirSync } from "fs";
import { join } from "path";
import { ClientCommands } from "../../types/Client";
import { Command } from "./Command";

export class CommandHandler {
    public static loadCommands(commandsPath: string) {
        const cmds: ClientCommands = [];

        readdirSync(commandsPath).map(async (category: string) => {
            const commands = readdirSync(join(commandsPath, category)).filter((files: string) => files.endsWith('.js'));
            for (const file of commands) {
                const command: Command = new ((await import(join(commandsPath, category, file))).default);
                
                cmds.push(command);
            }
        });

        return cmds;
    }
}