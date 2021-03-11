import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserDto } from '../../dto/UserDto';


@Injectable()
export class AppContext {

	getCurrentUser(req: Request): UserDto {
		return req['user'] as UserDto;
	}

	setCurrentUser(req: Request, user: UserDto): void {
		req['user'] = user;;
	}
}
