const path = require('path');
const express = require('express');
const ImageService = require('./image-service');
const imageRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');

imageRouter
	.route('/:image_id')
	.all(requireAuth)
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
				res.status(202).json(nuwRowsAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.delete((req, res, next) => {
		const imageId = req.params.image_id;
		const db = req.app.get('db');
		ImageService.deleteImage(db, imageId)
			.then(rowAffected => {
				if (!rowAffected) {
					res.status(401).json({ error: `Image doesn't exist` });
				}
				res.status(202).json(rowAffected);
			})

			.catch(err => {
				console.log(err);
				next(err);
			});
	});

module.exports = imageRouter;
