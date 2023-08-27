import { type Serve, type Server } from "bun";

declare global {
    var server: Server;
}


// define server parameters
const serveOptions: Serve = {
    hostname: '0.0.0.0',
    port: process.env.PORT ?? 8080,
    fetch(req) {
        const url = new URL(req.url);
        return new Response(JSON.stringify(url));
    },
};

if (!globalThis.server) {
    globalThis.server = Bun.serve(serveOptions);
} else {
    globalThis.server.reload(serveOptions);
}

console.log(`Server started at http://${serveOptions.hostname}:${serveOptions.port}`);