import { validationResult } from "express-validator";
import { UnprocessableContent } from "./service-error";
import { Response, Request } from "express"

export function randNum(len = 4){
  const numbers = '0123456789'
  let randomCode = '';

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    randomCode += numbers.charAt(randomIndex);
  }

  return randomCode;
}

export const randAlphaNum = (len = 6) => {
  const char = 'ABCDEFGHIJKLMNOPQRSUVWXYZ0123456789'
  let randomCode = '';

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * char.length);
    randomCode += char.charAt(randomIndex);
  }

  return randomCode;
}

export const randAlpha = (len = 6) => {
  const char = 'ABCDEFGHIJKLMNOPQRSUVWXYZ'
  let randomCode = '';

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * char.length);
    randomCode += char.charAt(randomIndex);
  }

  return randomCode;
}

export const compareStrings = (str1: string, str2: string) => {
  return str1?.toLowerCase().trim() === str2?.toLowerCase().trim();
}

export const isEmpty = (mixedVar: any) => {
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

export const maskEmail = (email: string) => {
  const [username, domain] = email.split('@');
  const mask = username.slice(0, 4) + '*'.repeat(Math.floor(username.length / 2)) + username.charAt(username.length - 1);
  return mask + '@' +  domain
}

export const validateRequest = (req: Request) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let message = errors.array()[0].msg
    throw new UnprocessableContent(message, errors.array())
  }
}

export const responsHandler = (res: Response, message: string, status: number = 200, data: any = null) => {
  res.status(status).json({
    status: /^4/.test(status.toString()) ? "failed" : "success",
    message,
    data
  })
}

export const pagingParams = (req: Request) => {
  const limit = req.query?.limit ? parseInt(`${req.query?.limit}`) : 25
  const paginate = req?.query?.paginate ? Boolean(req?.query?.paginate) : true
  const page = req.query?.page ? parseInt(`${req.query?.page}`) < 1 ? 1 : parseInt(`${req.query?.page}`) : 1

  return {limit, page, paginate, ...req.query}
}