import { UserDto } from '../../dto/UserDto';
import { RoleHelper } from './RoleHelper';


describe('RoleHelper', () => {
	let target: RoleHelper;

	beforeEach(() => {
		target = new RoleHelper();
	});

	describe('isPremium', () => {
		test('returns true for premium', async () => {
			let user = {	role: 'premium' } as UserDto;
			expect(target.isPremium(user)).toBeTruthy();
		});

		test('returns false for basic', async () => {
			let user = {	role: 'basic' } as UserDto;
			expect(target.isPremium(user)).toBeFalsy();
		});

		test('returns false for other', async () => {
			let user = {	role: 'other' } as UserDto;
			expect(target.isPremium(user)).toBeFalsy();
		});
	});
});
