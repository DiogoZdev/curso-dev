export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Um erro interno não esperado aconteceu.", {
      cause
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.statusCode = statusCode || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode
    };
  }
}

export class ServiceError extends Error {
  constructor({ cause, message, statusCode }) {
    super(message || "Serviço indisponível.", {
      cause
    });
    this.name = "InternalServerError";
    this.action = "Verifique se o serviço requisitado está disponível.";
    this.statusCode = statusCode || 503;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Método não permitido");
    this.name = "MethodNotAllowedError";
    this.method = "MethodNotAllowedError";
    this.message = "Método não permitido";
    this.action = "Verifique o método HTTP usado na requisição";
    this.status_code = 405;
  }

  toJSON() {
    return {
      name: this.name,
      method: this.method,
      message: this.message,
      action: this.action,
      status_code: this.status_code
    };
  }
}
