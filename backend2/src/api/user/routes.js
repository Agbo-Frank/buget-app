const { Router } = require("express");
const cltr = require("./controller.js")
const valid = require('../../middleware/validator.js');
const { guard } = require("../../middleware/auth-guard.js");

const router = Router()

router.put("/users/:id", valid.guard, guard, cltr.update)
router.get("/users", valid.guard, guard, cltr.getUsers)
router.delete("/users/:id", valid.guard, guard, cltr.remove)

module.exports = router