const app = require('./app');
const knex = require('knex');
const { PORT, TEST_DB_URL } = require('./config');

const db = knex({
	client: 'pg',
	connection: TEST_DB_URL
});

app.set('db', db);

app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});
