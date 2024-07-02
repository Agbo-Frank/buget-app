const authRoutes = require("./auth/routes.js")
const entryRoutes = require("./entry/routes.js")
const userRoutes = require("./user/routes.js")
const { responsHandler } = require("../utility/helpers.js")
const { StatusCodes } = require("http-status-codes")

module.exports = function(app){
  app.use(authRoutes)
  app.use(entryRoutes)
  app.use(userRoutes)

  app.get('/health', async (_req, res, _next) => {
    const healthcheck = {
      uptime: process.uptime(),
      responsetime: process.hrtime(),
      message: 'OK',
      status: StatusCodes.OK,
      timestamp: Date.now()
    };
    try {
      res.send(healthcheck);
    } catch (error) {
      healthcheck.message = error;
      responsHandler(
        res, 
        StatusCodes.SERVICE_UNAVAILABLE, 
        "Service unavailable"
      )
    }
  });

  // No matching route found
  app.use("*",(_, res, __) => {
    responsHandler(
      res, 
      StatusCodes.NOT_FOUND, 
      "Resource does not exist, check endpoint or method"
    )
  });
}