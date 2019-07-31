const xss = require('xss');

const UserService = {
	getUserInfo(db, id) {
		return db
			.from('photogram_users AS userInfo')
			.select('id', 'full_name', 'user_name', 'profile_img_url', 'date_created')
			.where({ id });
	},
	updateUserInfo(db, id, newInfo) {
		return db
			.into('photogram_users')
			.where({ id })
			.update({
				full_name: newInfo.full_name,
				user_name: newInfo.user_name,
				profile_img_url: newInfo.profile_img_url
			})
			.returning('*')
			.then(row => row[0]);
	},
	getAllImages(db, user_id) {
		return db
			.from('photogram_images')
			.select('*')
			.where({ user_id });
	},
	getAllAlbums(db, user_id) {
		return db
			.from('photogram_albums')
			.select('id', 'album_name', 'img_url', 'user_id')
			.where({ user_id });
	},
	serializeUser(user) {
		return {
			id: user.id,
			full_name: user.full_name,
			user_name: user.user_name,
			email: user.email,
			password: user.password,
			profile_img_url: xss(user.profile_img_url),
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
			album_name: album.album_name,
			img_url: xss(album.img_url)
		};
	}
};

module.exports = UserService;
