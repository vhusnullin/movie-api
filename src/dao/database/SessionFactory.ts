import { Injectable } from '@nestjs/common';
import { Database } from './Database';
import { DatabaseConfig } from './DatabaseConfig';

@Injectable()
export class SessionFactory {

	database: Database;

	constructor(private readonly config: DatabaseConfig) {
	}

	getSession(): Database {
		if (!this.database) {
			this.database = new Database();
			this.database.init(this.config.connectionString);
		}

		return this.database;
	}
}
