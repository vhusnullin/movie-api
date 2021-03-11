import { Movie } from '../../dao/domain/Movie';
import { UserDto } from '../../dto/UserDto';
import { DateFormat } from '../common/DateFormat';
import { OmdbMovie } from '../omdb/OmdbMovie';
import { MovieMapper } from './MovieMapper';


describe('MovieMapper', () => {
	let target: MovieMapper;
	let dateFormat: DateFormat;

	beforeEach(() => {
		dateFormat = new DateFormat();
		target = new MovieMapper();
		target.dateFormat = dateFormat;
	});

	describe('toDomain', () => {
		test('', () => {
			let releaseDate = new Date();
			let omdbMovie: OmdbMovie = {
				Title: 'TITLE',
				Released: 'RELEASED',
				Genre: 'GENRE',
				Director: 'DIRECTOR',
				imdbID: 'IMDB_ID'
			};
			let user: UserDto = {
				userId: 1111
			};
			let mockdateFormatParseOmdb = jest.spyOn(dateFormat, 'parseOmdb').mockReturnValueOnce(releaseDate);

			let actual = target.toDomain(omdbMovie, user);
			expect(mockdateFormatParseOmdb).toBeCalledWith('RELEASED');
			expect(actual.title).toBe('TITLE');
			expect(actual.released).toBe(releaseDate);
			expect(actual.genre).toBe('GENRE');
			expect(actual.director).toBe('DIRECTOR');
			expect(actual.imdbId).toBe('IMDB_ID');
			expect(actual.createdOn).toBeDefined();
			expect(actual.createdBy).toBe(1111);
		});
	});

	describe('toDto', () => {
		test('', () => {
			let releaseDate = new Date();
			let movie: Movie = {
				_id: 1111,
				title: 'TITLE',
				released: releaseDate,
				genre: 'GENRE',
				director: 'DIRECTOR'
			};
			let mockdateFormatToDto = jest.spyOn(dateFormat, 'toDto').mockReturnValueOnce('RELEASED');

			let actual = target.toDto(movie);
			expect(mockdateFormatToDto).toBeCalledWith(releaseDate);
			expect(actual.id).toBe(1111);
			expect(actual.title).toBe('TITLE');
			expect(actual.released).toBe('RELEASED');
			expect(actual.genre).toBe('GENRE');
			expect(actual.director).toBe('DIRECTOR');
		});
	});
});
