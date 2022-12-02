const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  REDIS_URL: process.env.REDIS_URL
};