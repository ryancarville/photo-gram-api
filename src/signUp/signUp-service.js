const xss = require('xss');
const bcrypt = require('bcryptjs');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const SignUpService = {
	hasUserWithUserName(db, user_name) {
		return db
			.from('photogram_users')
			.where({ user_name })
			.first()
			.then(user => !!user);
	},
	insertUser(db, newUser) {
		return db
			.insert(newUser)
			.into('photogram_users')
			.returning('*')
			.then(([user]) => user);
	},
	validatePassword(password) {
		if (password.length < 8) {
			return 'Password must be at least 8 characters long.';
		}
		if (password.length > 72) {
			return 'Password must be less than 72 characters long.';
		}
		if (password.startsWith(' ') || password.endsWith(' ')) {
			return 'Password must not start or end with a empty space.';
		}
		if (REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
			return 'Passsword must contain 1 upper case letter, lowercase letter, number and special character.';
		}
		return null;
	},
	hashPassword(password) {
		return bcrypt.hash(password, 12);
	},
	serializeUser(user) {
		return {
			id: user.id,
			full_name: xss(user.full_name),
			user_name: xss(user.user_name),
			password: xss(user.passsword),
			date_created: new Date(user.date_created)
		};
	}
};
module.exports = SignUpService;
