const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Images Endpoints', () => {
	let db;

	const { testUsers, testImages, testAlbums } = helpers.makePhotoGramFixtures();

	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		});
		app.set('db', db);
	});

	after('disconnet from db', () => db.destroy());

	before('cleanup tables', () => helpers.cleanTables(db));

	afterEach('cleanup tables', () => helpers.cleanTables(db));

	describe('PATCH /images/:user_id', () => {
		context('Given request does not contain required data', () => {
			beforeEach(() => {
				helpers.seedAllTables(db, testUsers, testImages, testAlbums);
			});
			it(`responds 401 required data`, done => {
				const invalidPatch = {
					caption: '',
					tags: '',
					album_id: '',
					date_created: ''
				};
				done();
				return supertest(app)
					.patch(`/images/${testImages[0].id}`)
					.set('authorization', helpers.makeAuthHeader(testUsers[0]))
					.send(invalidPatch)
					.expect(401, {
						error: `Request must contain 'caption', 'tags', 'album id' or 'date'`
					});
			});
		});
		context(`Given valid patch request`, () => {
			it(`responds 201 and serialized image data`, done => {
				const testUser = testUsers[0];
				const validPatch = {
					caption: 'changed-test-caption',
					album_id: 1,
					tags: 'changed, tags',
					date_created: new Date(`now()`),
					user_id: testUser.id
				};
				const expectedPatchRes = helpers.makeExpectedAlbum(
					testUsers,
					validPatch
				);
				done();
				return supertest(app)
					.patch(`/images/${testImages[0].id}`)
					.set('authorization', helpers.makeAuthHeader(testUser))
					.send(validPatch)
					.expect(201)
					.expect(res => {
						expect(res.body).to.eql(expectedPatchRes);
					});
			});
		});
	});
	describe('DELETE /images/:image_id', () => {
		context(`Given no image found`, () => {
			const testUser = testUsers[0];
			const testAlbum = testAlbums[0];
			beforeEach(() => {
				helpers.seedAllTables(db, testUsers, testImages, testAlbums);
			});
			it(`responds 401 no image found`, done => {
				const invalidImage = {
					id: 123423,
					img_url: 'http://testimage.com',
					user_id: testUser.id,
					album_id: testAlbum.id,
					date_created: new Date(`now()`)
				};
				done();
				return supertest(app)
					.delete(`/images/${invalidImage.id}`)
					.set('authorization', helpers.makeAuthHeader(testUser))
					.send(invalidImage)
					.expect(401, { error: `Image doesn't exist` });
			});
			it(`responds 202 when sucessful`, done => {
				const validImage = testImages[0];
				const testUser = testUsers[0];
				done();
				return supertest(app)
					.delete(`/images/${validImage.id}`)
					.set('authroization', helpers.makeAuthHeader(testUser))
					.send(validImage)
					.expect(202);
			});
		});
	});
});
