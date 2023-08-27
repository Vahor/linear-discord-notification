import type {Payload} from "../../payload";
import {env} from "../../env";

export const onIssueCreated = async (payload: Payload) => {
    const discordPayload = buildPayload(payload);

    await fetch(env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(discordPayload),
    })
}

const buildPayload = (payload: Payload) => {
    return {
        content: null,
        embeds: [
            {
                title: payload.data.title,
                url: payload.url,
                color: 6187730,
                fields: [
                    {
                        name: "Description",
                        value: payload.data.description,
                    },
                    {
                        name: "Priority",
                        value: payload.data.priorityLabel,
                        inline: true,
                    },
                    {
                        name: "State",
                        value: payload.data.state.name,
                        inline: true,
                    }
                ],
            },
        ],
        username: "Linear",
        attachments: [],
        avatar_url: "https://github.com/Vahor/linear-discord-notification/.github/assets/linear-app-icon.png",
    }
}