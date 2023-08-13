import { readdirSync } from "fs";
import { CustomClient } from "./CustomClient";
import { sep } from "path";
import { Event } from "./Event";

export class EventHandler {
    private _client: CustomClient;

    public constructor(client: CustomClient) {
        this._client = client;
    }

    public loadEvents() {
        readdirSync(this._client.loadingSettings.eventsPath).map(async (category: string) => {
            const events = readdirSync(`${this._client.loadingSettings.eventsPath}${sep}${category}${sep}`).filter((files: string) => files.endsWith('.js'));

            for (const file of events) {
                const event: Event = new ((await import(`${this._client.loadingSettings.eventsPath}${sep}${category}${sep}${file}`)).default);

                if (event.options.once) {
                    this._client.once(event.name, event.run.bind(null, this._client));
                } else {
                    this._client.on(event.name, event.run.bind(null, this._client));
                }

                console.log(`[SYSTEM] - Evénement ${event.name} de la catégorie "${event.options.category.toUpperCase()}" chargée avec succès.`);
            }
        });
    }
}