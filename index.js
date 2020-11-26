const Server = require("./models/Server");
require('dotenv').config();
// Server Instance
const server = new Server();
server.initServer();


