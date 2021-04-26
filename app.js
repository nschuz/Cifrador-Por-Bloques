require('dotenv').config();
const Server = require('./models/server');
const multer = require('multer');
const path = require('path');



//hacemos la instacia
const server= new Server();
server.listen();
