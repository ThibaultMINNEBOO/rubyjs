import { ApplicationCommandOptionType, BaseInteraction, CacheType, CommandInteraction, PermissionFlagsBits } from "discord.js";
import { Command } from "../../structures/Command";

export default class PingCommand extends Command {
    public constructor() {
        super({
            name: "ping",
            dmPermission: false,
            description: "Affiche la latence actuelle du bot."
        });
    }

    public run(interaction: CommandInteraction) {
        interaction.reply({
            ephemeral: false,
            content: `:ping_pong: Pong! Ma latence est de \`${interaction.client.ws.ping} ms\` !`
        });
    }
}