const express = require('express');
const path = require('path');
const SignUpService = require('./signUp-service');
const signUpRouter = express.Router();
const jsonBodyParser = express.json();

signUpRouter.post('/', jsonBodyParser, (req, res, next) => {
	const { full_name, user_name, email, password } = req.body;

	for (const field of ['full_name', 'user_name', 'email', 'password'])
		if (!req.body[field])
			return res
				.status(400)
				.json({ error: `Missing '${field}' in request body'` });

	const passwordError = SignUpService.validatePassword(password);
	if (passwordError) return res.status(400).json({ error: passwordError });

	SignUpService.hasUserWithUserName(req.app.get('db'), user_name)
		.then(hasUserWithUserName => {
			if (hasUserWithUserName)
				return res.status(400).json({ error: 'Username already taken.' });

			return SignUpService.hashPassword(password).then(hashedPassword => {
				const newUser = {
					email,
					user_name,
					password: hashedPassword,
					full_name,
					date_created: 'now()'
				};
				return SignUpService.insertUser(req.app.get('db'), newUser).then(
					user => {
						res
							.status(201)
							.location(path.posix.join(req.originalUrl, `/${user.id}`))
							.json(SignUpService.serializeUser(user));
					}
				);
			});
		})
		.catch(next);
});
module.exports = signUpRouter;
