it("should GET api/v1/status => 200", async () => {
  const response = await fetch(`http://localhost:3000/api/v1/status`);

  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.updated_at).toBeTruthy();
  expect(responseBody.updated_at).toMatch(
    /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$/
  );
  expect(responseBody.dependencies.database.postgres_version).toBeDefined();
  expect(responseBody.dependencies.database.postgres_version).toBeTruthy();
  expect(responseBody.dependencies.database.used_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(
    10
  );
});
