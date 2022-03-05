const http = require('http');
const app = require('../app');
const config = require('../config/index');

const server = http.createServer(app);

server.listen(config.port);
