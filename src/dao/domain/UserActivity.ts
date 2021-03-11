export class UserActivity {
	_id?: any;
	userId: number;
	activity: {
		createdMovies: {
			movieId: string;
			createdOn: Date;
		}[];
	}
}
