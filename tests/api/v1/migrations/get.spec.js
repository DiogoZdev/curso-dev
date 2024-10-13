import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.awaitServices();
  await orchestrator.clearDatabase();
});

describe("GET /api/migrations", () => {
  describe("anonymous", () => {
    test("Running pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");

      const body = await response.json();

      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
      expect(response.status).toBe(body.length ? 201 : 200);
    });
  });
});
