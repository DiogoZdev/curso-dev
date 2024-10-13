import retry from "async-retry";
import database from "infra/database";

async function awaitServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 2000
    });

    async function fetchStatusPage() {
      const res = await fetch("http://localhost:3000/api/v1/status");
      await res.json();
    }
  }
}

async function clearDatabase() {
  await database.query("DROP schema public cascade; CREATE SCHEMA public;");
}

const orchestrator = { awaitServices, clearDatabase };

export default orchestrator;
