import { Client, REST } from "discord.js";
import { ClientLoadingSettings } from "../../types/Client";

export class CustomClient extends Client {
    private _token: string;
    private _commands: Map<string, string>;
    private _loadingSettings: ClientLoadingSettings;

    public constructor(token: string, loadingSettings: ClientLoadingSettings) {
        super({
            intents: 3243773
        });
        this._token = token;
        this._commands = new Map<string, string>();
        this._loadingSettings = loadingSettings;
    }

    public get commands(): Map<string, string> {
        return this._commands;
    }

    public launch(): void {
        this.login(this._token).then(() => {
            console.log(`[SYSTEM] - Logged as ${this.user.username}`);
        });
    }

    private registerCommands() {
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
        
    }
}