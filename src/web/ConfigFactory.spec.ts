import { ConfigFactory } from './ConfigFactory';


describe('ConfigFactory', () => {
	let target: ConfigFactory;

	beforeEach(() => {
		target = new ConfigFactory();
	});

	describe('createJwtConfig', () => {
		test('', async () => {
			process.env.JWT_ISSUER = 'JWT_ISSUER';
			process.env.JWT_EXPIRESIN = '9999';
			process.env.JWT_SECRET = 'JWT_SECRET';

			let actual = target.createJwtConfig();
			expect(actual).not.toBeNull();
			expect(actual.issuer).toBe('JWT_ISSUER');
			expect(actual.expiresIn).toBe(9999);
			expect(actual.secret).toBe('JWT_SECRET');
		});
	});


	describe('createDatabaseConfig', () => {
		test('', async () => {
			process.env.DB_CONNECTION = 'DB_CONNECTION';

			let actual = target.createDatabaseConfig()
			expect(actual).not.toBeNull();
			expect(actual.connectionString).toBe('DB_CONNECTION');
		});
	});

	describe('createOmdbConfig', () => {
		test('', async () => {
			process.env.OMDB_APIKEY = 'OMDB_APIKEY';
			process.env.OMDB_URL = 'OMDB_URL';

			let actual = target.createOmdbConfig()
			expect(actual).not.toBeNull();
			expect(actual.apiKey).toBe('OMDB_APIKEY');
			expect(actual.url).toBe('OMDB_URL');
		});
	});
});
