import * as Mongoose from 'mongoose';
import { Movie } from '../domain/Movie';
import { UserActivity } from '../domain/UserActivity';

let movieSchema = new Mongoose.Schema({
	released: { type: Mongoose.Schema.Types.Date, required: false },
	title: { type: String, required: true },
	genre: { type: String, required: true },
	director: { type: String, required: true },
	imdbId: { type: String, required: true },
	createdOn: { type: Mongoose.Schema.Types.Date, required: true },
	createdBy: { type: Mongoose.Schema.Types.Number, required: true }
});
let userActivitySchema = new Mongoose.Schema({
	userId: { type: Mongoose.Schema.Types.Number, required: true },
	activity: { type: Object, required: true }
});

interface MovieDocument extends Mongoose.Document, Movie {}
interface UserActivityDocument extends Mongoose.Document, UserActivity {}

export class Database {
	readonly movie = Mongoose.model<MovieDocument>('movie', movieSchema);
	readonly userActivity = Mongoose.model<UserActivityDocument>('userActivity', userActivitySchema);

	init(connectionString: string): void {
		Mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
		Mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
		Mongoose.connection.on('open', () => console.log('connected to database'));
	}
}
