const express = require('express');
const path = require('path');
const AlubmService = require('./album-service');
const albumRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');

albumRouter
	.route('/addAlbum')
	.all(requireAuth)
	.post((req, res, next) => {
		const { album_name, img_url, user_id } = req.body;
		const newAlbum = { album_name, img_url, user_id };
		const db = req.app.get('db');
		AlubmService.insertAlbum(db, newAlbum)
			.then(album =>
				res
					.status(201)
					.location(path.posix.join(req.originalUrl + `/${album.id}`))
					.json(AlubmService.serializeAlbum(album))
			)
			.catch(err => {
				console.log(err);
				next(err);
			});
	});

albumRouter
	.route('/:album_id')
	.all(requireAuth)
	// .get((req, res, next) => {
	// 	const db = req.app.get('db');
	// 	const { user_id, album_id } = req.body;

	// 	AlubmService.getAlbumImages(db, user_id, album_id)
	// 		.then(images => res.json(images.map(AlubmsService.serializeImage)))
	// 		.catch(err => {
	// 			console.log(err);
	// 			next(err);
	// 		});
	// })
	.delete((req, res, next) => {
		const { album_id } = req.params;
		const db = req.app.get('db');
		AlubmService.deleteAlbum(db, album_id)
			.then(nuwRowsAffected => {
				if (!numRowsAffected) {
					res.status(401).json({ error: `Album doesn't exsit` });
				}
				res.status(202).json(nuwRowsAffected);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});

module.exports = albumRouter;
