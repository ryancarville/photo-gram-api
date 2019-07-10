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
	}
};
