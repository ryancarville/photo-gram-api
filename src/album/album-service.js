const xss = require('xss');

const AlbumsService = {
	insertAlbum(db, newAlbum) {
		console.log(newAlbum);
		return db
			.into('photogram_albums')
			.insert(newAlbum)
			.returning('*')
			.then(row => {
				return row[0];
			});
	},
	deleteAlbum(db, id) {
		return db('photogram_albums')
			.where({ id })
			.delete();
	},
	serializeAlbum(album) {
		return {
			id: album.id,
			album_name: album.album_name,
			img_url: xss(album.img_url),
			user_id: album.user_id
		};
	}
	// getAlbumImages(db, userId, albumId) {
	// 	return db
	// 		.select('img_url', 'caption', 'tags', 'date_created')
	// 		.from('photoGram_images')
	// 		.where({ userId } && { albumId });
	// },

	// serializeImage(image) {
	// 	return {
	// 		id: image.id,
	// 		user_id: xss(image.user_id),
	// 		img_url: xss(image.img_url),
	// 		caption: xss(image.caption),
	// 		tags: xss(image.tags),
	// 		album_id: image.album_id || null,
	// 		date_created: image.date_created
	// 	};
	// }
};

module.exports = AlbumsService;
