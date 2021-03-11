import { Database } from './database/Database';
import { SessionFactory } from './database/SessionFactory';
import { Movie } from './domain/Movie';
import { MovieDao } from './MovieDao';


describe('MovieDao', () => {
	let target: MovieDao;
	let sessionFactory: SessionFactory;
	let session: Database;

	beforeEach(() => {
		sessionFactory = new SessionFactory(null);
		target = new MovieDao(sessionFactory);
		session = new Database();
	});

	describe('save', () => {
		test('', async () => {
			let item = {} as Movie;
			let createdMovie = {} as Movie;
			let sessionFactory_getSession = jest.spyOn(sessionFactory, 'getSession').mockReturnValueOnce(session);
			let session_create = jest.spyOn(session.movie, 'create').mockReturnValueOnce(Promise.resolve(createdMovie) as any);
			expect(await target.save(item)).toBe(createdMovie);
			expect(sessionFactory_getSession).toBeCalled();
			expect(session_create).toBeCalledWith(item);
		});
	});

	describe('findByImdb', () => {
		test('', async () => {
			let imdbId = 'IMDB_ID';
			let foundMovie = {} as Movie;
			let sessionFactory_getSession = jest.spyOn(sessionFactory, 'getSession').mockReturnValueOnce(session);
			let session_findOne = jest.spyOn(session.movie, 'findOne').mockReturnValueOnce(Promise.resolve(foundMovie) as any);
			expect(await target.findByImdb(imdbId)).toBe(foundMovie);
			expect(sessionFactory_getSession).toBeCalled();
			expect(session_findOne).toBeCalledWith({imdbId:'IMDB_ID'});
		});
	});

	describe('findByUser', () => {
		test('', async () => {
			let userID = 2222;
			let foundMovies = [] as Movie[];
			let sessionFactory_getSession = jest.spyOn(sessionFactory, 'getSession').mockReturnValueOnce(session);
			let session_find = jest.spyOn(session.movie, 'find').mockReturnValueOnce(Promise.resolve(foundMovies) as any);
			expect(await target.findByUser(userID)).toBe(foundMovies);
			expect(sessionFactory_getSession).toBeCalled();
			expect(session_find).toBeCalledWith({createdBy: 2222});
		});
	});
});
