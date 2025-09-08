import { createRouter } from "next-connect";
import { controllerHandlers } from "infra/controller";
import migrator from "models/migrator";

const router = createRouter(controllerHandlers);

router.get(getHandler);
router.post(postHandler);

export default router.handler();

async function getHandler(_, response) {
  const migrations = await migrator.listPendingMigrations();
  return response.status(200).json(migrations);
}

async function postHandler(_, response) {
  const migrations = await migrator.runPendingMigrations();
  const status = migrations.length ? 201 : 200;
  return response.status(status).json(migrations);
}
