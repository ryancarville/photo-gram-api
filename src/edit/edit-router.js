const xss = require('xss');
const express = require('express');
const EditService = require('./edit-service');
const editRouter = express.Router();
const jsonBodyParser = express.json();

editRouter.get('/:image_id', (req, res, next) => {
	const db = req.app.get('db');
	const { user_id, image_id } = req.body;
	EditService.getImageById(db, user_id, image_id)
		.then(image => res.json(EditServices.serializeImage(image)))
		.catch(next);
});

// editRouter.post('/', jsonBodyParser, (req, res, next) => {
// 	const { caption, date_created, tags, album_id } = req.body;
// 	const updatedImage = { caption, date_created, tags, album_id };

// 	EditService.updateImage(req.app.get('db'), updatedImage).then(image => {
// 		if (!image) {
// 			return res
// 				.status(400)
// 				.json({ error: 'Somethign went wrong with the update.' });
// 		} else {
// 			return res
// 				.status(201)
// 				.location(path.posix.join(req.originalUrl, `/${user.id}`))
// 				.json(EditService.serializeUser(image));
// 		}
// 	});
// });

module.exports = editRouter;
