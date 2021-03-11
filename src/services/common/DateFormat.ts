import { Injectable } from '@nestjs/common';
import * as moment from 'moment';


@Injectable()
export class DateFormat {
	parseOmdb(omdbDate: string): Date {
		let value = moment(omdbDate, 'D MMM YYYY');
		if (!value.isValid()) {
			return null;
		}

		return value.toDate();
	}

	toDto(value: Date): string {
		if (!value) {
			return '*';
		}

		return moment(value).format('YYYY-MM-DD');
	}
}
