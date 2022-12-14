import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './src/routes/index.js';
import apiRoute from './src/routes/apis/v1/index.js';
import { errorResponse, notFound } from './src/utils/index.js';
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
app.use('/api/v1', apiRoute);

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorResponse);
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
