import { Pool } from "pg";
let conn;

if (!conn) {
  conn = new Pool({
    user: "postgres",
    password: "ckx6tNyFZQ7YblkrCBw0GdkG11Le5Jum",
    host: "db.gbpraqjsciyeubgwdjxn.supabase.co",
    port: 5432,
    database: "postgres",
  });
}

export { conn };
