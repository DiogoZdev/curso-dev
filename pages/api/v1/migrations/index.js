import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";
import { createRouter } from "next-connect";
import { controllerHandlers } from "infra/controller";

const router = createRouter(controllerHandlers);

router
  .get(getHandler)
  .post(postHandler)

export default router.handler()

async function run(isDryRun) {
    const dbClient = await database.getNewClient();

    try {
      const config = {
        dbClient,
        dir: resolve("infra", "migrations"),
        direction: "up",
        verbose: true,
        dryRun: isDryRun,
        migrationsTable: "pgmigrations"
      };

      const migrations = await migrationRunner(config);

      return [migrations.length ? 201 : 200, migrations];
    } finally {
      await dbClient.end();
    }
  }

async function getHandler(_, response) {
  const [status, migrations] = await run(true);

  return response.status(status).json(migrations);
}

async function postHandler(_, response) {
  const [status, migrations] = await run(false);

  return response.status(status).json(migrations);
}
