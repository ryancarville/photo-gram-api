const express = require('express');
const path = require('path');
const ImagesService = require('./images-service');
const imagesRouter = express.Router();
const jsonBodyParser = express.json();

module.exports = imagesRouter;
