import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './src/routes/index.js';
import V1Apis from './src/routes/apis/v1/index.js';
dotenv.config();
require('./src/models/index.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/', indexRouter);
app.use('/api/v1', V1Apis);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.status(404).json({
		errorMessage: 'not found',
		code: 404,
		status: false,
	});
});

// error handler
app.use(function (err, req, res, next) {
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	try {
		const code =
			typeof err === 'object'
				? err.hasOwnProperty('code')
					? err.code
					: 500
				: 403;
		const message =
			typeof err === 'object'
				? err.hasOwnProperty('details')
					? err.details.message || err.details
					: err
				: err;
		return res.status(code).json({
			success: false,
			errorMessage:
				typeof message === 'object' || code === 500
					? JSON.stringify(err)
					: message,
			code,
			data: [],
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			errorMessage: typeof error === 'object' ? JSON.stringify(error) : error,
			code: 500,
			data: [],
		});
	}
});
app.on('error', (appErr, appCtx) => {
	console.error('app error', appErr.stack);
	console.error('on url', appCtx.req.url);
	console.error('with headers', appCtx.req.headers);
});

process.on('SIGTERM', () => {
	console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
	// server.close(() => {
	// 	console.log("💥 Process terminated!");
	// });
});
process
	.on('unhandledRejection', (reason, p) => {
		console.error(reason, 'Unhandled Rejection at Promise', p);
		// server.close(() => {
		// 	process.exit(1);
		// });
	})
	.on('uncaughtException', (err) => {
		console.error(err, 'Uncaught Exception thrown');
		process.exit(1);
	});
export default app;
