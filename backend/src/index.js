const { PORT } = require("./utility/config.js")
const app = require("./app.js")
const Logger = require("./utility/logger.js");
const { sequelize } = require("./models/index.js");

const logger = new Logger("server")

sequelize.sync({ force: false })
  .then(() => {
    logger.log('Database synchronized successfully.')
    app.listen(PORT, () => logger.log(`Application runing on port ${PORT}...`))
  })
  .catch(err => logger.error('Unable to synchronize database:', err));