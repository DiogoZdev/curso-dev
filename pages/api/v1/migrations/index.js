import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method ${request.method} is not allowed`
    });
  }

  let dryRun;

  if (request.method === "POST") {
    dryRun = false;
    await run();
  }

  if (request.method === "GET") {
    dryRun = true;
    await run();
  }

  async function run() {
    const dbClient = await database.getNewClient();
    try {
      const config = {
        dbClient,
        dir: resolve("infra", "migrations"),
        direction: "up",
        verbose: true,
        dryRun,
        migrationsTable: "pgmigrations"
      };

      const migrations = await migrationRunner(config);

      return response.status(migrations.length ? 201 : 200).json(migrations);
    } catch (error) {
      console.error(error);
      return response.status(500).json();
    } finally {
      await dbClient.end();
    }
  }

  return response.status(400).json([]);
}
