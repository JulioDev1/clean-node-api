import { DbAccountStub } from "./db-add-account";

describe("Name of the group", () => {
  test("should ", async () => {
    class EncryptStub {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve("hashed_password"));
      }
    }
    const encrypterStub = new EncryptStub();
    const sut = new DbAccountStub(encrypterStub);
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
