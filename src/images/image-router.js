const xss = require('xss');
const express = require('express');
const ImageService = require('./image-service');
const imageRouter = express.Router();

imageRouter.get('/:user_id', (req, res, next) => {
	const user_id = req.params.user_id;
	const db = req.app.get('db');
	ImageService.getAllImages(db, user_id)
		.then(images =>
			res.json(images.map(img => ImageService.serializeImage(img)))
		)
		.catch(next);
});

imageRouter
	.route('/:image_id')
	.get((req, res, next) => {
		const db = req.app.get('db');
		const { user_id, image_id } = req.body;
		ImagePageService.getImageById(db, user_id, image_id)
			.then(image => res.json(ImageService.serializeImage(image)))
			.catch(next);
	})

	.patch((req, res, next) => {
		const { caption, date_created, tags, album_id } = req.body;
		const imageToUpdate = { caption, date_created, tags, album_id };

		const numOfValues = Object.values(imageToUpdate).filter(Boolean).length;
		if (numOfValues === 0) {
			res.status(400).json({
				error: `Request must contain 'caption', 'tags', 'album id' or 'date'`
			});
		}

		ImageService.updateImage(
			req.app.get('db'),
			req.params.image_id,
			imageToUpdate
		)
			.then(nuwRowsAffected => {
				res.status(204).json();
			})
			.catch(next);
	});

module.exports = imageRouter;
