import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";

const migrationOptions = {
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations"
};

async function execute(config) {
  let dbClient;
  const dryRun = config.dryRun;

  try {
    dbClient = await database.getNewClient();

    const pendingMigrations = await migrationRunner({
      ...migrationOptions,
      dryRun,
      dbClient
    });

    return pendingMigrations;
  } finally {
    await dbClient?.end();
  }
}

async function listPendingMigrations() {
  return execute({ dryRun: true });
}

async function runPendingMigrations() {
  return execute({ dryRun: false });
}

export const migrator = {
  listPendingMigrations,
  runPendingMigrations
};
