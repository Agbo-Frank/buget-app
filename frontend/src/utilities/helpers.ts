export const maskEmail = (email: string) => {
  const [username, domain] = email.split('@');
  const mask = username.slice(0, 4) + '*'.repeat(Math.floor(username.length / 2)) + username.charAt(username.length - 1);
  return mask + '@' +  domain
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

export const paramsToObject = (params: string) => {
  params = params.replace("?", "")
  return params.split("&").reduce((acc, v) => {
    const [key, value] = v.split("=")
    acc[key] = value;
    return acc
  }, {})
}

export const compareStrings = (str1: string, str2: string) => {
  return str1?.toLowerCase().trim() === str2?.toLowerCase().trim();
}

export function formatToInternational(phone: string, prefix: string) {
  if (phone.startsWith("+")) return phone;
  if (phone.startsWith('0')) return prefix + phone.slice(1);
  if (!phone.startsWith(prefix)) return prefix + phone;
  if (!phone.startsWith("+")) return '+' + phone;
  return phone;
}