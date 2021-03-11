import { Injectable } from '@nestjs/common';
import { DatabaseFactory } from './database/DatabaseFactory';
import { Movie } from './domain/Movie';


@Injectable()
export class MovieDao {
	constructor(private readonly databaseFactory: DatabaseFactory) {
	}

	async save(item: Movie): Promise<Movie> {
		let database = this.databaseFactory.getDatabase();
		return await database.movie.create(item);
	}

	async findByImdb(imdbId: string): Promise<Movie> {
		let database = this.databaseFactory.getDatabase();
		return await database.movie.findOne({ imdbId: imdbId});
	}

	async findByUser(userId: number): Promise<Movie[]> {
		let database = this.databaseFactory.getDatabase();
		return await database.movie.find({ createdBy: userId });
	}
}
