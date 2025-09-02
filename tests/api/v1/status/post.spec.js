import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.awaitServices();
});

describe("POST /api/v1/status", () => {
  describe("anonymous", () => {
    it("fetching system status", async () => {
      const response = await fetch(`http://localhost:3000/api/v1/status`, {
        method: 'POST'
      });

      expect(response.status).toBe(405);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        method: "MethodNotAllowedError",
        message: "Método não permitido",
        action: "Verifique o método HTTP usado na requisição",
        status_code: 405,
      });
    });
  });
});
