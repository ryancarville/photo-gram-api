const express = require('express');
const path = require('path');
const UploadService = require('./upload-service');
const uploadRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');

uploadRouter
	.route('/:user_id')
	.all(requireAuth)
	.post((req, res, next) => {
		const {
			img_url,
			tags,
			user_id,
			album_id,
			date_created,
			caption
		} = req.body;
		const validImage = { img_url, user_id };
		for (const [key, value] of Object.entries(validImage)) {
			if (value == 0) {
				res.status(400).json({ error: `Request must contain ${key}` });
			}
		}
		const imageData = {
			img_url,
			tags,
			user_id,
			album_id,
			date_created,
			caption
		};
		const db = req.app.get('db');
		UploadService.insertImage(db, imageData)
			.then(image =>
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${image.id}`))
					.json(UploadService.serializeImage(image))
			)
			.catch(next);
	});

module.exports = uploadRouter;
