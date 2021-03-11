import { AuthRequest, AuthResponse } from '../dto/AuthRequest';
import { UserService } from '../services/UserService';
import { AuthController } from './AuthController';


describe('AuthController', () => {
	let target: AuthController;
	let uerService: UserService;

	beforeEach(() => {
		uerService = new UserService();
		target = new AuthController();
		target.userService = uerService;
	});

	describe('authenticate', () => {
		test('', async () => {
			let request = {} as AuthRequest;
			let response = {} as AuthResponse;
			let mockAuthenticate = jest.spyOn(uerService, 'authenticate').mockReturnValueOnce(Promise.resolve(response));
			expect(await target.authenticate(request)).toBe(response);
			expect(mockAuthenticate).toBeCalledWith(request);
		});
	});
});
