const express = require('express');
const LandingPageService = require('./landingPage-service');
const landingPageRouter = express.Router();

landingPageRouter.get('/', (req, res, next) => {
	const db = req.app.get('db');
	LandingPageService.getLandingPage(db)
		.then(lp => {
			res.status(200).json(lp);
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});

module.exports = landingPageRouter;
