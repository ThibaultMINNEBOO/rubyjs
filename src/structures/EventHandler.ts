import { readdirSync, writeFileSync } from "fs";
import { CustomClient } from "./CustomClient";
import { join } from "path";
import { Event } from "./Event";
import Logger from "../utils/Logger";

export class EventHandler {
    private _client: CustomClient;

    public constructor(client: CustomClient) {
        this._client = client;
    }

    public loadEvents() {
        readdirSync(this._client.loadingSettings.eventsPath).map(async (category: string) => {
            const events = readdirSync(join(this._client.loadingSettings.eventsPath, category)).filter((files: string) => files.endsWith('.js'));

            for (const file of events) {
                const event: Event = new ((await import(join(this._client.loadingSettings.eventsPath, category, file))).default);

                if (event.options.once) {
                    this._client.once(event.name, event.run.bind(null, this._client));
                } else {
                    this._client.on(event.name, event.run.bind(null, this._client));
                }

                const message = `Event ${event.name} loaded successfuly.`;
                Logger.success('system', message);
            }
        });
    }
}