import { Controller, Body, Post, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthRequest, AuthResponse } from '../dto/AuthRequest';
import { UserService } from '../services/UserService';


@Controller('auth')
export class AuthController {

	@Inject() userService: UserService

	@Post()
	@ApiResponse({ status: 200, type: AuthResponse })
	async authenticate(@Body() request: AuthRequest): Promise<AuthResponse> {
		return await this.userService.authenticate(request);
	}
}
