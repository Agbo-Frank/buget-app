const { validationResult } = require("express-validator");
const { UnprocessableContent } = require("./service-error.js");
const bcrypt = require("bcrypt")

module.exports.randNum = (len = 4) => {
  const numbers = '0123456789'
  let randomCode = '';

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    randomCode += numbers.charAt(randomIndex);
  }

  return randomCode;
}

module.exports.hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

module.exports.randAlphaNum = (len = 6) => {
  const char = 'ABCDEFGHIJKLMNOPQRSUVWXYZ0123456789'
  let randomCode = '';

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * char.length);
    randomCode += char.charAt(randomIndex);
  }

  return randomCode;
}

module.exports.randAlpha = (len = 6) => {
  const char = 'ABCDEFGHIJKLMNOPQRSUVWXYZ'
  let randomCode = '';

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * char.length);
    randomCode += char.charAt(randomIndex);
  }

  return randomCode;
}

module.exports.compareStrings = (str1, str2) => {
  return str1?.toLowerCase().trim() === str2?.toLowerCase().trim();
}

module.exports.isEmpty = (mixedVar) => {
  let undef;
  let key;
  let i;
  let len;
  const emptyValues = [undef, null, false, 0, '', '0', 'null', 'undefined'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i] || typeof mixedVar == 'undefined') {
      return true;
    }
  }

  if (typeof mixedVar === 'object' && !(mixedVar instanceof Date)) {
      for (key in mixedVar) {
        if (mixedVar.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
  }
  return false;
};

module.exports.maskEmail = (email) => {
  const [username, domain] = email.split('@');
  const mask = username.slice(0, 4) + '*'.repeat(Math.floor(username.length / 2)) + username.charAt(username.length - 1);
  return mask + '@' +  domain
}

module.exports.validateRequest = (req) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let message = errors.array()[0].msg
    throw new UnprocessableContent(message, errors.array())
  }
}

module.exports.responsHandler = (res, message, status = 200, data = null) => {
  res.status(status).json({
    status: /^4/.test(status.toString()) ? "failed" : "success",
    message,
    data
  })
}

module.exports.pagingParams = (req) => {
  const limit = req.query?.limit ? parseInt(`${req.query?.limit}`) : 25
  const paginate = req?.query?.paginate ? Boolean(req?.query?.paginate) : true
  const page = req.query?.page ? parseInt(`${req.query?.page}`) < 1 ? 1 : parseInt(`${req.query?.page}`) : 1

  return {limit, page, paginate, ...req.query}
}