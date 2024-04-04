import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {

  const config = {
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations"
  }

  if (request.method === "POST") {
    config.dryRun = false;
  }

  if (request.method === "GET") {
    config.dryRun = true;
  }

  const migrations = await migrationRunner(config);

  return response.status(200).json(migrations);
}
