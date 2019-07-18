const xss = require('xss');

const ImageService = {
	getAllImages(db, user_id) {
		return db
			.select('*')
			.from('photogram_images')
			.where({ user_id });
	},
	getImageById(db, userId, imageId) {
		return db
			.select('id', 'img_url', 'caption', 'tags', 'album_id', 'date_created')
			.from('photogram_images')
			.where({ userId } && { imageId });
	},
	insertImage(db, image) {
		return db
			.into('photogram_images')
			.insert(image)
			.returning('*')
			.then(rows => {
				return rows[0];
			});
	},
	updateImage(db, id, newImage) {
		return db('photogram_images')
			.where({ id })
			.update(newImage);
	},
	deleteImage(db, id) {
		return db('photogram_images')
			.where({ id })
			.delete();
	},
	serializeImage(image) {
		return {
			id: image.id,
			user_id: xss(image.user_id),
			img_url: xss(image.img_url),
			caption: xss(image.caption),
			tags: xss(image.tags),
			album_id: image.album_id || null,
			date_created: image.date_created
		};
	}
};
module.exports = ImageService;
