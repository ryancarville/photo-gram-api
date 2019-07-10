const AuthServices = require('../auth/auth-service');

function requireAuth(req, res, next) {
	const authToken = req.get('Authorization') || '';
	let basicToken;

	if (!authToken.toLowerCase().startsWith('basic ')) {
		return res.status(400).json({ error: 'Missing basic token' });
	} else {
		basicToken = authToken.slice('basci '.length, authToken.length);
	}

	const [tokenUserName, tokenPassword] = Buffer.from(basicToken, 'base64')
		.toString()
		.split(':');

	if (!tokenUserName || !tokenPassword) {
		return res.status(401).json({ error: 'Unauthorized request' });
	}
	req.app
		.get('db')('photoGram_users')
		.where({ user_name: tokenUserName })
		.first()
		.then(user => {
			if (!user) {
				return res.status(401).json({ error: 'Unauthroized request' });
			}

			return AuthServices.comparePasswords(tokenPassword, user.password).then(
				passwordMatch => {
					if (!passwordMatch) {
						return res.status(401).json({ error: 'Unauthorized request' });
					}
					req.user = user;
					next();
				}
			);
		})
		.catch(next);
}
module.exports = { requireAuth };
