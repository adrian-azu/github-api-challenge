const axios = require("axios");

const { GITHUB_TOKEN } = process.env;

const headers = {
  Authorization: `Token ${GITHUB_TOKEN}`,
};
// const instance = axios.create({
//   baseURL: "https://api.github.com",
//   headers,
// });
module.exports = {
  fetchUsername: async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers,
        validateStatus: (status) => (status >= 200 && status < 300) || status === 404 || status === 204,
      });
      return response?.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
