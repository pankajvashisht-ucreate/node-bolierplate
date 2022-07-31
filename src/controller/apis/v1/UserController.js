import { User } from 'models';
import { Vaildation, paginationInfo } from 'utils';
import ApiController from './ApiController';
class UsersController extends ApiController {
	async login({ lang, body: { email, phone }, ...rest }) {
		const requestData = await Vaildation({
			email,
			phone,
		});
		const data = await User.findAndCountAll({
			offset: 1,
			limit: 1,
		});
		return {
			data: paginationInfo(rest, data),
			message: 'hello world',
			status: 200,
			lang,
		};
	}
}

export default new UsersController();
