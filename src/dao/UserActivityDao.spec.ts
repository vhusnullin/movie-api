import { Database } from './database/Database';
import { DatabaseFactory } from './database/DatabaseFactory';
import { UserActivity } from './domain/UserActivity';
import { UserActivityDao } from './UserActivityDao';


describe('UserActivityDao', () => {
	let target: UserActivityDao;
	let databaseFactory: DatabaseFactory;
	let database: Database;

	beforeEach(() => {
		databaseFactory = new DatabaseFactory(null);
		target = new UserActivityDao(databaseFactory);
		database = new Database();
	});

	describe('findByUserId', () => {
		test('', async () => {
			let userId = 1111;
			let foundActivity = {} as UserActivity;
			let databaseFactory_getDatabase = jest.spyOn(databaseFactory, 'getDatabase').mockReturnValueOnce(database);
			let database_findOne = jest.spyOn(database.userActivity, 'findOne').mockReturnValueOnce(Promise.resolve(foundActivity) as any);
			expect(await target.findByUserId(userId)).toBe(foundActivity);
			expect(databaseFactory_getDatabase).toBeCalled();
			expect(database_findOne).toBeCalledWith({userId: 1111});
		});
	});

	describe('update', () => {
		test('', async () => {
			let item = { _id: 'ACTIVITY_ID' } as UserActivity;
			let updatedActivity = {} as UserActivity;
			let databaseFactory_getDatabase = jest.spyOn(databaseFactory, 'getDatabase').mockReturnValueOnce(database);
			let database_findOneAndUpdate = jest.spyOn(database.userActivity, 'findOneAndUpdate').mockReturnValueOnce(Promise.resolve(updatedActivity) as any);
			expect(await target.update(item)).toBe(updatedActivity);
			expect(databaseFactory_getDatabase).toBeCalled();
			expect(database_findOneAndUpdate).toBeCalledWith({_id: 'ACTIVITY_ID' }, item);
		});
	});
});
