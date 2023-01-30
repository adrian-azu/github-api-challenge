const User = require("./User");

class UserService {
  static async getUserEmail(email = "") {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createUser(user = {}) {
    try {
      return await User.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async checkIfSaltUsed(salt = "") {
    try {
      return await User.findOne({ where: { salt } });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserById(id) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = UserService;
