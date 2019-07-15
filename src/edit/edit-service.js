const xss = require('xss');

const EditService = {
	getImageById(db, userId, imageId) {
		return db
			.select('img_url', 'caption', 'tags', 'album_id', 'date_created')
			.from('photoGram_images')
			.where({ userId } && { imageId });
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
module.exports = EditService;
