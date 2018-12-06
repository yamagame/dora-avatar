const port = 5100;
const path = require('path');

module.exports = {
  port,
  robot_public_key: process.env.ROBOT_PUBLIC_KEY || null,
}
