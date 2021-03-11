import { Injectable } from '@nestjs/common';
import { OmdbConfig } from '../services/omdb/OmdbConfig';
import { DatabaseConfig } from '../dao/database/DatabaseConfig';
import { JwtConfig } from '../services/common/JwtHelper';

@Injectable()
export class ConfigFactory {

	createJwtConfig(): JwtConfig {
		return {
			issuer: process.env.JWT_ISSUER,
			expiresIn: parseInt(process.env.JWT_EXPIRESIN, 10) || 1800,
			secret: process.env.JWT_SECRET
		};
	}

	createDatabaseConfig(): DatabaseConfig {
		return {
			connectionString: process.env.DB_CONNECTION
		};
	}

	createOmdbConfig(): OmdbConfig {
		return {
			apiKey: process.env.OMDB_APIKEY,
			url: process.env.OMDB_URL,
		};
	}
}
