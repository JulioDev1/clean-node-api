import { MissingParamError } from "../error/missing-error";
import { badRequest, internalServerError } from "../helpers/helper";
import { HttpResponse, HttpRequest } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredField = ["name", "email"];

    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    return internalServerError(new Error("Internal server error"));
  }
}
