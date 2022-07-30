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
		return next(err);
	}
};

export default Apiresponse;
