import { ServerError } from "../error/server-error";
import { HttpResponse } from "../protocols";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});
export const internalServerError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
export const ok = (data): HttpResponse => ({
  statusCode: 200,
  body: data,
});
