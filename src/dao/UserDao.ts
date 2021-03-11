import { Injectable } from '@nestjs/common';
import { User } from './domain/User';


const users: User[] = [{
		id: 123,
		role: "basic",
		name: "Basic Thomas",
		username: "basic-thomas",
		password: "sR-_pcoow-27-6PAwCD8",
	}, {
		id: 434,
		role: "premium",
		name: "Premium Jim",
		username: "premium-jim",
		password: "GBLtTyq3E_UNjFnpo9m6",
	}];

@Injectable()
export class UserDao {
	constructor() {
	}

	async findByUsername(username: string): Promise<User> {
		return new Promise<User>((resolve, reject) => {
			let user = users.find(o => o.username === username);
			resolve(user);
		});
	}
}
