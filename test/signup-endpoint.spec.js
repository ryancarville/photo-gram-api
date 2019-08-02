const knex = require('knex');
const app = require('../src/app');
const bcrypt = require('bcryptjs');
const helpers = require('./test-helpers');

describe('Signup Endpoints', () => {
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

	after('disconect from db', () => db.destroy());

	before('cleanup tables', () => helpers.cleanTables(db));

	afterEach('cleanup tables', () => helpers.cleanTables(db));

	describe(`POST /signup`, () => {
		context(`User validation`, () => {
			beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

			const requiredFields = ['user_name', 'password', 'full_name', 'email'];

			requiredFields.forEach(field => {
				const registerAttempBody = {
					full_name: 'test-full-name',
					user_name: 'test-user-name',
					email: 'test@email.com',
					password: 'test-password'
				};
				it(`responds with 400 required error when ${field} missing`, () => {
					delete registerAttempBody[field];

					return supertest(app)
						.post('/signup')
						.send(registerAttempBody)
						.expect(400, { error: `Missing '${field}' in request body` });
				});
			});
			it(`responds 400 'Password be at least 8 characters' when empty password`, () => {
				const userShortPass = {
					user_name: 'test-user-name',
					full_name: 'test-full-name',
					email: 'test@email.com',
					password: '1234567'
				};
				return supertest(app)
					.post('/signup')
					.send(userShortPass)
					.expect(400, { error: 'Password must be longer that 8 character' });
			});
			it(`responds 400 'Password must be less than 72 characters long' when long password`, () => {
				const userLongPass = {
					user_name: 'test-user-name',
					full_name: 'test-full-name',
					email: 'test@email.com',
					password: '*'.repeat(73)
				};
				return supertest(app)
					.post('/signup')
					.send(userLongPass)
					.expect(400, {
						error: `Password must be less than 72 characters long`
					});
			});
			it(`responds 400 when password starts with a space`, () => {
				const userPasswordStartsSpaces = {
					user_name: 'test user_name',
					password: ' 1Aa!2Bb@',
					full_name: 'test full_name',
					email: 'test@email.com'
				};
				return supertest(app)
					.post('/signup')
					.send(userPasswordStartsSpaces)
					.expect(400, {
						error: `Password must not start or end with empty spaces`
					});
			});
			it(`responds 400 error when password ends with spaces`, () => {
				const userPasswordEndsSpaces = {
					user_name: 'test user_name',
					password: '1Aa!2Bb@ ',
					full_name: 'test full_name',
					email: 'test@email.com'
				};
				return supertest(app)
					.post('/signup')
					.send(userPasswordEndsSpaces)
					.expect(400, {
						error: `Password must not start or end with empty spaces`
					});
			});

			it(`responds 400 'User name already taken' when user_name isn't unique`, () => {
				const duplicateUser = {
					user_name: testUser.user_name,
					password: '123dfeDAa!2Bb@$%^&',
					full_name: 'test full_name',
					email: 'test@email.com'
				};
				return supertest(app)
					.post('/signup')
					.send(duplicateUser)
					.expect(400, { error: `Username already taken` });
			});
		});

		context(`Happy path`, () => {
			it(`responds 201, serialized user, storing bcryped password`, () => {
				const newUser = {
					user_name: 'test user_name',
					password: '11AAaabb!!',
					full_name: 'test full_name',
					email: 'test@email.com'
				};
				return supertest(app)
					.post('/signup')
					.send(newUser)
					.expect(201)
					.expect(res => {
						expect(res.body).to.have.property('id');
						expect(res.body.user_name).to.eql(newUser.user_name);
						expect(res.body.full_name).to.eql(newUser.full_name);
						expect(res.body).to.not.have.property('password');
						expect(res.headers.location).to.eql(`/user/${res.body.id}`);
					})
					.expect(res =>
						db
							.from('photogram_users')
							.select('*')
							.where({ id: res.body.id })
							.first()
							.then(row => {
								expect(row.user_name).to.eql(newUser.user_name);
								expect(row.full_name).to.eql(newUser.full_name);
								return bcrypt.compare(newUser.password, row.password);
							})
							.then(compareMatch => {
								expect(compareMatch).to.be.true;
							})
					);
			});
		});
	});
});
