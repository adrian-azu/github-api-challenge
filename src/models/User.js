"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/mysql");
const { hashPassword } = require("../utils/hashPassword");
class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate() {
    // define association here
  }

  verifyPassword(value) {
    return hashPassword(value, this.dataValues.salt) == this.dataValues.password;
  }
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}
User.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a name" },
        notEmpty: { msg: "Name must not be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a email" },
        notEmpty: { msg: "email must not be empty" },
        isEmail: { msg: "Must be a valid email address" },
      },
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        console.log("NEW SALT", value);
        this.setDataValue("password", hashPassword(this.password, value));
        this.setDataValue("salt", value);
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: { args: 6, msg: "Password must be 6 or more characters" },
      },
      // set(value) {
      //   console.log("NEW SALT", this);
      //   this.setDataValue("password", hashPassword(value, this.salt));
      // },
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,
  }
);
module.exports = User;
