const logfmt = require('logfmt');

class Logger {
  name;

  constructor(service) {
    this.name = service;
  }

  log(message, opts = {}) {
    const logData = logfmt.stringify(Object.assign(opts, { component: this.name }));
    if (message) {
      process.stdout.write(`${message} ${logData}` + '\n');
    } else {
      process.stdout.write(`${logData}` + '\n');
    }
  }

  error(message, opts = {}) {
    const logData = logfmt.stringify(Object.assign(opts, { component: this.name }));
    if (message) {
      process.stderr.write(`${message} ${logData}` + '\n');
    } else {
      process.stderr.write(`${logData}` + '\n');
    }
  }
}

module.exports = Logger;