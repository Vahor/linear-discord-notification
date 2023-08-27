import type {Payload} from "../payload";
import {onIssueCreated} from "./action/create";

export const handleDiscordPayload = async (payload: Payload): Promise<Response> => {
    switch (payload.action) {
        case "create": {
            await onIssueCreated(payload)
        }
    }

    return new Response('ok');
}