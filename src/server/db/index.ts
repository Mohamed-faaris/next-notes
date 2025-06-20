import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { env } from "~/env";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

// createClient({
//   url: env.TURSO_DATABASE_URL,
//   authToken: env.TURSO_AUTH_TOKEN,
// });
export const client =
  globalForDb.client ??
  createClient({
    url: env.DATABASE_URL,
    authToken: env.AUTH_TOKEN,
  });
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
