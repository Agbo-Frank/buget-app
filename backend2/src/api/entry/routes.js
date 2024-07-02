const { Router } = require("express");
const cltr = require("./controller.js")
const valid = require('../../middleware/validator.js');
const { guard } = require("../../middleware/auth-guard.js");

const router = Router()

router.post("/entries", valid.guard, guard, valid.createEntry, cltr.create)
router.put("/entries/:id", valid.guard, guard, cltr.update)
router.get("/entries", valid.guard, guard, cltr.getEntries)
router.get("/entries/:id", valid.guard, guard, cltr.getEntry)
router.delete("/entries/:id", valid.guard, guard, cltr.remove)

module.exports = router