import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  test("should call bcrypt with correct values ", async () => {
    const sut = makeSut();
    const hashSpyOn = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");
    expect(hashSpyOn).toHaveBeenCalledWith("any_value", salt);
  });

  test("should on sucess hash ", async () => {
    const sut = makeSut();
    const hash = await sut.encrypt("any_values");
    expect(hash).toBe("hash");
  });
});
