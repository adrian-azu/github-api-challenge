const { Router } = require("express");
const controller = require("../controllers/AuthController");
const { remover } = require("../middlewares/ErrorHandler");
const validate = require("../validations/AuthValidation");
const router = Router();

router.post("/register", validate.register(), remover(controller.register));
router.post("/login", validate.login(), remover(controller.login));

module.exports = router;
