import { Request } from 'express';
import { UserDto } from '../../dto/UserDto';
import { AppContext } from './AppContext';


describe('AppContext', () => {
	let target: AppContext;

	beforeEach(() => {
		target = new AppContext();
	});

	describe('getCurrentUser', () => {
		test('', async () => {
			let user = {} as UserDto;
			let request = { user: user } as any as Request;
			expect(target.getCurrentUser(request)).toBe(user);
		});
	});

	describe('setCurrentUser', () => {
		test('', async () => {
			let user = {} as UserDto;
			let request = {} as any as Request;
			target.setCurrentUser(request, user);
			expect(request['user']).toBe(user);
		});
	});
});
