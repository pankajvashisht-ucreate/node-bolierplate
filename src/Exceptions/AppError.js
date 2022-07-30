class AppError extends Error {
	constructor({ message, details = {} } = {}) {
		super(message || details.message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
		this.details = message;
	}
}

export { AppError };
