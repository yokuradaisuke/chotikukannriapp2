import {
	calculateItemStats,
	convertTimestampToOffsetDate,
	getYesterdayFromISOString
} from '$lib/utils/chart';
import { MICROCMS_API_KEY, MICROCMS_SERVICE_DOMAIN } from '$env/static/private';
import { createClient } from 'microcms-js-sdk';
import type { ItemObject, SaleObject } from '$lib/types/sale';
import { getFormattedFilterTimeRange } from 'microcms-utils';

export async function load({ params }: { params: { date?: string } }) {
	const date = params.date || convertTimestampToOffsetDate(9, 'YYYY-MM-DD');

	try {
		const client = createClient({
			serviceDomain: MICROCMS_SERVICE_DOMAIN,
			apiKey: MICROCMS_API_KEY
		});

		const getData = client.getList<SaleObject>({
			endpoint: 'sale',
			queries: {
				limit: 100,
				filters: getFormattedFilterTimeRange('createdAt', date, 0)
			}
		});

		const getPrevData = client.getList<SaleObject>({
			endpoint: 'sale',
			queries: {
				limit: 100,
				filters: getFormattedFilterTimeRange('createdAt', getYesterdayFromISOString(date), 9)
			}
		});

		const getItem = client.getList<ItemObject>({
			endpoint: 'items',
			queries: {
				orders: '-price'
			}
		});

		const [data, prevData, item] = await Promise.all([getData, getPrevData, getItem]);

		const itemReport = item.contents.map((item) => {
			const calc = calculateItemStats(data, item.title);
			return {
				title: item.title,
				price: item.price,
				...calc
			};
		});

		const prevItemReport = item.contents.map((item) => {
			const calc = calculateItemStats(prevData, item.title);
			return {
				title: item.title,
				price: item.price,
				...calc
			};
		});

		return {
			data,
			prevData,
			itemReport: itemReport,
			prevItemReport: prevItemReport,
			itemList: item.contents
		};
	} catch (error) {
		console.error(error);
		return {
			data: [],
			prevData: [],
			itemReport: [],
			prevItemReport: [],
			itemList: []
		};
	}
}
