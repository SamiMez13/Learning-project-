import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: Number(process.env.port ?? 4000),
    isProduction: (process.env.NOD_ENV ?? "development") === "production",
    nodeEnv: (process.env.NOD_ENV ?? "development"),
    logLevel: process.env.LOG_LEVEL ?? "info",
} as const;