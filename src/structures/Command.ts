import { ApplicationCommandData, CommandInteraction } from "discord.js";
import { CustomClient } from "./CustomClient";

export abstract class Command {
    private _metadata: ApplicationCommandData;

    public constructor(metadata: ApplicationCommandData) {
        this._metadata = metadata;
    }

    public get metadata(): ApplicationCommandData {
        return this._metadata;
    }

    public abstract run(client: CustomClient, interaction: CommandInteraction);
}