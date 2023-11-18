import { ActivityType } from "discord.js";
import { CustomClient } from "../../structures/CustomClient";
import { Event, EventCategory } from "../../structures/Event";
export default class ReadyEvent extends Event {
    public constructor() {
        super('ready', {
            once: true,
            category: EventCategory.MISC
        });
    }

    public run(client: CustomClient) {
        client.user.setPresence({
            status: "dnd",
            activities: [
                {
                    name: "Modération de X serveurs",
                    type: ActivityType.Streaming
                }
            ]
        })
    }
}