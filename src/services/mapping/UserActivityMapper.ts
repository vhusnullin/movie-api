import { Injectable } from '@nestjs/common';
import { Movie } from '../../dao/domain/Movie';
import { UserActivity } from '../../dao/domain/UserActivity';


@Injectable()
export class UserActivityMapper {

	isUserPermittedToCreateMovie(userActivity: UserActivity): boolean {
		if (!userActivity) {
			return true;
		}

		let now = new Date();
		let thisMonthCount = 0;
		for (let item of userActivity.activity.createdMovies) {
			if (item.createdOn.getFullYear() === now.getUTCFullYear() && item.createdOn.getUTCMonth() === now.getUTCMonth()) {
				thisMonthCount++;
			}
		}

		return thisMonthCount < 5;
	}

	addCreatedMovie(userActivity: UserActivity, movie: Movie): void {
		userActivity.activity.createdMovies.push({
			movieId: movie._id,
			createdOn: movie.createdOn
		});
	}
}
