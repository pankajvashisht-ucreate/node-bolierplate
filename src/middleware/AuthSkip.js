const missingRoutes = {
	'app-information': 'GET',
	'forgot-password': 'POST',
	'user/login': 'POST',
	'user/signup': 'POST',
	'user/soical-login': 'POST',
	goals: 'GET',
	category_details: 'GET',
	articles: 'GET',
	categories: 'GET',
	'question-categoires': 'GET',
	'user/login-phone': 'POST',
	'stripe-connect': 'GET',
	services: 'GET',
};
const makeUrl = (req) => {
	let url = req.path.split('/');
	url.shift();
	if (url.indexOf(req.lang) !== -1) {
		url.pop();
	}
	if (!isNaN(url[url.length - 1])) {
		url.pop();
	}
	return (url = url.join('/'));
};
const AuthSkip = (req, res, next) => {
	req.auth = true;
	const url = makeUrl(req);
	if (
		(!req.headers.hasOwnProperty('authorization') ||
			!req.headers.authorization.length) &&
		missingRoutes.hasOwnProperty(url)
	) {
		if (req.method === missingRoutes[url] || missingRoutes[url] === 'ALL') {
			req.auth = false;
		}
	}
	next();
};

export default AuthSkip;
