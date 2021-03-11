import { Injectable } from '@nestjs/common';
import { SessionFactory } from './database/SessionFactory';
import { Movie } from './domain/Movie';


@Injectable()
export class MovieDao {
	constructor(private readonly sessionFactory: SessionFactory) {
	}

	async save(item: Movie): Promise<Movie> {
		let session = this.sessionFactory.getSession();
		return await session.movie.create(item);
	}

	async findByImdb(imdbId: string): Promise<Movie> {
		let session = this.sessionFactory.getSession();
		return await session.movie.findOne({ imdbId: imdbId});
	}

	async findByUser(userId: number): Promise<Movie[]> {
		let session = this.sessionFactory.getSession();
		return await session.movie.find({ createdBy: userId });
	}
}
