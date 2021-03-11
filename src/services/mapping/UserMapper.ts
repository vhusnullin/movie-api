import { Injectable } from '@nestjs/common';
import { User } from '../../dao/domain/User';
import { AuthRequest, AuthResponse } from '../../dto/AuthRequest';
import { UserDto } from '../../dto/UserDto';

@Injectable()
export class UserMapper {

	toDto(domain: User): UserDto {
		return {
			userId: domain.id,
			name: domain.name,
			role: domain.role
		};
	}

	toAuthResponse(token: string): AuthResponse {
		return {
			token: token
		};
	}

	canAuthenticate(user: User, authRequest: AuthRequest): boolean {
		return user.password === authRequest.password;
	}
}
