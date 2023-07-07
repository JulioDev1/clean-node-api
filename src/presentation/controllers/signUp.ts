import { InvalidParamError } from "../error/invalid-param-error";
import { MissingParamError } from "../error/missing-error";
import { ServerError } from "../error/server-error";
import { badRequest, internalServerError } from "../helpers/helper";
import { Controller } from "../protocols/controller";
import { EmailValidator } from "../protocols/email-validtor";
import { HttpResponse, HttpRequest } from "../protocols/http";

export class SignUpController implements Controller {
  private emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredField = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email);

      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }

      return internalServerError(new Error("Internal server error"));
    } catch (erro) {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
