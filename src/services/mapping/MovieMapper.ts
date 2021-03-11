import { Inject, Injectable } from '@nestjs/common';
import { Movie } from '../../dao/domain/Movie';
import { MovieDto } from '../../dto/MovieDto';
import { UserDto } from '../../dto/UserDto';
import { OmdbMovie } from '../omdb/OmdbMovie';
import { DateFormat } from '../common/DateFormat';

@Injectable()
export class MovieMapper {
	
	@Inject() dateFormat: DateFormat;

	toDomain(omdbMovie: OmdbMovie, currentUser: UserDto): Movie {
		return {
			title: omdbMovie.Title,
			released: this.dateFormat.parseOmdb(omdbMovie.Released),
			genre: omdbMovie.Genre,
			director: omdbMovie.Director,
			imdbId: omdbMovie.imdbID,
			createdOn: new Date(),
			createdBy: currentUser.userId
		};
	}

	toDto(item: Movie): MovieDto {
		return {
			id: item._id,
			title: item.title,
			released: this.dateFormat.toDto(item.released),
			genre: item.genre,
			director: item.director
		};
	}

	toDtoList(items: Movie[]): MovieDto[] {
		return items.map(o => this.toDto(o));
	}
}
