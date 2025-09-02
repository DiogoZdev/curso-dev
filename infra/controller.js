import { InternalServerError, MethodNotAllowedError } from "./errors";

function onErrorHandler(error, req, res) {
  const publicErrorObject = new InternalServerError({
    statusCode: error.statusCode,
    cause: error
  });

  res.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onNoMacthHandler(_, res) {
  res.status(405).json(new MethodNotAllowedError());
}

export const controllerHandlers = {
  onError: onErrorHandler,
  onNoMatch: onNoMacthHandler
};
