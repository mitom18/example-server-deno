import { connect } from "./deps.ts";
import config from "./config.ts";

export const db = await connect({
    type: "mysql",
    port: 3306,
    hostname: config.DB_HOST,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
});

export const dbManager = db.getManager();
