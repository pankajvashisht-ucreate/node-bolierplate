import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import createError from "http-errors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./src/routes/index.js";
import V1Apis from "./src/routes/apis/v1/index.js";
dotenv.config();
require("./src/database/index.js");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "src/public")));

app.use("/", indexRouter);
app.use("/api/v1", V1Apis);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});
app.on("error", (appErr, appCtx) => {
	console.error("app error", appErr.stack);
	console.error("on url", appCtx.req.url);
	console.error("with headers", appCtx.req.headers);
});

process.on("SIGTERM", () => {
	console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
	server.close(() => {
		console.log("💥 Process terminated!");
	});
});
process
	.on("unhandledRejection", (reason, p) => {
		console.error(reason, "Unhandled Rejection at Promise", p);
		server.close(() => {
			process.exit(1);
		});
	})
	.on("uncaughtException", (err) => {
		console.error(err, "Uncaught Exception thrown");
		process.exit(1);
	});
export default app;
