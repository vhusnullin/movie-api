import { Injectable } from '@nestjs/common';

@Injectable()
export class OmdbConfig {
	apiKey: string;
	url: string;
}
