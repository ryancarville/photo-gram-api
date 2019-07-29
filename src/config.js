module.exports = {
	PORT: process.env.PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || 'development',
	CLIENT_ORIGIN: '*',
	DB_URL: process.env.DB_URL || 'postgresql://ryancarville@127.0.0.1/photoGram',
	JWT_SECRET: process.env.JWT_SECRET || 'thisIsMyJWTSecret',
	JWT_EXPIRY: process.env.JWT_EXPIRY || '20m'
};
