import { MissingParamError } from "../error/missing-error";
import { badRequest, internalServerError } from "../helpers/helper";
import { Controller } from "../protocols/controller";
import { HttpResponse, HttpRequest } from "../protocols/http";

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredField = ["name", "email", "password", "passwordConfirmation"];

    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    return internalServerError(new Error("Internal server error"));
  }
}
