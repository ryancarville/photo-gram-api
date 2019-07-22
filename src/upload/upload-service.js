const xss = require('xss');
const UploadService = {
	insertImage(db, image) {
		return db
			.into('photogram_images')
			.insert(image)
			.returning('*')
			.then(rows => {
				return rows[0];
			});
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
module.exports = UploadService;
