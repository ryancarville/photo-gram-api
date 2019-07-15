const express = require('express');
const path = require('path');
const UploadService = require('./upload-service');
const uploadRouter = express.Router();
const jsonBodyParser = express.json();

uploadRouter.post('/', (req, res, next) => {
	res.json({ upload: 'ok' });
});

module.exports = uploadRouter;
