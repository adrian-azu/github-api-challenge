const { Router } = require("express");

const router = Router();

const authRoutes = require("../components/User");
const challengeRoutes = require("../components/Challenge");
const authenticateToken = require("../middlewares/AuthMiddleware");

router.use("/auth", authRoutes);
router.use("/challenge", authenticateToken, challengeRoutes);
router.get("/test", (req, res) => res.status(200).send("GITHUB API - JOYRIDE ASSESSMENT"));

router.all("*", (req, res) => res.status(404).json({
    code: 404,
    message: "Request not found",
  }));

module.exports = router;
