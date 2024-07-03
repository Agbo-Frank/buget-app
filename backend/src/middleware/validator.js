const { body, header } = require("express-validator");

const emailValidator = body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email addresss").toLowerCase()
const passwordValidator = body("password").notEmpty().withMessage("Password is required")

module.exports.register = [
  emailValidator, passwordValidator,
  body("username").notEmpty().withMessage("Username is required")
]

module.exports.login = [ emailValidator, passwordValidator ];

module.exports.createEntry = [ 
  body("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Amount must be a number"),
  body("date").notEmpty().withMessage("date is required").isDate({format: "YYYY-MM-DD", strictMode: true, delimiters: ["-"]}).withMessage("Invalid date"),
  body("description").notEmpty().withMessage("description is required"),
  body("category").notEmpty().withMessage("category is required").isIn(["expense", "income"])
];

module.exports.guard = header("authorization").notEmpty().withMessage("Token is required").customSanitizer(value => value?.replace('Bearer ', ''));
