import retry from "async-retry";

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

const orchestrator = { awaitServices };

export default orchestrator;
