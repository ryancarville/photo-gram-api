const LandingPageService = {
	getLandingPage(db) {
		return db
			.select('desktop_Img_Url', 'mobile_Img_Url')
			.from('photogram_landingpage');
	}
};

module.exports = LandingPageService;
