export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Houve um erro interno não esperado", {
      cause,
    });
  }
}
