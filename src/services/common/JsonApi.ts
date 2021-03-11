import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JsonApi {

	async get<T>(url: string): Promise<T> {
		let response = await axios.get(url);
		return response.data;
	}
}
