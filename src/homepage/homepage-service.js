const HomepageService = {
	getUserInfo(db, user_id) {
		return db
			.from('photoGram_users')
			.select('full_name', 'profile_img_url')
			.where({ user_id });
	},
	getAllImages(db, user_id) {
		return db
			.from('photoGram_images AS images')
			.select('img_url', 'caption', 'album_id', 'tags', 'date_created')
			.where({ user_id });
	},
	getAllAlbums(db, user_id) {
		return db
			.from('photoGram_albums AS albums')
			.select('album_name', 'img_url')
			.where({ user_id });
	},
	serialzeUser(user) {
		return {
			id: user.id,
			full_name: user.full_name,
			user_name: user.user_name,
			email: user.email,
			password: user.password,
			date_created: user.date_created
		};
	},
	serializeImages(image) {
		return {
			id: image.id,
			user_id: image.user_id,
			img_url: image.img_url,
			caption: image.caption,
			tags: image.tags,
			album_id: image.album_id || null,
			date_created: image.date_created
		};
	},
	serializeAlbum(album) {
		return {
			id: album.id,
			user_id: album.user_id,
			album_name: album.album_name,
			img_url: album.img_url
		};
	}
};
