import { DateFormat } from './DateFormat';


describe('DateFormat', () => {
	let target: DateFormat;

	beforeEach(() => {
		target = new DateFormat();
	});

	describe('parseOmdb', () => {
		test('with null', async () => {
			expect(target.parseOmdb(null)).toBe(null);
		});

		test('with valid date', async () => {
			let date = new Date(2010, 6, 25, 0, 0, 0, 0);
			expect(target.parseOmdb('25 Jul 2010')).toStrictEqual(date);
		});

		test('with invalid date', async () => {
			expect(target.parseOmdb('345 Jan 01')).toBe(null);
		});
	});

	describe('toDto', () => {
		test('with null', async () => {
			expect(target.toDto(null)).toBe('*');
		});

		test('with valid date', async () => {
			let date = new Date(2010, 6, 25, 0, 0, 0, 0);
			expect(target.toDto(date)).toBe('2010-07-25');
		});
	});
});
