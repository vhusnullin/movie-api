import { Injectable } from '@nestjs/common';
import { SessionFactory } from './database/SessionFactory';
import { UserActivity } from './domain/UserActivity';


@Injectable()
export class UserActivityDao {
	constructor(private readonly sessionFactory: SessionFactory) {
	}

	async findByUserId(userId: number): Promise<UserActivity> {
		let session = this.sessionFactory.getSession();
		let item = await session.userActivity.findOne({ userId: userId });
		if (!item) {
			item = await session.userActivity.create({ userId: userId, activity: { createdMovies: [] } });
		}

		return item;
	}

	async update(item: UserActivity): Promise<UserActivity> {
		let session = this.sessionFactory.getSession();
		return await session.userActivity.findOneAndUpdate({_id: item._id}, item);
	}
}
