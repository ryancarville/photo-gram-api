const express = require('express');
const LandingPageService = require('./landingPage-service');
const landingPageRouter = express.Router();

landingPageRouter.get('/', (req, res, next) => {
	const db = req.app.get('db');
	LandingPageService.getLandingPage(db)
		.then(lp => {
			res.json(lp);
		})
		.catch(next);
});

module.exports = landingPageRouter;
