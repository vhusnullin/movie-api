import { Controller, Body, Put, UseGuards, Req, Inject, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { MovieService } from '../services/MovieService';
import { CreateMovieRequest, MovieDto } from '../dto/MovieDto';
import { AuthGuard } from '../web/AuthGuard';
import { AppContext } from './helpers/AppContext';


@UseGuards(AuthGuard)
@Controller('movies')
export class MovieController {
	
	@Inject() appContext: AppContext;
	@Inject() movieService: MovieService;

	@Put()
	@ApiResponse({ status: 200, type: MovieDto })
	async save(@Body() movie: CreateMovieRequest, @Req() req: Request): Promise<MovieDto> {
		let currentUser = this.appContext.getCurrentUser(req);
		return await this.movieService.save(currentUser, movie);
	}

	@Get()
	@ApiResponse({ status: 200, type: MovieDto, isArray: true })
	async get(@Req() req: Request): Promise<MovieDto[]> {
		let currentUser = this.appContext.getCurrentUser(req);
		return await this.movieService.findAll(currentUser);
	}
}
