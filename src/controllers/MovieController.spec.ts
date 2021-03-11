import { Request } from 'express';
import { MovieDto } from '../dto/MovieDto';
import { UserDto } from '../dto/UserDto';
import { MovieService } from '../services/MovieService';
import { AppContext } from './helpers/AppContext';
import { MovieController } from './MovieController';


describe('MovieController', () => {
	let target: MovieController;
	let movieService: MovieService;
	let appContext: AppContext;

	beforeEach(() => {
		movieService = new MovieService();
		appContext = new AppContext();
		target = new MovieController();
		target.appContext = appContext;
		target.movieService = movieService;
	});

	describe('save', () => {
		test('', async () => {
			let input = {} as MovieDto;
			let req = {} as Request;
			let currentUser = {} as UserDto;
			let createdMovie = {} as MovieDto;
			let mockGetCurrentUser = jest.spyOn(appContext, 'getCurrentUser').mockReturnValueOnce(currentUser);
			let mockSave = jest.spyOn(movieService, 'save').mockReturnValueOnce(Promise.resolve(createdMovie));
			expect(await target.save(input, req)).toBe(createdMovie);
			expect(mockGetCurrentUser).toBeCalledWith(req);
			expect(mockSave).toBeCalledWith(input, currentUser);
		});
	});
});
