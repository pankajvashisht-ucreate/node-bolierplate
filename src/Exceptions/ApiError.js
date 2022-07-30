import { AppError } from "./AppError";

class ApiError extends AppError {
	constructor(message, code = 403) {
		super({ message, code });
		this.code = code;
		this.message = message;
	}
}

export { ApiError };
