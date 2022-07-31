export const setLanguage = (req, res, next) => {
	req.lang = 'en';
	global._Lang = 'en';
	return next();
};
