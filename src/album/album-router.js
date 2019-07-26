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
					.status(204)
					.location(path.posix.join(req.originalUrl + `/${album.id}`))
					.json(album => AlubmService.serializeAlbum(album))
			)
			.catch(next);
	});

albumRouter
	.route('/:album_id')
	.all(requireAuth)
	.get((req, res, next) => {
		const db = req.app.get('db');
		const { user_id, album_id } = req.body;

		AlubmService.getAlbumImages(db, user_id, album_id)
			.then(images => res.json(images.map(AlubmsService.serializeImage)))
			.catch(next);
	})
	.delete((req, res, next) => {
		const { album_id } = req.params;
		const db = req.app.get('db');
		AlubmService.deleteAlbum(db, album_id)
			.then(nuwRowsAffected => {
				res.status(204).json();
			})
			.catch(next);
	});

module.exports = albumRouter;
