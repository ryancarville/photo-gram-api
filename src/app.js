require('dotenv').config;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helemt = require('helmet');
const { NODE_ENV } = require('./config');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const homepageRouter = require('./homepage/homepage-router');
const albumsRouter = require('./albums/albums-router');
const imagesRouter = require('./images/images-router');
const editRouter = require('./edit/edit-router');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganOption));
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(helemt());

app.get('/api/*', (req, res) => {
	res.json({ ok: true });
});
app.use('/login', authRouter);
app.use('/:users', usersRouter);
app.use('/:users/homepage', homepageRouter);
app.use('/:users/album/:album_id', albumsRouter);
app.use('/:users/image/:image_id', imagesRouter);
app.use('/:users/edit/:image_id', editRouter);

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
