import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.awaitServices();
  await database.query("DROP schema public cascade; CREATE SCHEMA public;");
});

describe("POST /api/migrations", () => {
  describe("anonymous", () => {
    test("Run pending migrations for the first time", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST"
      });

      const body = await response.json();
      expect(Array.isArray(body)).toBe(true);
      expect(response.status).toBe(201);
    });

    test("Run pending migrations for the second time", async () => {
      const response = await database.query("SELECT * FROM pgmigrations;");
      expect(response.rows.length).toBeGreaterThan(0);
    });
  });
});
