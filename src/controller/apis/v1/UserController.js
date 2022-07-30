import { User } from 'models';
import { Vaildation } from 'utils';
import ApiController from './ApiController';
class UsersController extends ApiController {
	async login({ lang, body: { email, phone } }) {
		const requestData = await Vaildation({
			email,
			phone,
		});
		const data = await User.findAll();

		return {
			data: data,
			message: 'hello world',
			status: 200,
			lang,
		};
	}
}

export default new UsersController();
