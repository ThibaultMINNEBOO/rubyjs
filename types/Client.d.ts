import { Command } from "../src/structures/Command";

export interface ClientLoadingSettings {
    commandsPath: string;
    eventsPath: string;
}

export type ClientCommands = Command[];