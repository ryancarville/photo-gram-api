const express = require('express');
const path = require('path');
const ImagePageService = require('./imagePage-service');
const imagePageRouter = express.Router();
const jsonBodyParser = express.json();

imagePageRouter.get('/:image_id', (req, res, next) => {
	const db = req.app.get('db');
	const { user_id, image_id } = req.body;
	ImagePageService.getImageById(db, user_id, image_id).then(image =>
		res.json(ImagePageService.serializeImage(image))
	);
});

module.exports = imagePageRouter;
