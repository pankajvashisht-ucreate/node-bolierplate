const errorResponse = (err, req, res, next) => {
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
};

export default errorResponse;
