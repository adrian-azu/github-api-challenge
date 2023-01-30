const { request, response } = require("express");
const { fetchUsername } = require("../../utils/axiosService");
const RedisClient = require("../../utils/redisClient");

class GithubController {
  static async listUsernames(req = request, res = response) {
    let { usernames } = req.body;
    usernames = [...new Set(usernames)];
    const cachedData = (
      await Promise.all(
        usernames.map(async (value) => {
          const exists = await RedisClient.get(value);
          if (exists) {
            return JSON.parse(exists);
          }
          const result = await fetchUsername(value);
          if (!result.message) {
            const githubData = {
              name: result.name,
              login: result.login,
              company: result.company,
              followers: result.followers,
              public_repositories: result.public_repos,
              avg_follower_repositories: Math.floor(result.followers / result.public_repos),
            };

            await RedisClient.setExp(result.login, JSON.stringify(githubData), 120);
            return githubData;
          }
          return null;
        })
      )
    )
      .filter((data) => !!data)
      .sort((a, b) => {
        if (a?.name < b?.name) {
          return -1;
        }
        if (a?.name > b?.name) {
          return 1;
        }
        return 0;
      });

    if (cachedData.length === 0) {
      return res.status(404).json({ message: "No usernames found" });
    }
    return res.status(200).json({ data: cachedData });
  }

  static async hammingDistance(req = request, res = response) {
    const { x, y } = req.body;
    // convert to binary
    let binary = x.toString(2);
    let binary2 = y.toString(2);
    // complete the missing bits
    binary = "0".repeat(8 - binary.length) + binary;
    binary2 = "0".repeat(8 - binary2.length) + binary2;
    let distance = 0;
    // convert x into array and check bits per bits to y
    binary.split("").forEach((value, index) => {
      if (binary2[index] !== value) distance += 1;
    });

    return res.status(200).json({
      distance,
      x: binary,
      y: binary2,
    });
  }
}

module.exports = GithubController;
