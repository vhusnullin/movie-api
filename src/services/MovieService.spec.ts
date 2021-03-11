import { ForbiddenException } from '@nestjs/common';
import { AppException } from '../dto/AppException';
import { UserActivity } from '../dao/domain/UserActivity';
import { MovieDao } from '../dao/MovieDao';
import { UserActivityDao } from '../dao/UserActivityDao';
import { CreateMovieRequest, MovieDto } from '../dto/MovieDto';
import { UserDto } from '../dto/UserDto';
import { RoleHelper } from './helpers/RoleHelper';
import { MovieMapper } from './mapping/MovieMapper';
import { UserActivityMapper } from './mapping/UserActivityMapper';
import { MovieService } from './MovieService';
import { OmdbProxy } from './omdb/OmdbProxy';
import { OmdbMovie } from './omdb/OmdbMovie';
import { Movie } from '../dao/domain/Movie';


describe('MovieService', () => {
	let target: MovieService;
	let roleHelper: RoleHelper;
	let movieDao: MovieDao;
	let userActivityDao: UserActivityDao;
	let movieMapper: MovieMapper;
	let userActivityMapper: UserActivityMapper;
	let omdbProxy: OmdbProxy;

	beforeEach(() => {
		roleHelper = new RoleHelper();
		movieDao = new MovieDao(null);
		userActivityDao = new UserActivityDao(null);
		movieMapper = new MovieMapper();
		userActivityMapper = new UserActivityMapper();
		omdbProxy = new OmdbProxy(null, null);
		target = new MovieService();
		target.roleHelper = roleHelper;
		target.movieDao = movieDao;
		target.userActivityDao = userActivityDao;
		target.movieMapper = movieMapper;
		target.userActivityMapper = userActivityMapper;
		target.omdbProxy = omdbProxy;
	});

	describe('save', () => {
		test('does not permit for basic user', async () => {
			let user = { userId: 1111 } as UserDto;
			let movie = {} as CreateMovieRequest;
			let userActivity = {} as UserActivity;

			let roleHelper_isPremium = jest.spyOn(roleHelper, 'isPremium').mockReturnValueOnce(false);
			let userActivityDao_findByUserId = jest.spyOn(userActivityDao, 'findByUserId').mockReturnValueOnce(Promise.resolve(userActivity));
			let userActivityMapper_isUserPermittedToCreateMovie = jest.spyOn(userActivityMapper, 'isUserPermittedToCreateMovie').mockReturnValueOnce(false);

			let targetFunc = async () => await target.save(user, movie);
			await expect(targetFunc).rejects.toBeInstanceOf(ForbiddenException);

			expect(roleHelper_isPremium).toBeCalledWith(user);
			expect(userActivityDao_findByUserId).toBeCalledWith(1111);
			expect(userActivityMapper_isUserPermittedToCreateMovie).toBeCalledWith(userActivity);
		});

		test('permits save but omdb not found', async () => {
			let user = { userId: 1111 } as UserDto;
			let movie = { title: 'TITLE' } as CreateMovieRequest;
			let userActivity = {} as UserActivity;

			let roleHelper_isPremium = jest.spyOn(roleHelper, 'isPremium').mockReturnValueOnce(false);
			let userActivityDao_findByUserId = jest.spyOn(userActivityDao, 'findByUserId').mockReturnValueOnce(Promise.resolve(userActivity));
			let userActivityMapper_isUserPermittedToCreateMovie = jest.spyOn(userActivityMapper, 'isUserPermittedToCreateMovie').mockReturnValueOnce(true);
			let omdbProxy_findByTitle = jest.spyOn(omdbProxy, 'findByTitle').mockReturnValueOnce(Promise.resolve(null));

			let targetFunc = async () => await target.save(user, movie);
			await expect(targetFunc).rejects.toThrowError('Omdb data is not found');

			expect(roleHelper_isPremium).toBeCalledWith(user);
			expect(userActivityDao_findByUserId).toBeCalledWith(1111);
			expect(userActivityMapper_isUserPermittedToCreateMovie).toBeCalledWith(userActivity);
			expect(omdbProxy_findByTitle).toBeCalledWith('TITLE');
		});

		test('permits save, omdb found, but duplicated', async () => {
			let user = { userId: 1111 } as UserDto;
			let movie = { title: 'TITLE' } as CreateMovieRequest;
			let userActivity = {} as UserActivity;
			let omdbMovie = { imdbID: 'IMDB_ID' } as OmdbMovie;
			let movieDomain = { title: 'TITLE' } as Movie;

			let roleHelper_isPremium = jest.spyOn(roleHelper, 'isPremium').mockReturnValueOnce(false);
			let userActivityDao_findByUserId = jest.spyOn(userActivityDao, 'findByUserId').mockReturnValueOnce(Promise.resolve(userActivity));
			let userActivityMapper_isUserPermittedToCreateMovie = jest.spyOn(userActivityMapper, 'isUserPermittedToCreateMovie').mockReturnValueOnce(true);
			let omdbProxy_findByTitle = jest.spyOn(omdbProxy, 'findByTitle').mockReturnValueOnce(Promise.resolve(omdbMovie));
			let movieDao_findByImdb = jest.spyOn(movieDao, 'findByImdb').mockReturnValueOnce(Promise.resolve(movieDomain));

			let targetFunc = async () => await target.save(user, movie);
			await expect(targetFunc).rejects.toThrowError('Movie already exists');

			expect(roleHelper_isPremium).toBeCalledWith(user);
			expect(userActivityDao_findByUserId).toBeCalledWith(1111);
			expect(userActivityMapper_isUserPermittedToCreateMovie).toBeCalledWith(userActivity);
			expect(omdbProxy_findByTitle).toBeCalledWith('TITLE');
			expect(movieDao_findByImdb).toBeCalledWith('IMDB_ID');
		});

		test('full flow for premiun', async () => {
			let user = { userId: 1111 } as UserDto;
			let movie = { title: 'TITLE' } as CreateMovieRequest;
			let omdbMovie = { imdbID: 'IMDB_ID' } as OmdbMovie;
			let movieDomain = {} as Movie;
			let movieDomainSaved = {} as Movie;
			let userActivityFromDb = {} as UserActivity;
			let movieDtoResult = {} as MovieDto;

			let roleHelper_isPremium = jest.spyOn(roleHelper, 'isPremium').mockReturnValueOnce(true);
			let omdbProxy_findByTitle = jest.spyOn(omdbProxy, 'findByTitle').mockReturnValueOnce(Promise.resolve(omdbMovie));
			let movieDao_findByImdb = jest.spyOn(movieDao, 'findByImdb').mockReturnValueOnce(Promise.resolve(null));
			let movieMapper_toDomain = jest.spyOn(movieMapper, 'toDomain').mockReturnValueOnce(movieDomain);
			let movieDao_save = jest.spyOn(movieDao, 'save').mockReturnValueOnce(Promise.resolve(movieDomainSaved));
			let userActivityDao_findByUserId = jest.spyOn(userActivityDao, 'findByUserId').mockReturnValueOnce(Promise.resolve(userActivityFromDb));
			let userActivityMapper_addCreatedMovie = jest.spyOn(userActivityMapper, 'addCreatedMovie').mockReturnValue();
			let userActivityDao_update = jest.spyOn(userActivityDao, 'update').mockReturnValueOnce(Promise.resolve(userActivityFromDb));
			let movieMapper_toDto = jest.spyOn(movieMapper, 'toDto').mockReturnValueOnce(movieDtoResult);

			expect(await target.save(user, movie)).toBe(movieDtoResult);

			expect(roleHelper_isPremium).toBeCalledWith(user);
			expect(omdbProxy_findByTitle).toBeCalledWith('TITLE');
			expect(movieDao_findByImdb).toBeCalledWith('IMDB_ID');
			expect(movieMapper_toDomain).toBeCalledWith(omdbMovie, user);
			expect(movieDao_save).toBeCalledWith(movieDomain);
			expect(userActivityDao_findByUserId).toBeCalledWith(1111);
			expect(userActivityMapper_addCreatedMovie).toBeCalledWith(userActivityFromDb, movieDomainSaved);
			expect(userActivityDao_update).toBeCalledWith(userActivityFromDb);
			expect(movieMapper_toDto).toBeCalledWith(movieDomainSaved);
		});

		test('full flow for basic', async () => {
			let user = { userId: 1111 } as UserDto;
			let movie = { title: 'TITLE' } as CreateMovieRequest;
			let omdbMovie = { imdbID: 'IMDB_ID' } as OmdbMovie;
			let movieDomain = {} as Movie;
			let movieDomainSaved = {} as Movie;
			let userActivity = {} as UserActivity;
			let movieDtoResult = {} as MovieDto;

			let roleHelper_isPremium = jest.spyOn(roleHelper, 'isPremium').mockReturnValueOnce(false);
			let userActivityDao_findByUserId = jest.spyOn(userActivityDao, 'findByUserId').mockReturnValue(Promise.resolve(userActivity));
			let userActivityMapper_isUserPermittedToCreateMovie = jest.spyOn(userActivityMapper, 'isUserPermittedToCreateMovie').mockReturnValueOnce(true);
			let omdbProxy_findByTitle = jest.spyOn(omdbProxy, 'findByTitle').mockReturnValueOnce(Promise.resolve(omdbMovie));
			let movieDao_findByImdb = jest.spyOn(movieDao, 'findByImdb').mockReturnValueOnce(Promise.resolve(null));
			let movieMapper_toDomain = jest.spyOn(movieMapper, 'toDomain').mockReturnValueOnce(movieDomain);
			let movieDao_save = jest.spyOn(movieDao, 'save').mockReturnValueOnce(Promise.resolve(movieDomainSaved));
			let userActivityMapper_addCreatedMovie = jest.spyOn(userActivityMapper, 'addCreatedMovie').mockReturnValue();
			let userActivityDao_update = jest.spyOn(userActivityDao, 'update').mockReturnValueOnce(Promise.resolve(userActivity));
			let movieMapper_toDto = jest.spyOn(movieMapper, 'toDto').mockReturnValueOnce(movieDtoResult);

			expect(await target.save(user, movie)).toBe(movieDtoResult);

			expect(roleHelper_isPremium).toBeCalledWith(user);
			expect(userActivityMapper_isUserPermittedToCreateMovie).toBeCalledWith(userActivity);
			expect(omdbProxy_findByTitle).toBeCalledWith('TITLE');
			expect(movieDao_findByImdb).toBeCalledWith('IMDB_ID');
			expect(movieMapper_toDomain).toBeCalledWith(omdbMovie, user);
			expect(movieDao_save).toBeCalledWith(movieDomain);
			expect(userActivityDao_findByUserId).toBeCalledWith(1111);
			expect(userActivityMapper_addCreatedMovie).toBeCalledWith(userActivity, movieDomainSaved);
			expect(userActivityDao_update).toBeCalledWith(userActivity);
			expect(movieMapper_toDto).toBeCalledWith(movieDomainSaved);
		});
	});
});
