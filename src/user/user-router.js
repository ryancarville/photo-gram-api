const express = require('express');
const UserService = require('./user-service');
const userRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');

userRouter
	.route('/:user_id')
	.all(requireAuth)
	.get((req, res, next) => {
		let photoGramData = {};
		const user_id = req.params.user_id;
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
		const { full_name, user_name, profile_img_url } = req.body;
		const userInfoUpdate = { full_name, user_name, profile_img_url };
		const user_id = req.params.user_id;
		const db = req.app.get('db');
		const userToUpdate = Object.entries(userInfoUpdate).filter(Boolean).length;
		if (userToUpdate === 0) {
			res.status(400).json({
				error: `Request must contain at least 'full_name', 'user_name' or 'profile_img_url'`
			});
		} else {
			UserService.updateUserInfo(db, user_id, userInfoUpdate)
				.then(user => {
					console.log(user);
					res.status(204).json(UserService.serializeUser(user));
				})
				.catch(next);
		}
	});

module.exports = userRouter;
