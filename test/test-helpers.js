const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUserArray() {
	return [
		{
			id: 1,
			user_name: 'test-user-1',
			full_name: 'Test user 1',
			email: 'test@email.com',
			password: 'password',
			date_created: new Date('2029-01-22T16:28:32.615Z')
		},
		{
			id: 2,
			user_name: 'test-user-2',
			full_name: 'Test user 2',
			email: 'test@email.com',
			password: 'password',
			date_created: new Date('2029-01-22T16:28:32.615Z')
		},
		{
			id: 3,
			user_name: 'test-user-3',
			full_name: 'Test user 3',
			email: 'test@email.com',
			password: 'password',
			date_created: new Date('2029-01-22T16:28:32.615Z')
		},
		{
			id: 4,
			user_name: 'test-user-4',
			full_name: 'Test user 4',
			email: 'test@email.com',
			password: 'password',
			date_created: new Date('2029-01-22T16:28:32.615Z')
		}
	];
}

function makeAlbumArray(users) {
	return [
		{
			id: 1,
			album_name: 'test-album-1',
			img_url:
				'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/jx2fk8ep2nqh33fyyook',
			user_id: users[0].id
		},
		{
			id: 2,
			album_name: 'test-album-2',
			img_url:
				'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/jx2fk8ep2nqh33fyyook',
			user_id: users[1].id
		},
		{
			id: 3,
			album_name: 'test-album-3',
			img_url:
				'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/jx2fk8ep2nqh33fyyook',
			user_id: users[2].id
		},
		{
			id: 4,
			album_name: 'test-album-4',
			img_url:
				'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/jx2fk8ep2nqh33fyyook',
			user_id: users[3].id
		}
	];
}

function makeImagesArray(users, albums) {
	return [
		{
			id: 1,
			img_url:
				'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/d3aiqvd7ewr6q5bdcssw',
			caption: 'test caption',
			tags: 'test, tag',
			user_id: users[0].id,
			album_id: albums[0].id,
			date_created: new Date('2022-04-06T10:49:15.485Z')
		},
		{
			id: 2,
			img_url:
				'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/a1xbcd3ehc1p0yp8mbb2',
			caption: 'test caption 2',
			tags: 'test, tag',
			user_id: users[1].id,
			album_id: albums[1].id,
			date_created: new Date('2022-04-06T10:49:15.485Z')
		},
		{
			id: 3,
			img_url:
				'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/a1xbcd3ehc1p0yp8mbb2',
			caption: 'test caption 3',
			tags: 'test, tag',
			user_id: users[2].id,
			album_id: albums[2].id,
			date_created: new Date('2022-04-06T10:49:15.485Z')
		},
		{
			id: 4,
			img_url:
				'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/jx2fk8ep2nqh33fyyook',
			caption: 'test caption 5',
			tags: 'test, tag',
			user_id: users[3].id,
			album_id: albums[3].id,
			date_created: new Date('2022-04-06T10:49:15.485Z')
		}
	];
}

function makeExpectedUser(user) {
	return {
		id: user.id,
		full_name: user.full_name,
		user_name: user.user_name,
		profile_img_url: user.profile_img_url
	};
}

function makeExpectedImage(users, image) {
	const user = users.find(usr => usr.id === image.user_id);
	return {
		id: image.id,
		img_url: image.img_url,
		caption: image.caption,
		tags: image.tags,
		date_created: image.date_created,
		user_id: user.id,
		album_id: image.album_id
	};
}

function makeExpectedAlbum(users, album) {
	const user = users.find(usr => usr.id === album.user_id);
	return {
		id: album.id,
		img_url: album.img_url,
		album_name: album.album_name,
		user_id: user.id
	};
}

function makeMaliciousImage(user) {
	const maliciousImage = {
		id: 911,
		img_url:
			'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/jx2fk8ep2nqh33fyyook',
		caption:
			'Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.',
		tags: 'bad, news',
		date_created: new DATE(),
		album_id: null,
		user_id: user.id
	};
	const expectedImage = {
		...makeExpectedImage([user], maliciousImage),
		caption: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
	};
	return {
		maliciousImage,
		expectedImage
	};
}

function makeMalicoiusAlbum(user) {
	const maliciousAlbum = {
		id: 911,
		img_url:
			'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/jx2fk8ep2nqh33fyyook',
		album_name:
			'Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.',
		user_id: user.id
	};
	const expectedAlbum = {
		...makeExpectedAlbum([user], maliciousAlbum),
		album_name: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
	};
	return {
		maliciousAlbum,
		expectedAlbum
	};
}

function makePhotoGramFixtures() {
	const testUsers = makeUserArray();
	const testAlbums = makeAlbumArray(testUsers);
	const testImages = makeImagesArray(testUsers, testAlbums);
	return { testUsers, testImages, testAlbums };
}

function cleanTables(db) {
	return db.transaction(trx =>
		trx
			.raw(
				`TRUNCATE
    photogram_users,
    photogram_albums,
    photogram_images`
			)
			.then(() =>
				Promise.all([
					trx.raw(
						`ALTER SEQUENCE photogram_albums_id_seq minvalue 0 START WITH 1`
					),
					trx.raw(
						`ALTER SEQUENCE photogram_users_id_seq minvalue 0 START WITH 1`
					),
					trx.raw(
						`ALTER SEQUENCE photogram_images_id_seq minvalue 0 START WITH 1`
					),
					trx.raw(`SELECT setval('photogram_albums_id_seq', 0)`),
					trx.raw(`SELECT setval('photogram_users_id_seq', 0)`),
					trx.raw(`SELECT setval('photogram_images_id_seq', 0)`)
				])
			)
	);
}

function seedUsers(db, users) {
	const preppedUsers = users.map(user => ({
		...user,
		password: bcrypt.hashSync(user.password, 1)
	}));

	return db
		.into('photogram_users')
		.insert(preppedUsers)
		.then(() =>
			//update the auto sequence to stay in sunc
			db.raw(`SELECT setval('photogram_users_id_seq', ?)`, [
				users[users.length - 1].id
			])
		);
}

function seedAlbums(db, albums) {
	return db
		.into('photogram_albums')
		.insert(albums)
		.then(() =>
			db.raw(`SELECT setval('photogram_albums_id_seq', ?)`, [
				albums[albums.length - 1].id
			])
		);
}

function seedImages(db, images) {
	return db
		.into('photogram_images')
		.insert(images)
		.then(() =>
			db.raw(`SELECT setval('photogram_images_id_seq', ?)`, [
				images[images.length - 1].id
			])
		);
}

function seedAllTables(db, users, images, albums) {
	return db.transaction(async trx => {
		await seedUsers(trx, users);
		await trx.into('photogram_albums').insert(albums);
		await trx.raw(`SELECT setval('photogram_albums_id_seq', ?)`, [
			albums[albums.length - 1].id
		]);

		await trx.into('photogram_images').insert(images);
		await trx.raw(`SELECT setval('photogram_images_id_seq', ?)`, [
			images[images.length - 1].id
		]);
	});
}

function seedMaliciousAlbum(db, users, album) {
	return seedUsers(db, [users]).then(() =>
		db.into('photogram_albums'.insert([album]))
	);
}

function seedMaliciousImage(db, users, image) {
	return seedUsers(ds, [users]).then(() =>
		db.into('photogram_images').insert([image])
	);
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
	const token = jwt.sign({ user_id: user.id }, secret, {
		subject: user.user_name,
		expiresIn: process.env.JWT_EXPIRY,
		algorithm: 'HS256'
	});

	return `Bearer ${token}`;
}

module.exports = {
	makeUserArray,
	makeAlbumArray,
	makeImagesArray,
	makeExpectedUser,
	makeExpectedAlbum,
	makeExpectedImage,
	makeMalicoiusAlbum,
	makeMaliciousImage,
	makePhotoGramFixtures,
	cleanTables,
	seedUsers,
	seedAlbums,
	seedImages,
	seedAllTables,
	seedMaliciousAlbum,
	seedMaliciousImage,
	makeAuthHeader
};
