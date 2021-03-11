import axios, { AxiosResponse } from 'axios';
import { JsonApi } from './JsonApi';


describe('JsonApi', () => {
	let target: JsonApi;

	beforeEach(() => {
		target = new JsonApi();
	});

	describe('get', () => {
		test('', async () => {
			let url = 'URL';
			let response = { data: 'DATA' } as AxiosResponse;
			let mockGet = jest.spyOn(axios, 'get').mockReturnValueOnce(Promise.resolve(response));
			expect(await target.get(url)).toBe('DATA');
			expect(mockGet).toBeCalledWith('URL');
		});
	});
});
