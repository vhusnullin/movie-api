import { ConfigFactory } from './ConfigFactory';


describe('ConfigFactory', () => {
	let target: ConfigFactory;

	beforeEach(() => {
		target = new ConfigFactory();
	});

	describe('createJwtConfig', () => {
		test('', async () => {
			expect(target.createJwtConfig()).not.toBeNull();
		});
	});


	describe('createDatabaseConfig', () => {
		test('', async () => {
			expect(target.createDatabaseConfig()).not.toBeNull();
		});
	});

	describe('createOmdbConfig', () => {
		test('', async () => {
			expect(target.createOmdbConfig()).not.toBeNull();
		});
	});
});
