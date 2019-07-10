module.exports = {
	PORT: process.env.PORT || 5432,
	NODE_ENV: process.env.NODE_ENV || 'development',
	DB_URL: process.env.DB_URL || 'postgresql://ryancarville@127.0.0.1/photoGram',
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRY: process.env.JWT_EXPIRY
};
