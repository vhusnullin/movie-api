import { Module } from '@nestjs/common';
import { MovieController } from './controllers/MovieController';
import { AuthController } from './controllers/AuthController';
import { AppContext } from './controllers/helpers/AppContext';
import { SessionFactory } from './dao/database/SessionFactory';
import { MovieDao } from './dao/MovieDao';
import { UserDao } from './dao/UserDao';
import { UserActivityDao } from './dao/UserActivityDao';
import { DateFormat } from './services/common/DateFormat';
import { JsonApi } from './services/common/JsonApi';
import { MovieMapper } from './services/mapping/MovieMapper';
import { UserMapper } from './services/mapping/UserMapper';
import { UserActivityMapper } from './services/mapping/UserActivityMapper';
import { MovieService } from './services/MovieService';
import { UserService } from './services/UserService';
import { OmdbProxy } from './services/omdb/OmdbProxy';
import { JwtHelper, JwtConfig } from './services/common/JwtHelper';
import { RoleHelper } from './services/helpers/RoleHelper';
import { ConfigFactory } from './web/ConfigFactory';
import { DatabaseConfig } from './dao/database/DatabaseConfig';
import { OmdbConfig } from './services/omdb/OmdbConfig';


@Module({
	imports: [],
	controllers: [MovieController, AuthController],
	providers: [
		ConfigFactory,
		AppContext,
		MovieService, UserService,
		MovieDao, UserDao, UserActivityDao, SessionFactory,
		MovieMapper, UserMapper, UserActivityMapper,
		OmdbProxy, JsonApi, JwtHelper, DateFormat, RoleHelper,
		{
			provide: JwtConfig,
			useFactory: (configFactory: ConfigFactory) => configFactory.createJwtConfig(),
			inject: [ConfigFactory]
		},
		{
			provide: DatabaseConfig,
			useFactory: (configFactory: ConfigFactory) => configFactory.createDatabaseConfig(),
			inject: [ConfigFactory]
		},
		{
			provide: OmdbConfig,
			useFactory: (configFactory: ConfigFactory) => configFactory.createOmdbConfig(),
			inject: [ConfigFactory]
		}
	],
})
export class AppModule {}
