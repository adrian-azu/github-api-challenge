/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const axios = require("axios");
const redis = require("redis-mock");

const client = redis.createClient();
const { fetchUsername } = require("../../utils/axiosService");

jest.mock("axios");
describe("Challenges", () => {
  afterEach(() => {
    client.flushdb(); // clear the Redis data after each test
  });
  test("Should get github profile", async () => {
    const resp = {
      login: "adrian-azu",
      name: "Azu Adrian",
      company: null,
      public_repos: 18,
      public_gists: 1,
      followers: 3,
    };

    axios.get.mockResolvedValueOnce({ data: resp });
    const fn = jest.fn(fetchUsername);
    const fetch_user = await fn(resp.login);
    expect(fetch_user).toEqual(resp);
    expect(fn).toHaveBeenCalled();
  });

  test("Should get github profile and save to redis", async () => {
    const resp = {
      login: "adrian-azu",
      name: "Azu Adrian",
      company: null,
      public_repos: 18,
      followers: 3,
    };

    axios.get.mockResolvedValue({ data: resp });
    const fn = jest.fn(fetchUsername);
    const fetch_user = await fn(resp.login);
    expect(fetch_user).toEqual(resp);
    expect(fn).toHaveBeenCalled();

    client.setex(resp.login, 120, JSON.stringify(resp));
    client.get(resp.login, (err, value) => {
      expect(JSON.parse(value)).toEqual(resp);
    });
  });

  test("Should get the hamming distance of x and y", () => {
    const x = 120;
    const y = 240;
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
    expect(binary).toEqual("01111000");
    expect(binary2).toEqual("11110000");
    expect(distance).toEqual(2);
  });
});
