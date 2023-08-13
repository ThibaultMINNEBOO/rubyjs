import { Client, Guild, REST, Routes } from "discord.js";
import { ClientCommands, ClientLoadingSettings } from "../../types/Client";
import { CommandHandler } from "./CommandHandler";
import { EventHandler } from "./EventHandler";
import { Sequelize } from 'sequelize';
import { Database } from "./Database";

export class CustomClient extends Client {
    private _token: string;
    private _commands: ClientCommands;
    private _loadingSettings: ClientLoadingSettings;
    private _db: Sequelize;

    public constructor(token: string, loadingSettings: ClientLoadingSettings) {
        super({
            intents: 3243773
        });
        this._token = token;
        this._loadingSettings = loadingSettings;
        this._commands = CommandHandler.loadCommands(this._loadingSettings.commandsPath);
        this._db = Database.start();
    }

    public get commands(): ClientCommands {
        return this._commands;
    }

    public get loadingSettings(): ClientLoadingSettings {
        return this._loadingSettings;
    }

    public get db(): Sequelize {
        return this._db;
    }

    public launch(): void {
        this.login(this._token).then(() => {
            console.log(`[SYSTEM] - Logged as ${this.user.username}`);
            this.registerCommands();
            const eventHandler = new EventHandler(this);
            eventHandler.loadEvents();
        });
    }

    private registerCommands() {
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
        const cmds = this.commands.map(cmd => cmd.metadata);

        this.guilds.cache.forEach((guild: Guild) => {
            rest.put(Routes.applicationGuildCommands(this.user.id, guild.id), { body: cmds }).then(() => {
                console.log(`[SYSTEM] - Slash commands (/) are enabled on ${guild.name}.`);
            });
        });
    }
}