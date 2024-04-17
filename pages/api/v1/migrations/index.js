import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const config = {
    dbClient,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations"
  };

  if (request.method === "POST") {
    config.dryRun = false;
  }

  if (request.method === "GET") {
    config.dryRun = true;
  }

  const migrations = await migrationRunner(config);
  await dbClient.end();

  return response.status(migrations.length ? 201 : 200).json(migrations);
}
