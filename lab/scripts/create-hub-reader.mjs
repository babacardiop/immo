// Creates (or rotates) the read-only Postgres role the lab uses to check logins
// against the hub "User" table. Column-level SELECT only — no writes, no other tables.
// Usage: HUB_OWNER_DATABASE_URL=<hub owner, direct URL> node scripts/create-hub-reader.mjs
// Prints nothing secret; appends HUB_AUTH_DATABASE_URL to lab/.env.
import { randomBytes } from "node:crypto";
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import pg from "pg";

const ownerUrl = process.env.HUB_OWNER_DATABASE_URL;
if (!ownerUrl) throw new Error("HUB_OWNER_DATABASE_URL is required");

const ROLE = "lab_hub_reader";
const password = randomBytes(24).toString("base64url");
const client = new pg.Client({ connectionString: ownerUrl });
await client.connect();
const { rows } = await client.query("select 1 from pg_roles where rolname = $1", [ROLE]);
const verb = rows.length ? "ALTER" : "CREATE";
await client.query(`${verb} ROLE ${ROLE} WITH LOGIN PASSWORD '${password}'`);
const db = (await client.query("select current_database() as d")).rows[0].d;
await client.query(`GRANT CONNECT ON DATABASE "${db}" TO ${ROLE}`);
await client.query(`GRANT USAGE ON SCHEMA public TO ${ROLE}`);
await client.query(
  `GRANT SELECT ("id", "email", "name", "role", "labAccess", "passwordHash") ON "User" TO ${ROLE}`,
);
await client.end();

const u = new URL(ownerUrl);
u.username = ROLE;
u.password = password;
if (!u.hostname.includes("-pooler")) u.hostname = u.hostname.replace(/^([^.]+)/, "$1-pooler");
const line = `HUB_AUTH_DATABASE_URL="${u.toString()}"`;
const envPath = new URL("../.env", import.meta.url);
let env = "";
try { env = readFileSync(envPath, "utf8"); } catch {}
if (/^HUB_AUTH_DATABASE_URL=/m.test(env)) {
  writeFileSync(envPath, env.replace(/^HUB_AUTH_DATABASE_URL=.*$/m, line));
} else {
  appendFileSync(envPath, `${env.endsWith("\n") || !env ? "" : "\n"}${line}\n`);
}
console.log(`${verb === "CREATE" ? "Created" : "Rotated"} ${ROLE} on ${db}; wrote HUB_AUTH_DATABASE_URL to lab/.env`);
