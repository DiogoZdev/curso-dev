import database from "infra/database";

async function creanDatabase() {
  await database.query("DROP schema public cascade; CREATE SCHEMA public;");
}

describe("GET to /api/migrations", () => {
  beforeAll(async () => {
    await creanDatabase();
  });

  test("GET to /api/migrations should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });
});
