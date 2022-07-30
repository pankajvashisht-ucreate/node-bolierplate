import { ApiError } from "Exceptions/ApiError";
export const vaildation = async (required, nonRequired = {}) => {
	try {
		let message = "";
		const empty = [];
		console.log(required);
		for (let key in required) {
			if (Object.prototype.hasOwnProperty.call(required, key)) {
				if (required[key] === undefined || required[key] === "") {
					empty.push(key);
				}
			}
		}
		if (empty.length) {
			message = empty.toString();
			if (empty.length > 1) {
				message += ` fields are required`;
			} else {
				message += ` fields is required`;
			}
			throw new ApiError(message, 400);
		}
		const finalResult = Object.assign(required, nonRequired);
		for (let data in finalResult) {
			if (finalResult[data] === undefined) {
				delete finalResult[data];
			} else {
				if (typeof finalResult[data] == "string") {
					finalResult[data] = finalResult[data].trim();
				}
			}
		}
		return finalResult;
	} catch (err) {
		throw new ApiError(err, 400);
	}
};
