import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfig {
	connectionString: string;
}
