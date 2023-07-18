import { EmailValidatorAdpater } from "./email-validator-adapter";
import validator from "validator";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

const makeSut = (): EmailValidatorAdpater => {
  return new EmailValidatorAdpater();
};

describe("EmailValidator Adapter ", () => {
  test("Should return false if validator return false", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(false);
  });

  test("Should return true if validator return false", () => {
    const sut = makeSut();
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(true);
  });

  test("Should return true if validator return false", () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("any_email@mail.com");

    expect(isEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});
