import { ApiError } from 'Exceptions/ApiError';
import jwt from 'jsonwebtoken';
import { User } from 'models';

const UserAuth = async (req, res, next) => {
	try {
		if (!req.auth) {
			return next();
		}
		if (!(req.headers && req.headers['authorization'])) {
			throw new ApiError('Authorization key is required', 400);
		}
		const token = req.headers['authorization'];

		const decoded = jwt.verify(token, process.env.SECRET);
		const user = await User.scope('withSecretColumns').findOne({
			where: { email: decoded.user.email },
		});
		if (!user) {
			throw new ApiError('Invaild Authorization', 401);
		}
		const reqUser = { ...user.get() };
		req.userInfo = reqUser;
		req.userId = user.id;
		return next();
	} catch (error) {
		return res.status(error.code).json({
			status: false,
			code: error.code,
			errorMessage: error.details,
			success: false,
		});
	}
};

export default UserAuth;
