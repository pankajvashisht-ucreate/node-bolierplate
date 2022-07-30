const Apiresponse = (fn) => async (req, res, next) => {
	try {
		const { data = {}, message, status = 200 } = await fn(req, res);
		res.status(status).send({
			success: true,
			status,
			message,
			data,
		});
	} catch (err) {
		return error(res, err);
	}
};

const error = (res, err) => {
	try {
		const code =
			typeof err === "object"
				? err.hasOwnProperty("code")
					? err.code
					: 500
				: 403;
		const message =
			typeof err === "object"
				? err.hasOwnProperty("details")
					? err.details.message || err.details
					: err
				: err;
		res.status(code).json({
			success: false,
			errorMessage:
				typeof message === "object" || code === 500
					? JSON.stringify(err)
					: message,
			code,
			data: [],
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			errorMessage: typeof error === "object" ? JSON.stringify(error) : error,
			code: 500,
			data: [],
		});
	}
};
export default Apiresponse;
