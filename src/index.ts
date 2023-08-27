import {type Serve, type Server} from "bun";
import {type Payload, PayloadSchema} from "./payload";
import {handleDiscordPayload} from "./discord";
import {ZodError} from "zod";
import {env} from "./env";
import * as crypto from "crypto";

declare global {
    var server: Server;
}


// define server parameters
const serveOptions: Serve = {
    hostname: env.HOSTNAME,
    port: env.PORT,
    async fetch(req) {
        // check method
        if (req.method !== 'POST') {
            return new Response('Method Not Allowed', {status: 405});
        }

        const rawBody = await req.text();

        // check headers
        if (env.LINEAR_SIGNING_SECRET) {
            const headerSignature = req.headers.get('linear-signature');
            const signature = crypto.createHmac("sha256", env.LINEAR_SIGNING_SECRET).update(rawBody).digest("hex");
            if (!signature || signature !== headerSignature) {
                return new Response('Unauthorized', {status: 401});
            }
        }

        const url = new URL(req.url);
        const {pathname} = url;

        let payload: Payload | null = null;
        try {
            const jsonBody = JSON.parse(rawBody);
            payload = PayloadSchema.parse(jsonBody);
        } catch (e) {
            console.log(e);
            if (e instanceof ZodError) {
                return Response.json({
                    message: 'Invalid Payload',
                    error: e.errors,
                }, {
                    status: 400,
                });
            } else {
                return Response.json({
                    message: 'Bad Request',
                    error: (e as Error).message ?? 'Unknown error',
                }, {
                    status: 400,
                });
            }
        }

        // check path
        if (pathname === '/discord') {
            return handleDiscordPayload(payload);
        }

        return Response.json({
            message: 'Not Found',
            error: 'The requested resource could not be found.',
        }, {
            status: 404,
        });
    },
};

if (!globalThis.server) {
    globalThis.server = Bun.serve(serveOptions);
} else {
    globalThis.server.reload(serveOptions);
}

console.log(`Server started at http://${serveOptions.hostname}:${serveOptions.port}`);