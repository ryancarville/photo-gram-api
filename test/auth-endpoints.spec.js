const knex = require('knex');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Auth Endpoints', () => {
	let db;

	const { testUsers } = helpers.makePhotoGramFixtures();
	const testUser = testUsers[0];

	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		});
		app.set('db', db);
	});

	after('discontect from db', () => db.destroy());

	before('cleanup tables', () => helpers.cleanTables(db));

	afterEach('cleanup tables', () => helpers.cleanTables(db));

	describe('POST /login', () => {
		beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

		const requiredFields = ['user_name', 'password'];

		requiredFields.forEach(field => {
			const loginAttempBody = {
				user_name: testUser.user_name,
				password: testUser.password
			};

			it(`responds with 400 when required ${field} is missing`, done => {
				delete loginAttempBody[field];
				done();
				return supertest(app)
					.post('/login')
					.send(loginAttempBody)
					.expect(400, { error: `Missing ${field} in request body` });
			});
		});

		it(`responds 400 'invalid user name or password' when bad user name`, done => {
			const userInvalidUser = { user_name: 'user-not', password: 'existy' };
			done();
			return supertest(app)
				.post('/login')
				.send(userInvalidUser)
				.expect(400, { error: `Invalid user name or password` });
		});

		it(`responds 400 'invalid user name or password' when bad password`, done => {
			const userInvalidUser = {
				user_name: testUser.user_name,
				password: 'incorrect'
			};
			done();
			return supertest(app)
				.post('/login')
				.send(userInvalidUser)
				.expect(400, { error: `Invalid user name or password` });
		});

		it(`responds 200 and JWT auth token using secret when using valid credentials`, done => {
			const userValidCreds = {
				user_name: testUser.user_name,
				password: testUser.password
			};
			const expectedToken = jwt.sign(
				{ user_id: testUser.id }, //payload
				process.env.JWT_SECRET,
				{
					subject: testUser.user_name,
					expiresIn: process.env.JWT_EXPIRY,
					algorithm: 'HS256'
				}
			);
			done();
			return supertest(app)
				.post('/login')
				.send(userValidCreds)
				.expect(200, { authToken: expectedToken });
		});
	});
});
