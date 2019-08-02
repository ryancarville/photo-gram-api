const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Albums endpoints', () => {
	let db;

	const { testUsers, testAlbums, testImages } = helpers.makePhotoGramFixtures();

	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		});
		app.set('db', db);
	});

	after('disconnect from db', () => db.destroy());

	before('cleanup', () => helpers.cleanTables(db));

	afterEach('cleanup', () => helpers.cleanTables(db));

	describe(`POST /albums/addAlbum`, () => {
		before('inset Albums', () => {
			helpers.seedAllTables(db, testUsers, testImages, testAlbums);
		});
		it(`responds 201 with album data`, () => {
			const validAlbum = testAlbums[0];
			const expectedAlbum = helpers.makeExpectedAlbum(testUsers, validAlbum);
			const testUser = testUsers[0];
			return supertest(app)
				.post('/albums/addAlbum')
				.set('authorization', helpers.makeAuthHeader(testUser))
				.send(validAlbum)
				.expect(201)
				.expect(res => {
					expect(res.body.album).to.eql(expectedAlbum);
				});
		});
	});

	describe('DELETE /albums/:album_id', () => {
		context('Given album is not found', () => {
			before('insert Albums', () => {
				helpers.seedAllTables(db, testUsers, testImages, testAlbums);
			});
			it(`responds 401 'Album doesn't exsit`, () => {
				const invalidAlbum = {
					id: 12334343,
					album_name: 'test-album-name',
					img_url: 'http://testalbum.com',
					user_id: testUsers[0].id
				};

				return supertest(app)
					.delete(`/albums/${invalidAlbum.id}`)
					.set('authorization', helpers.makeAuthHeader(testUsers[0]))
					.expect(401, { error: `Album doesn't exist` });
			});
		});
	});
});
