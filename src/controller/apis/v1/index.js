import { Vaildation } from 'utils';
import { User } from 'models/index';
class Users {
	async login({ body: { email, phone } }) {
		const requestData = await Vaildation({
			email,
			phone,
		});
		const data = await User.findAll();

		return {
			data: data,
			message: 'hello world',
			status: 200,
		};
	}
}

export default new Users();
