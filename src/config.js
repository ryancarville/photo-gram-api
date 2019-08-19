module.exports = {
	PORT: process.env.PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || 'development',
	CLIENT_ORIGIN: '*',
	DB_URL:
		process.env.DATABASE_URL || 'postgresql://ryancarville@localhost/photoGram',
	JWT_SECRET: process.env.JWT_SECRET || 'thisIsMyJWTSecret',
	JWT_EXPIRY: process.env.JWT_EXPIRY || '20m',
	TEST_DB_URL:
		process.env.TEST_DB_URL || 'postgresql://postgres@localhost/photoGramTest'
};
