const { Router } = require("express");
const cltr = require("./controller.js")
const valid = require('../../middleware/validator.js');
const { guard } = require("../../middleware/auth-guard.js");

const router = Router()

router.post("/auth/register", valid.register, cltr.register)
router.post("/auth/login", valid.login, cltr.login)
router.get("/auth/profile", valid.guard, guard, cltr.profile)

module.exports = router