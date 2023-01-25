const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const UserService = require("../services/UserService");
const RedisClient = require("../utils/redisClient");
const authenticateToken = async (req = request, res = response, next) => {
  const hasValidToken = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (!hasValidToken) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = req.headers["authorization"].split(" ")[1];
  // continue
  try {
    const userToken = await RedisClient.get(token);
    if (userToken) {
      const parsedToken = JSON.parse(userToken);
      req.user = parsedToken;
      return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await UserService.getUserById(decoded["id"]);
    if (!user) {
      return res.status(401).json({ message: "User data does not exists!" });
    }
    //DRY !!
    await RedisClient.setToken(token, user);
    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      await RedisClient.deleteToken(token);
      return res.status(401).json({ message: "Token expired" });
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};
module.exports = authenticateToken;
