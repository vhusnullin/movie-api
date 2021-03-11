import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDao } from '../dao/UserDao';
import { AuthRequest, AuthResponse } from '../dto/AuthRequest';
import { UserMapper } from './mapping/UserMapper';
import { JwtHelper } from './common/JwtHelper';


@Injectable()
export class UserService {

	@Inject() userDao: UserDao;
	@Inject() userMapper: UserMapper;
	@Inject() jwtHelper: JwtHelper;

	async authenticate(request: AuthRequest): Promise<AuthResponse> {
		let user = await this.userDao.findByUsername(request.username);
		if (!user) {
			throw new UnauthorizedException();
		}

		if (!this.userMapper.canAuthenticate(user, request)) {
			throw new UnauthorizedException();
		}

		let userDto = this.userMapper.toDto(user);
		let token = await this.jwtHelper.generateToken(userDto);
		return this.userMapper.toAuthResponse(token);
	}
}
