const express = require('express');
const path = require('path');
const HomepageService = require('./homepage-service');
const homepageRouter = express.Router();
const jsonBodyParser = express.json();

module.exports = homepageRouter;
