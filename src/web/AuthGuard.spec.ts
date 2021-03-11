import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AppContext } from '../controllers/helpers/AppContext';
import { JwtHelper } from '../services/common/JwtHelper';
import { AuthGuard } from './AuthGuard';
import { UserDto } from 'src/dto/UserDto';


describe('AuthGuard', () => {
	let target: AuthGuard;
	let jwtHelper: JwtHelper;
	let appContext: AppContext;

	beforeEach(() => {
		jwtHelper = new JwtHelper(null);
		appContext = new AppContext();
		target = new AuthGuard();
		target.jwtHelper = jwtHelper;
		target.appContext = appContext;
	});

	describe('canActivate', () => {
		test('with invalid token', async () => {
			let ec = { switchToHttp: jest.fn() } as any as ExecutionContext;
			let argHost = { getRequest: jest.fn() } as any as HttpArgumentsHost;
			let request = { headers: { authorization: 'AUTHORIZATION_HEADER' } } as Request;
			let ec_switchToHttp = jest.spyOn(ec, 'switchToHttp').mockReturnValueOnce(argHost);
			let argHost_getRequest = jest.spyOn(argHost, 'getRequest').mockReturnValueOnce(request);
			let jwtHelper_verifyToken = jest.spyOn(jwtHelper, 'verifyToken').mockReturnValueOnce(null);

			expect(await target.canActivate(ec)).toBe(false)
			expect(ec_switchToHttp).toBeCalled();
			expect(argHost_getRequest).toBeCalled();
			expect(jwtHelper_verifyToken).toBeCalledWith('AUTHORIZATION_HEADER');
		});
	});

	describe('canActivate', () => {
		test('with valid token', async () => {
			let ec = { switchToHttp: jest.fn() } as any as ExecutionContext;
			let argHost = { getRequest: jest.fn() } as any as HttpArgumentsHost;
			let request = { headers: { authorization: 'AUTHORIZATION_HEADER' } } as Request;
			let user = {} as UserDto;
			let ec_switchToHttp = jest.spyOn(ec, 'switchToHttp').mockReturnValueOnce(argHost);
			let argHost_getRequest = jest.spyOn(argHost, 'getRequest').mockReturnValueOnce(request);
			let jwtHelper_verifyToken = jest.spyOn(jwtHelper, 'verifyToken').mockReturnValueOnce(Promise.resolve(user));
			let appContext_setCurrentUser = jest.spyOn(appContext, 'setCurrentUser').mockReturnValueOnce();

			expect(await target.canActivate(ec)).toBe(true)
			expect(ec_switchToHttp).toBeCalled();
			expect(argHost_getRequest).toBeCalled();
			expect(jwtHelper_verifyToken).toBeCalledWith('AUTHORIZATION_HEADER');
			expect(appContext_setCurrentUser).toBeCalledWith(request, user);
		});
	});
});
