import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {

	@ApiProperty() id?: string;
	@ApiProperty() title?: string;
	@ApiProperty() released?: string;
	@ApiProperty() genre?: string;
	@ApiProperty() director?: string;
}

export class CreateMovieRequest {
	@ApiProperty() title?: string;
}
