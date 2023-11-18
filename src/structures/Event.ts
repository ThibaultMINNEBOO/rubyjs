import { ClientEvents } from "discord.js";
import { EventOptions } from "../../types/Event";
import { CustomClient } from "./CustomClient";

export abstract class Event {
    private _name: keyof ClientEvents;
    private _options: EventOptions;

    public constructor(name: keyof ClientEvents, options: EventOptions) {
        this._name = name;
        this._options = options;
    }

    public get name(): string {
        return this._name;
    }

    public get options(): EventOptions {
        return this._options;
    }

    public abstract run(client: CustomClient, ...args: any[]);
}

export enum EventCategory {
  MISC = "Misc",
  CUSTOM = "Custom",
  GUILD = "Guild",
  INTERACTIONS = "Interactions",
  MESSAGE = "Message",
  REACTIONS = "Réactions",
}
