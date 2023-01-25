const crypto = require("crypto");

module.exports.hashPassword = (password = "", salt = "") => {
  const hash = crypto.createHmac("sha256", salt).update(password).digest("hex");
  return hash;
};
