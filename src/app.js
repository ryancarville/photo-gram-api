require('dotenv').config;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const jsonBodyParse = express.json();
const landingPageRouter = require('./landingPage/landingPage-router');
const signUpRouter = require('./signUp/signUp-router');
const authRouter = require('./auth/auth-router');
const userRouter = require('./user/user-router');
const albumRouter = require('./album/album-router');
const imageRouter = require('./images/image-router');
const uploadRouter = require('./upload/upload-router');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.use(jsonBodyParse);
app.use('/', landingPageRouter);
app.use('/signup', signUpRouter);
app.use('/login', authRouter);
app.use('/user', userRouter);
app.use('/albums', albumRouter);
app.use('/images', imageRouter);
app.use('/upload', uploadRouter);

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
