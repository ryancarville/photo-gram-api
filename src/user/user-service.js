const xss = require('xss');

const UserService = {
	getUserInfo(db, user_id) {
		return db
			.from('photogram_users AS userInfo')
			.select('id', 'full_name', 'profile_img_url')
			.where({ id: user_id });
	},
	updateUserInfo(db, id, newInfo) {
		return db
			.into('photogram_users')
			.where({ id })
			.update({ profile_img_url: newInfo })
			.returning('*')
			.then(row => row[0]);
	},
	getAllImages(db, user_id) {
		return db
			.from('photogram_images')
			.select('id', 'img_url', 'caption', 'album_id', 'tags', 'date_created')
			.where({ user_id });
	},
	getAllAlbums(db, user_id) {
		return db
			.from('photogram_albums')
			.select('id', 'album_name', 'img_url')
			.where({ user_id });
	},
	serializeUser(user) {
		return {
			id: user.id,
			full_name: user.full_name,
			user_name: user.user_name,
			email: user.email,
			password: user.password,
			profile_img_url: user.profile_img_url,
			date_created: user.date_created
		};
	},
	serializeImages(image) {
		return {
			id: image.id,
			user_id: xss(image.user_id),
			img_url: xss(image.img_url),
			caption: xss(image.caption),
			tags: xss(image.tags),
			album_id: image.album_id || null,
			date_created: image.date_created
		};
	},
	serializeAlbums(album) {
		return {
			id: album.id,
			user_id: xss(album.user_id),
			album_name: xss(album.album_name),
			img_url: xss(album.img_url)
		};
	}
};

module.exports = UserService;
