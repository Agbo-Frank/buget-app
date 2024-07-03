const { Router } = require("express");
const cltr = require("./controller.js")
const valid = require('../../middleware/validator.js');
const { guard } = require("../../middleware/auth-guard.js");
const { authorize } = require("../../middleware/authorize.js");

const router = Router()

router.put("/users/:id", valid.guard, guard, authorize(["admin"]), cltr.update)
router.get("/users", valid.guard, guard, authorize(["admin"]), cltr.getUsers)
router.delete("/users/:id", valid.guard, guard, authorize(["admin"]), cltr.remove)

module.exports = router