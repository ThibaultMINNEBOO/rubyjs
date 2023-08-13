import { readdirSync } from "fs";
import { sep } from "path";
import { ClientCommands } from "../../types/Client";
import { Command } from "./Command";

export class CommandHandler {
    public static loadCommands(commandsPath: string) {
        const cmds: ClientCommands = [];

        readdirSync(commandsPath).map(async (category: string) => {
            const commands = readdirSync(`${commandsPath}${sep}${category}${sep}`).filter((files: string) => files.endsWith('.js'));
            for (const file of commands) {
                const command: Command = new ((await import(`${commandsPath}${sep}${category}${sep}${file}`)).default);
                
                cmds.push(command);
            }
        });

        return cmds;
    }
}