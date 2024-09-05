import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.awaitServices();
  await database.query("DROP schema public cascade; CREATE SCHEMA public;");
});

describe("POST to /api/migrations", () => {
  test("POST to /api/migrations should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST"
    });

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(response.status).toBe(body.length ? 201 : 200);

    if (body.legth) {
      const response = await database.query("SELECT * FROM pgmigrations;");
      expect(response.rows.length).toBeGreaterThan(0);
    }
  });
});
