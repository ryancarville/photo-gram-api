const express = require('express');
const UserService = require('./user-service');
const userRouter = express.Router();

userRouter
	.route('/:user_id')
	.get((req, res, next) => {
		let photoGramData = {};
		const { user_id } = req.params;
		console.log(user_id);
		const db = req.app.get('db');

		UserService.getUserInfo(db, user_id)
			.then(user => {
				photoGramData.user = user;
			})
			.then(
				UserService.getAllImages(db, user_id).then(images => {
					photoGramData.images = images.map(image =>
						UserService.serializeImages(image)
					);
				})
			)
			.then(
				UserService.getAllAlbums(db, user_id).then(albums => {
					photoGramData.albums = albums.map(album =>
						UserService.serializeAlbums(album)
					);
					console.log(photoGramData);
					res.json(photoGramData);
				})
			)
			.catch(next);
	})
	.patch((req, res, next) => {
		const { profile_img_url } = req.body;
		const user_id = req.params.user_id;
		const db = req.app.get('db');
		UserService.updateUserInfo(db, user_id, profile_img_url)
			.then(user => {
				res.json(UserService.serializeUser(user));
			})
			.catch(next);
	});

module.exports = userRouter;
