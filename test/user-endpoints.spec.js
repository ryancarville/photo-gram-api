const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe.only('User Endpoints', () => {
	let db;

	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		});
		app.set('db', db);
	});

	after('disconect from db', () => db.destroy());

	before('cleanup tables', () => helpers.cleanTables(db));

	afterEach('cleanup tables', () => helpers.cleanTables(db));

	describe('GET /user/:user_id', () => {
		context('Given users, albums and images in db', () => {
			const {
				testUsers,
				testImages,
				testAlbums
			} = helpers.makePhotoGramFixtures();
			before('insert users, albums and images', () => {
				helpers.seedAllTables(db, testUsers, testImages, testAlbums);
			});
			it('responds 200 with users info, images and albums', () => {
				const testUser = testUsers[1];

				const expectedUser = helpers.makeExpectedUser(testUser);
				let expectedImages = testImages.filter(
					img => img.user_id === testUser.id
				);
				expectedImages = expectedImages.forEach(img =>
					helpers.makeExpectedImage(testUsers, img)
				);
				let expectedAlbums = testAlbums.filter(
					alb => alb.user_id === expectedUser.id
				);
				expectedAlbums = expectedAlbums.forEach(alb =>
					helpers.makeExpectedAlbum(testUsers, alb)
				);

				return supertest(app)
					.get(`/user/${testUser.id}`)
					.set('authorization', helpers.makeAuthHeader(testUser))
					.send(testUser)
					.expect(200)
					.expect(res => {
						expect(res.body.user.id).to.eql(expectedUser.id);
						expect(res.body.user.full_name).to.eql(expectedUser.full_name);
						expect(res.body.user.user_name).to.eql(expectedUser.user_name);
						expect(res.body.user).to.have.property('profile_img_url');
						expect(res.body.images).to.eql(expectedImages);
						expect(res.body.albums).to.eql(expectedAlbums);
					});
			});
		});
	});
	describe('PATCH /user/:user_id', () => {
		context('Given user with images in the db', () => {
			const { testUsers } = helpers.makePhotoGramFixtures();
			const testUser = testUsers[0];
			beforeEach('insert users into db', () => {
				helpers.seedUsers(db, testUsers);
			});

			it(`responds 400 required error with request body empty`, () => {
				const updateInfoAttempBody = {
					user_name: '',
					full_name: '',
					profile_img_url: ''
				};

				return supertest(app)
					.patch(`/user/${testUser.id}`)
					.set('authorization', helpers.makeAuthHeader(testUser))
					.send(updateInfoAttempBody)
					.expect(400, {
						error: `Request must contain at least 'full_name', 'user_name' or 'profile_img_url'`
					});
			});
			it(`responds 201 and xss serialize new user info`, () => {
				const updateInfoAttempBody = {
					user_name: 'new-user-name',
					full_name: 'new-full_name',
					profile_img_url:
						'https://www.newImage.com<script>onClick=(alert("bad news"))</script>'
				};
				const expectedUser = {
					user_name: 'new-user-name',
					full_name: 'new-full_name',
					profile_img_url: 'https://www.newImage.com'
				};

				return supertest(app)
					.patch(`/user/${testUser.id}`)
					.set('authorization', helpers.makeAuthHeader(testUser))
					.send(updateInfoAttempBody)
					.expect(201)
					.expect(res => {
						expect(res.body).to.eql(expectedUser);
					});
			});
		});
	});
});
