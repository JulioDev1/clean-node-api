import { EmailValidator } from "../presentation/protocols/email-validtor";

export class EmailValidatorAdpater implements EmailValidator {
  isValid(email: string): boolean {
    return false;
  }
}
