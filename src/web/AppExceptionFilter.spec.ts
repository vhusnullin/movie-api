import { ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AppContext } from '../controllers/helpers/AppContext';
import { JwtHelper } from '../services/common/JwtHelper';
import { AppExceptionFilter } from './AppExceptionFilter';
import { AppException } from '../dto/AppException';


describe('AppExceptionFilter', () => {
	let target: AppExceptionFilter;
	let jwtHelper: JwtHelper;
	let appContext: AppContext;

	beforeEach(() => {
		jwtHelper = new JwtHelper(null);
		target = new AppExceptionFilter();
	});

	describe('catch', () => {
		test('return 500 with Operation Failed', async () => {
			let exception = { message: 'EXCEPTION_MESSAGE'} as AppException;
			let host = { switchToHttp: jest.fn() } as any as ArgumentsHost;
			let httpArgHost = { getResponse: jest.fn() } as any as HttpArgumentsHost;
			let response = { status: jest.fn(), json: jest.fn() } as any as Response;

			let host_switchToHttp = jest.spyOn(host, 'switchToHttp').mockReturnValueOnce(httpArgHost);
			let httpArgHost_getResponse = jest.spyOn(httpArgHost, 'getResponse').mockReturnValueOnce(response);
			let response_status = jest.spyOn(response, 'status').mockReturnValueOnce(response);
			let response_json = jest.spyOn(response, 'json').mockReturnValueOnce(null);

			target.catch(exception, host)
			expect(host_switchToHttp).toBeCalled();
			expect(httpArgHost_getResponse).toBeCalled();
			expect(response_status).toBeCalledWith(500);
			expect(response_json).toBeCalledWith({ error: 'EXCEPTION_MESSAGE', message: 'Operation failed' });
		});
	});
});
