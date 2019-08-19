const express = require('express');
const UserService = require('./user-service');
const userRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');

userRouter
	.route('/:user_id')
	.all(requireAuth)
	.get((req, res, next) => {
		let photoGramData = {};
		const user_id = req.user.id;
		const db = req.app.get('db');
		UserService.getUserInfo(db, user_id)
			.then(user => {
				photoGramData.user = user;
			})
			.then(() => {
				return UserService.getAllImages(db, user_id);
			})
			.then(images => {
				photoGramData.images = images.map(image =>
					UserService.serializeImages(image)
				);
			})
			.then(() => {
				return UserService.getAllAlbums(db, user_id);
			})
			.then(albums => {
				photoGramData.albums = albums.map(album =>
					UserService.serializeAlbums(album)
				);

				res.status(200).json(photoGramData);
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	})
	.patch((req, res, next) => {
		const { full_name, user_name, profile_img_url } = req.body;
		const userInfoUpdate = { full_name, user_name, profile_img_url };
		const user_id = req.params.user_id;
		const db = req.app.get('db');
		for (const [key, value] of Object.entries(userInfoUpdate)) {
			if (value === '') {
				return res.status(400).json({
					error: `Request must contain at least 'full_name', 'user_name' or 'profile_img_url'`
				});
			}
		}
		UserService.updateUserInfo(db, user_id, userInfoUpdate)
			.then(user => {
				return res.status(201).json(UserService.serializeUser(user));
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});

module.exports = userRouter;
