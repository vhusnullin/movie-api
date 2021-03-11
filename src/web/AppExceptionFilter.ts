import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { AppException } from '../dto/AppException';


@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
	catch(exception: AppException, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse<Response>();
		response
			.status(500)
			.json({ error: exception.message, message: 'Operation failed' });
	}
}
