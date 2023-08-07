import request from "supertest";
import app from "../config/app";

describe("Sign Up Routes", () => {
  test("should return account on sucess", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "julio",
        email: "julio@gmail.com",
        password: "123",
        PasswordConfirmation: "123",
      })
      .expect(200);
  });
});
