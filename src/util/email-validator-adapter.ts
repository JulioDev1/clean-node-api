import { EmailValidator } from "../presentation/protocols/email-validtor";
import validator from "validator";
export class EmailValidatorAdpater implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
