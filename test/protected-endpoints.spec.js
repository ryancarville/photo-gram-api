const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Protected endpoints', () => {
	let db;

	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		});
		app.set('db', db);
	});

	const { testUsers, testAlbums, testImages } = helpers.makePhotoGramFixtures();

	after('disconnect from db', () => db.destroy());

	before('cleanup tables', () => helpers.cleanTables(db));

	afterEach('cleanup tables', () => helpers.cleanTables(db));

	beforeEach('insert images', () =>
		helpers.seedAllTables(db, testUsers, testImages, testAlbums)
	);

	const protectedEndpoints = [
		{
			name: 'GET /user/:user_id',
			path: '/user/1',
			method: supertest(app).get
		},
		{
			name: 'PATCH /user/:user_id',
			path: '/user/1',
			method: supertest(app).patch
		},
		{
			name: 'GET /images/:user_id',
			path: '/images/1',
			method: supertest(app).get
		},
		{
			name: 'POST /images/:user_id',
			path: '/images/1',
			method: supertest(app).post
		},
		{
			name: 'GET /images/:images_id',
			path: '/images/1',
			method: supertest(app).get
		},
		{
			name: 'PATCH /images/:image_id',
			path: '/images/1',
			method: supertest(app).patch
		},
		{
			name: 'DELETE /images/image_id',
			path: '/images/1',
			method: supertest(app).delete
		},
		{
			name: 'POST /albums/addAlbum',
			path: '/albums/addAlbum',
			method: supertest(app).post
		},
		{
			name: 'GET /albums/album_id',
			path: '/albums/1',
			method: supertest(app).get
		},
		{
			name: 'DELETE /albums/album_id',
			path: '/albums/1',
			method: supertest(app).delete
		},
		{
			name: 'POST /upload/user_id',
			path: '/upload/1',
			method: supertest(app).post
		}
	];

	protectedEndpoints.forEach(endpoint => {
		describe(endpoint.name, () => {
			it(`responds 401 'Missing bearer token' when no bearer token`, done => {
				done();
				return endpoint
					.method(endpoint.path)
					.expect(401, { error: `Missing bearer token` });
			});
			it(`responds 401 'Unauthorized request' when invalid JWT token`, done => {
				const validUser = testUsers[0];
				const invalidSecret = 'bad-secret';
				done();
				return endpoint
					.method(endpoint.path)
					.set(
						'authorization',
						helpers.makeAuthHeader(validUser, invalidSecret)
					)
					.expect(401, { error: 'Unauthorized request' });
			});
			it(`responds 401 'Unauthorized request' when invalid sub paylod`, done => {
				const invalidUser = { user_name: 'bad-user-name', id: 1 };
				done();
				return endpoint
					.method(endpoint.path)
					.set('authorization', helpers.makeAuthHeader(invalidUser))
					.expect(401, { error: 'Unauthorized request' });
			});
		});
	});
});
