import { Pool } from "pg";
let conn;

if (!conn) {
  conn = new Pool({
    user: "postgres",
    password: "romantico",
    host: "localhost",
    port: 5432,
    database: "TaskDB",
  });
}

export { conn };
