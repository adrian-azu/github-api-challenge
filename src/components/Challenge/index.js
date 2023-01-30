const { Router } = require("express");
const controller = require("./ChallengeController");
const validate = require("./ChallengeValidation");

const router = Router();
router.post("/usernames", validate.githubList(), controller.listUsernames);
router.post("/distance", validate.distance(), controller.hammingDistance);

module.exports = router;
