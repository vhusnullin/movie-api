import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserDto } from '../../dto/UserDto';


@Injectable()
export class JwtConfig {
	issuer: string;
	expiresIn: number;
	secret: string;
}

@Injectable()
export class JwtHelper {
	constructor(private readonly config: JwtConfig) {
	}

	generateToken(user: UserDto): Promise<string> {
		return new Promise((resolve, reject) => {
			let options = {
				issuer: this.config.issuer,
				subject: `${user.userId}`,
				expiresIn: this.config.expiresIn,
			 };
			jwt.sign(user, this.config.secret, options, (err, token) => resolve(token));
		});
	}

	verifyToken(token: string): Promise<UserDto> {
		return new Promise((resolve, reject) => {
			jwt.verify(token, this.config.secret, (err, data) => resolve(data as UserDto));
		});
	}
}
