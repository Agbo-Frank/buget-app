import express from 'express'
import helmet from 'helmet';
import cors from 'cors';
import ErrorHandler from './middleware/error-handler';
import api from './api';
import Logger from './utility/logger';

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
export default app