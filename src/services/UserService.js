"use strict";

const User = require("../models/User");
class UserService {
  async getUserEmail(email = "") {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new Error(error);
    }
  }
  async createUser(user = {}) {
    try {
      return await User.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }
  async checkIfSaltUsed(salt = "") {
    try {
      return await User.findOne({ where: { salt } });
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUserById(id) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = new UserService();
