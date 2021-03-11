import { UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../dto/UserDto';
import { UserDao } from '../dao/UserDao';
import { UserMapper } from './mapping/UserMapper';
import { JwtHelper } from './common/JwtHelper';
import { AuthRequest, AuthResponse } from '../dto/AuthRequest';
import { User } from '../dao/domain/User';
import { UserService } from './UserService';


describe('UserService', () => {
	let target: UserService;
	let userDao: UserDao;
	let userMapper: UserMapper;
	let jwtHelper: JwtHelper;

	beforeEach(() => {
		userDao = new UserDao();
		userMapper = new UserMapper();
		jwtHelper = new JwtHelper(null);
		target = new UserService();
		target.userDao = userDao;
		target.userMapper = userMapper;
		target.jwtHelper = jwtHelper;
	});

	describe('authenticate', () => {
		test('fails in no user found', async () => {
			let request = { username: 'USERNAME' } as AuthRequest;
			let userDao_findByUsername = jest.spyOn(userDao, 'findByUsername').mockReturnValueOnce(null);

			let targetFunc = async () => await target.authenticate(request);
			await expect(targetFunc).rejects.toBeInstanceOf(UnauthorizedException);

			expect(userDao_findByUsername).toBeCalledWith('USERNAME');
		});

		test('fails if wrong password', async () => {
			let request = { username: 'USERNAME' } as AuthRequest;
			let foundUser = {} as User;
			let userDao_findByUsername = jest.spyOn(userDao, 'findByUsername').mockReturnValueOnce(Promise.resolve(foundUser));
			let userMapper_canAuthenticate = jest.spyOn(userMapper, 'canAuthenticate').mockReturnValueOnce(false);

			let targetFunc = async () => await target.authenticate(request);
			await expect(targetFunc).rejects.toBeInstanceOf(UnauthorizedException);

			expect(userDao_findByUsername).toBeCalledWith('USERNAME');
			expect(userMapper_canAuthenticate).toBeCalledWith(foundUser, request);
		});

		test('full flow', async () => {
			let request = { username: 'USERNAME' } as AuthRequest;
			let foundUser = {} as User;
			let userDto = {} as UserDto;
			let response = {} as AuthResponse;
			let userDao_findByUsername = jest.spyOn(userDao, 'findByUsername').mockReturnValueOnce(Promise.resolve(foundUser));
			let userMapper_canAuthenticate = jest.spyOn(userMapper, 'canAuthenticate').mockReturnValueOnce(true);
			let userMapper_toDto = jest.spyOn(userMapper, 'toDto').mockReturnValueOnce(userDto);
			let jwtHelper_generateToken = jest.spyOn(jwtHelper, 'generateToken').mockReturnValueOnce(Promise.resolve('TOKEN_TEXT'));
			let userMapper_toAuthResponse = jest.spyOn(userMapper, 'toAuthResponse').mockReturnValueOnce(response);

			await expect(await target.authenticate(request)).toBe(response);

			expect(userDao_findByUsername).toBeCalledWith('USERNAME');
			expect(userMapper_canAuthenticate).toBeCalledWith(foundUser, request);
			expect(userMapper_toDto).toBeCalledWith(foundUser);
			expect(jwtHelper_generateToken).toBeCalledWith(userDto);
			expect(userMapper_toAuthResponse).toBeCalledWith('TOKEN_TEXT');
		});
	});
});
