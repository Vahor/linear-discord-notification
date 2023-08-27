import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        PORT: z.coerce.number().default(8080),
        HOSTNAME: z.string().default('0.0.0.0'),
        LINEAR_SIGNING_SECRET: z.string().optional(),
        DISCORD_WEBHOOK_URL: z.string(),
    },
    runtimeEnv: process.env,
});