require('dotenv').config;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helemt = require('helmet');
const { NODE_ENV } = require('./config');
const signUpRouter = require('./signUp/signUp-router');
const authRouter = require('./auth/auth-router');
const homepageRouter = require('./homepage/homepage-router');
const albumsRouter = require('./albums/albums-router');
const imagesRouter = require('./images/images-router');
const editRouter = require('./edit/edit-router');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganOption));
app.use(cors());
app.use(helemt());

app.use('/signup', signUpRouter);
app.use('/login', authRouter);
app.use('/homepage', homepageRouter);
app.use('/album/:album_id', albumsRouter);
app.use('/image/:image_id', imagesRouter);
app.use('/edit/:image_id', editRouter);

app.use(function errorHandler(error, req, res, next) {
	let response;
	if (NODE_ENV === 'production') {
		response = { error: { message: 'server error' } };
	} else {
		console.error(error);
		response = { message: error.message, error };
	}
	res.status(500).json(response);
});

module.exports = app;
