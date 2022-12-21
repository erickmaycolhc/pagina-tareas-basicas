import { Pool } from "pg";
let conn;

if (!conn) {
  conn = new Pool({
    user: "postgres",
    password: "CLqpNpa90TVxY6YRsFNr",
    host: "containers-us-west-160.railway.app",
    port: 6224,
    database: "railway",
  });
}

export { conn };
