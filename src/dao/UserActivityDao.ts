import { Injectable } from '@nestjs/common';
import { DatabaseFactory } from './database/DatabaseFactory';
import { UserActivity } from './domain/UserActivity';


@Injectable()
export class UserActivityDao {
	constructor(private readonly databaseFactory: DatabaseFactory) {
	}

	async findByUserId(userId: number): Promise<UserActivity> {
		let database = this.databaseFactory.getDatabase();
		let item = await database.userActivity.findOne({ userId: userId });
		if (!item) {
			item = await database.userActivity.create({ userId: userId, activity: { createdMovies: [] } });
		}

		return item;
	}

	async update(item: UserActivity): Promise<UserActivity> {
		let database = this.databaseFactory.getDatabase();
		return await database.userActivity.findOneAndUpdate({_id: item._id}, item);
	}
}
