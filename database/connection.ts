import { Pool } from "pg";
let conn;

if (!conn) {
  conn = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || ""),
    database: process.env.PG_DATABASE,
  });
}

export { conn };
