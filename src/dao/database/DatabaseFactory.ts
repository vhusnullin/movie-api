import { Injectable } from '@nestjs/common';
import { Database } from './Database';
import { DatabaseConfig } from './DatabaseConfig';

@Injectable()
export class DatabaseFactory {

	database: Database;

	constructor(private readonly config: DatabaseConfig) {
	}

	getDatabase(): Database {
		if (!this.database) {
			this.database = new Database();
			this.database.init(this.config.connectionString);
		}

		return this.database;
	}
}
