import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";
import { resolve } from "path";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
}));

describe("Bcrypt Adapter", () => {
  test("should call bcrypt with correct values ", async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpyOn = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");
    expect(hashSpyOn).toHaveBeenCalledWith("any_value", salt);
  });

  test("should on sucess hash ", async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hash = await sut.encrypt("any_values");
    expect(hash).toBe("hash");
  });
});
