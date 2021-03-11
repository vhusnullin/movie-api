export class AppException extends Error {
	constructor(
		readonly message: string) {
			super();
			this.name = 'AppException';
			this.message = message;
	}
}
