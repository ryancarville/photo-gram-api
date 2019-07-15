const LandingPageService = {
	getLandingPage(db) {
		return db('photogram_landingpage').select(
			'desktop_img_url',
			' mobile_img_url'
		);
	}
};

module.exports = LandingPageService;
