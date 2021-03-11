import { Database } from './database/Database';
import { SessionFactory } from './database/SessionFactory';
import { UserActivity } from './domain/UserActivity';
import { UserActivityDao } from './UserActivityDao';


describe('UserActivityDao', () => {
	let target: UserActivityDao;
	let sessionFactory: SessionFactory;
	let session: Database;

	beforeEach(() => {
		sessionFactory = new SessionFactory(null);
		target = new UserActivityDao(sessionFactory);
		session = new Database();
	});

	describe('findByUserId', () => {
		test('', async () => {
			let userId = 1111;
			let foundActivity = {} as UserActivity;
			let sessionFactory_getSession = jest.spyOn(sessionFactory, 'getSession').mockReturnValueOnce(session);
			let session_findOne = jest.spyOn(session.userActivity, 'findOne').mockReturnValueOnce(Promise.resolve(foundActivity) as any);
			expect(await target.findByUserId(userId)).toBe(foundActivity);
			expect(sessionFactory_getSession).toBeCalled();
			expect(session_findOne).toBeCalledWith({userId: 1111});
		});
	});

	describe('update', () => {
		test('', async () => {
			let item = { _id: 'ACTIVITY_ID' } as UserActivity;
			let updatedActivity = {} as UserActivity;
			let sessionFactory_getSession = jest.spyOn(sessionFactory, 'getSession').mockReturnValueOnce(session);
			let session_findOneAndUpdate = jest.spyOn(session.userActivity, 'findOneAndUpdate').mockReturnValueOnce(Promise.resolve(updatedActivity) as any);
			expect(await target.update(item)).toBe(updatedActivity);
			expect(sessionFactory_getSession).toBeCalled();
			expect(session_findOneAndUpdate).toBeCalledWith({_id: 'ACTIVITY_ID' }, item);
		});
	});
});
