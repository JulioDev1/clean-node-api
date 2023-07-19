import { Encrypter } from "../protocols/encrypter";
import { DbAccountStub } from "./db-add-account";

interface SutType {
  sut: DbAccountStub;
  encrypterStub: Encrypter;
}

const makeEncrypter = (): Encrypter => {
  class EncryptStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncryptStub();
};

const makeSut = (): SutType => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAccountStub(encrypterStub);

  return {
    sut,
    encrypterStub,
  };
};

describe("DbAccount UseCase", () => {
  test("Should call Encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
});
