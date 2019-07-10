const express = require('express');
const path = require('path');
const AlubmsService = require('./albums-service');
const albumsRouter = express.Router();
const jsonBodyParser = express.json();

module.exports = albumsRouter;
