const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const ErrorHandler = require('./middleware/error-handler.js');
const api = require('./api/index.js');
const Logger = require('./utility/logger.js');

const logger = new Logger("server")

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({
	origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, _, next) => {
  logger.log("info", {method: req?.method, endpoint: req?.url})
  next()
})
api(app)
app.use(ErrorHandler)

app.disable('x-powered-by')
module.exports = app