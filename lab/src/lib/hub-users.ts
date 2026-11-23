import pg from "pg";

/**
 * Read-only access to hub identities (role lab_hub_reader: SELECT on a few
 * "User" columns). The lab never writes to — or migrates — the hub DB.
 */
const g = globalThis as unknown as { hubPool?: pg.Pool };

function pool() {
  if (!g.hubPool) {
    const connectionString = process.env.HUB_AUTH_DATABASE_URL;
    if (!connectionString) throw new Error("HUB_AUTH_DATABASE_URL is not set");
    g.hubPool = new pg.Pool({ connectionString, max: 3 });
  }
  return g.hubPool;
}

export type HubUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  labAccess: boolean;
  passwordHash: string | null;
};

export async function findHubUserByEmail(email: string): Promise<HubUser | null> {
  const { rows } = await pool().query<HubUser>(
    `select "id", "email", "name", "role"::text as "role", "labAccess", "passwordHash"
       from "User" where "email" = $1 limit 1`,
    [email.toLowerCase()],
  );
  return rows[0] ?? null;
}
