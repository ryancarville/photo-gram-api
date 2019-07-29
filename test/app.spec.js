const app = require('../src/app');

describe('App', () => {
	it('GET / responds with 200', () => {
		return supertest(app)
			.get('/')
			.expect(200);
	});
	it('POST /signup responds with 201 and json Object', () => {
		const userObject = {
			id: 1,
			full_name: 'Test User',
			user_name: 'TestUser',
			password: 'testPassword',
			date_created: 'now()'
		};
		return supertest(app)
			.get('/singup')
			.expect(userObject);
	});
});
