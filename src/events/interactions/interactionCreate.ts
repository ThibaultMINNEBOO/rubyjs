import { BaseInteraction } from "discord.js";
import { CustomClient } from "../../structures/CustomClient";
import { Event, EventCategory } from "../../structures/Event";
import { ClientCommands } from "../../../types/Client";
import { Command } from "../../structures/Command";

export default class InteractionCreateEvent extends Event {
    public constructor() {
        super('interactionCreate', {
            once: false,
            category: EventCategory.INTERACTIONS
        });
    }

    public run(client: CustomClient, interaction: BaseInteraction) {
        if (interaction.isCommand()) {
            const cmd = client.commands.find((c: Command) => {
                return c.metadata.name === interaction.commandName
            });
            
            cmd.run(interaction);
        }
    }
}