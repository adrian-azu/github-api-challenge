const { Router } = require("express");
const controller = require("../controllers/ChallengeController");
const validate = require("../validations/ChallengeValidation");
const router = Router();
router.post("/usernames", validate.githubList(), controller.listUsernames);
router.post("/distance", validate.distance(), controller.hammingDistance);

module.exports = router;
