const express = require('express');
const LandignPageService = require('./landingPage-service');
const landingPageRouter = express.Router();

landingPageRouter.get('/', (req, res, next) => {
	LandignPageService.getLandingPage(req.app.get('db'))
		.then(page => {
			res.json(page);
		})
		.catch(next);
});

module.exports = landingPageRouter;
