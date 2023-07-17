import { MissingParamError, InvalidParamError } from "../error/index";
import { badRequest, internalServerError } from "../helpers/helper";
import {
  HttpResponse,
  HttpRequest,
  EmailValidator,
  Controller,
} from "../protocols";

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

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email);

      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }

      return internalServerError();
    } catch (erro) {
      return internalServerError();
    }
  }
}
