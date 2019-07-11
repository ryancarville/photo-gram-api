const ImagePageService = {
	getImageById(db, userId, imageId) {
		return db
			.select('img_url', 'caption', 'tags', 'album_id', 'date_created')
			.from('photoGram_images')
			.where({ userId } && { imageId });
	},
	serializeImage(image) {
		return {
			id: image.id,
			user_id: image.user_id,
			img_url: image.img_url,
			caption: image.caption,
			tags: image.tags,
			album_id: image.album_id || null,
			date_created: image.date_created
		};
	}
};
module.exports = ImagePageService;
