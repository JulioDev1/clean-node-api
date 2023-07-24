import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

describe("Bcrypt Adapter", () => {
  test("should call bcrypt with correct values ", async () => {
    const salt = 12;

    const sut = new BcryptAdapter(salt);
    const hashSpyOn = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");
    expect(hashSpyOn).toHaveBeenCalledWith("any_value", salt);
  });
});
