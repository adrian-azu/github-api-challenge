const axios = require("axios");
const logger = require("./logger");
const { GITHUB_TOKEN } = process.env;

const headers = {
  Authorization: `Token ${GITHUB_TOKEN}`,
};
const instance = axios.create({
  baseURL: "https://api.github.com",
  headers: headers,
});
module.exports = {
  fetchUsername: async (username) => {
    try {
      const response = await instance.get("/users/" + username, {
        validateStatus: (status) => (status >= 200 && status < 300) || status === 404 || status === 204,
      });
      return response?.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
