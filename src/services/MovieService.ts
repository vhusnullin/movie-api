import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { MovieDao } from '../dao/MovieDao';
import { UserActivityDao } from '../dao/UserActivityDao';
import { AppException } from '../dto/AppException';
import { CreateMovieRequest, MovieDto } from '../dto/MovieDto';
import { UserDto } from '../dto/UserDto';
import { MovieMapper } from '../services/mapping/MovieMapper';
import { UserActivityMapper } from '../services/mapping/UserActivityMapper';
import { OmdbProxy } from '../services/omdb/OmdbProxy';
import { RoleHelper } from '../services/helpers/RoleHelper';


@Injectable()
export class MovieService {

	@Inject() roleHelper: RoleHelper;
	@Inject() movieDao: MovieDao;
	@Inject() userActivityDao: UserActivityDao;
	@Inject() movieMapper: MovieMapper;
	@Inject() userActivityMapper: UserActivityMapper;
	@Inject() omdbProxy: OmdbProxy;

	async save(currentUser: UserDto, item: CreateMovieRequest): Promise<MovieDto> {
		if (!this.roleHelper.isPremium(currentUser)) {
			let userActivity = await this.userActivityDao.findByUserId(currentUser.userId);
			let permitted = this.userActivityMapper.isUserPermittedToCreateMovie(userActivity);
			if (!permitted) {
				throw new ForbiddenException();
			}
		}

		let omdbMovie = await this.omdbProxy.findByTitle(item.title);
		if (!omdbMovie) {
			throw new AppException('Omdb data is not found');
		}

		let movieDomain = await this.movieDao.findByImdb(omdbMovie.imdbID);
		if (movieDomain) {
			throw new AppException('Movie already exists');
		}

		movieDomain = this.movieMapper.toDomain(omdbMovie, currentUser);
		movieDomain = await this.movieDao.save(movieDomain);
		let userActivity = await this.userActivityDao.findByUserId(currentUser.userId);
		this.userActivityMapper.addCreatedMovie(userActivity, movieDomain);
		await this.userActivityDao.update(userActivity);
		return this.movieMapper.toDto(movieDomain);
	}

	async findAll(currentUser: UserDto): Promise<MovieDto[]> {
		let domains = await this.movieDao.findByUser(currentUser.userId);
		return this.movieMapper.toDtoList(domains);
	}
}
