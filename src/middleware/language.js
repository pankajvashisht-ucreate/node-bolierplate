export const setLanguage = (req, res, next) => {
	Request.lang = "en";
	global._Lang = "en";
	return next();
};
