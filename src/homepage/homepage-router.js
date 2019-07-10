const express = require('express');
const path = require('path');
const HomepageService = require('./homepage-service');
const homepageRouter = express.Router();
const jsonBodyParser = express.json();

homepageRouter.get('/', (req, res, next) => {
	const { user_id } = req.body;
	const db = req.app.get('db');
	HomepageService.getUserInfo(db, user_id).then(user => res.json(user));
	HomepageService.getAllImages(db, user_id).then(images => res.json(images));
	HomepageService.getAllAlbums(db, user_id).then(albums => res.json(albums));
});

module.exports = homepageRouter;
