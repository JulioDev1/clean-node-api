import { Encrypter } from "./db-add-account-protocols";
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

  test("Should call if Encrypter throws error", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    const promise = await sut.add(accountData);
    expect(promise).rejects.toThrow();
  });
});
