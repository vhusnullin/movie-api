import { Database } from './database/Database';
import { DatabaseFactory } from './database/DatabaseFactory';
import { Movie } from './domain/Movie';
import { MovieDao } from './MovieDao';


describe('MovieDao', () => {
	let target: MovieDao;
	let databaseFactory: DatabaseFactory;
	let database: Database;

	beforeEach(() => {
		databaseFactory = new DatabaseFactory(null);
		target = new MovieDao(databaseFactory);
		database = new Database();
	});

	describe('save', () => {
		test('', async () => {
			let item = {} as Movie;
			let createdMovie = {} as Movie;
			let databaseFactory_getDatabase = jest.spyOn(databaseFactory, 'getDatabase').mockReturnValueOnce(database);
			let database_create = jest.spyOn(database.movie, 'create').mockReturnValueOnce(Promise.resolve(createdMovie) as any);
			expect(await target.save(item)).toBe(createdMovie);
			expect(databaseFactory_getDatabase).toBeCalled();
			expect(database_create).toBeCalledWith(item);
		});
	});

	describe('findByImdb', () => {
		test('', async () => {
			let imdbId = 'IMDB_ID';
			let foundMovie = {} as Movie;
			let databaseFactory_getDatabase = jest.spyOn(databaseFactory, 'getDatabase').mockReturnValueOnce(database);
			let database_findOne = jest.spyOn(database.movie, 'findOne').mockReturnValueOnce(Promise.resolve(foundMovie) as any);
			expect(await target.findByImdb(imdbId)).toBe(foundMovie);
			expect(databaseFactory_getDatabase).toBeCalled();
			expect(database_findOne).toBeCalledWith({imdbId:'IMDB_ID'});
		});
	});

	describe('findByUser', () => {
		test('', async () => {
			let userID = 2222;
			let foundMovies = [] as Movie[];
			let databaseFactory_getDatabase = jest.spyOn(databaseFactory, 'getDatabase').mockReturnValueOnce(database);
			let database_find = jest.spyOn(database.movie, 'find').mockReturnValueOnce(Promise.resolve(foundMovies) as any);
			expect(await target.findByUser(userID)).toBe(foundMovies);
			expect(databaseFactory_getDatabase).toBeCalled();
			expect(database_find).toBeCalledWith({createdBy: 2222});
		});
	});
});
