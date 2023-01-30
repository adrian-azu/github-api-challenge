/* eslint-disable no-undef */

const User = require("./User");
const UserService = require("./UserService");

describe("User Module", () => {
  test("should add user", async () => {
    const user_mock = {
      name: "Adrian Azucena",
      email: "test@test.com",
      password: "test123$",
      salt: "saltpaper123",
    };
    const user = await UserService.createUser(user_mock);
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user).toEqual(
      expect.objectContaining({
        name: user_mock.name,
        email: user_mock.email,
        salt: user_mock.salt,
        password: expect.any(String),
      })
    );
  });
});
