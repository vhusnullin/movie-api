import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Request } from 'express';
import { AppContext } from '../controllers/helpers/AppContext';
import { JwtHelper } from '../services/common/JwtHelper';


@Injectable()
export class AuthGuard implements CanActivate {

	@Inject() jwtHelper: JwtHelper;
	@Inject() appContext: AppContext;

	async canActivate(context: ExecutionContext): Promise<boolean> {
		let request = context.switchToHttp().getRequest() as Request;
		let token = request.headers.authorization;
		let user = await this.jwtHelper.verifyToken(token);
		if (!user) {
			return false;
		}

		this.appContext.setCurrentUser(request, user);
		return true;
	}
}
