const env = require("dotenv").config();

module.exports = {
  url: `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASSWORD
  }@ds233763.mlab.com:33763/react-learning`
};
