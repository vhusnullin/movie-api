import { Injectable } from '@nestjs/common';
import { OmdbMovie } from './OmdbMovie';
import { JsonApi } from '../common/JsonApi';
import { OmdbConfig } from './OmdbConfig';

@Injectable()
export class OmdbProxy {
	constructor(
		private readonly jsonApi: JsonApi,
		private readonly config: OmdbConfig) {
	}

	async findByTitle(title: string): Promise<OmdbMovie> {
		let movie = await this.jsonApi.get<OmdbMovie>(`${this.config.url}/?apikey=${this.config.apiKey}&t=${title}`);
		if (movie.Error) {
			return null;
		}

		return movie;
	}
}
