const express = require('express');
const HomepageService = require('./homepage-service');
const homepageRouter = express.Router();

homepageRouter.get('/:user_id', (req, res, next) => {
	let photoGramData = {};
	const { user_id } = req.params;
	console.log(user_id);
	const db = req.app.get('db');

	HomepageService.getUserInfo(db, user_id)
		.then(user => {
			HomepageService.serializeUser(user);
		})
		.then(
			HomepageService.getAllImages(db, user_id).then(images => {
				images.map(image => HomepageService.serializeImages(image));
			})
		)
		.then(
			HomepageService.getAllAlbums(db, user_id).then(albums => {
				albums.map(album => HomepageService.serializeAlbums(album));
			})
		)
		.catch(next);

	console.log(photoGramData);
	res.json(photoGramData);
});

module.exports = homepageRouter;
