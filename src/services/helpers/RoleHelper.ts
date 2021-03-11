import { Injectable } from '@nestjs/common';
import { UserDto } from '../../dto/UserDto';

@Injectable()
export class RoleHelper {

	isPremium(user: UserDto): boolean {
		return user.role === 'premium';
	}
}
