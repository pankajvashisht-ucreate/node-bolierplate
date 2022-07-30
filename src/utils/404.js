const notFound = (req, res, next) => {
	res.status(404).json({
		errorMessage: 'not found',
		code: 404,
		status: false,
	});
};

export default notFound;
