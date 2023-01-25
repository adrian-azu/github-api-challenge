const { Request, Response, NextFunction } = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const UserService = require("../services/UserService");
const RedisClient = require("../utils/redisClient");
const { JWT_EXPIRATION } = process.env;
const TOKEN_EXP = isNaN(parseInt(JWT_EXPIRATION)) ? 86400 : parseInt(JWT_EXPIRATION);
class AuthController {
  static async register(req = Request, res = Response, next = NextFunction) {
    const { name, email, password } = req.body;
    const existingUser = await UserService.getUserEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    let salt = crypto.randomBytes(16).toString("hex");
    let isUnique = false;
    while (!isUnique) {
      const result = await UserService.checkIfSaltUsed(salt);
      if (result) {
        salt = crypto.randomBytes(16).toString("hex");
      } else {
        isUnique = true;
      }
    }
    const user = await UserService.createUser({ name, email, password, salt });
    const user_data = user.dataValues;
    const token = jwt.sign({ id: user_data.id }, process.env.JWT_SECRET, {
      expiresIn: TOKEN_EXP,
    });
    await RedisClient.setToken(token, user_data);
    return res.status(201).json({ message: "User created", token });
  }

  static async login(req = Request, res = Response, next = NextFunction) {
    const { email, password } = req.body;

    const user = await UserService.getUserEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }
    const isMatch = user.verifyPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: TOKEN_EXP,
    });
    await RedisClient.setToken(token, user);

    return res.json({ token });
  }
}

module.exports = AuthController;
