const express = require('express');
const AuthService = require('./auth-service');
const authRouter = express.Router();
const jsonParser = express.json();

authRouter.post('/', jsonParser, (req, res, next) => {
	const { user_name, password } = req.body;
	const loginUser = { user_name, password };
	for (const [key, value] of Object.entries(loginUser)) {
		if (value == 0) {
			return res.status(400).json({ error: `Please enter a ${key}` });
		}
	}
	AuthService.getUserWithUserName(req.app.get('db'), loginUser.user_name)
		.then(dbUser => {
			if (!dbUser) {
				return res
					.status(401)
					.json({ error: 'Incorrect user name or password' });
			}
			return AuthService.comparePassword(
				loginUser.password,
				dbUser.password
			).then(compareMatch => {
				if (!compareMatch)
					return res
						.status(401)
						.json({ error: 'Incorrect user name or password' });
				const sub = dbUser.user_name;
				const payload = { user_id: dbUser.id };
				res.send({
					user: dbUser,
					authToken: AuthService.createJwt(sub, payload)
				});
			});
		})
		.catch(next);
});
module.exports = authRouter;
