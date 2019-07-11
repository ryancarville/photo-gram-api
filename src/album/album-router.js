const express = require('express');
const path = require('path');
const AlubmService = require('./album-service');
const albumRouter = express.Router();
const jsonBodyParser = express.json();

albumRouter.get('/', (req, res, next) => {
	const db = req.app.get('db');
	const { user_id, album_id } = req.body;

	AlubmService.getAlbumImages(db, user_id, album_id)
		.then(images => res.json(images.map(AlubmsService.serializeImage)))
		.catch(next);
});

module.exports = albumRouter;
