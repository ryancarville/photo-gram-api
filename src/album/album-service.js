const AlbumsService = {
	getAllImages(db, userId, albumId) {
		return db
			.select('img_url', 'caption', 'tags', 'date_created')
			.from('photoGram_images')
			.where({ userId } && { albumId });
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
