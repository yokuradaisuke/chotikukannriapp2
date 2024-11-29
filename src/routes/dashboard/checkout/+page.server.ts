import type { Actions } from './$types';
import { MICROCMS_API_KEY, MICROCMS_SERVICE_DOMAIN } from '$env/static/private';
import { createClient } from 'microcms-js-sdk';
type OriginalObject = {
	[key: string]: FormDataEntryValue;
};

type SaleItem = {
	fieldId: string;
	item: string;
	number: number;
};

type TransformedObject = {
	content: {
		saleItems: SaleItem[];
		totalPrice: number;
	};
};

function transformData(obj: OriginalObject): TransformedObject {
	const transformedSaleItems: SaleItem[] = Object.entries(obj)
		.filter(([key]) => key !== 'totalPrice')
		.map(([key, value]) => ({
			fieldId: 'items',
			item: key,
			number: Number(value)
		}))
		.filter((item) => !!(item.number && !Number.isNaN(item.number))); // valueが0のデータを削除

	return {
		content: {
			saleItems: transformedSaleItems,
			totalPrice: Number(obj.totalPrice)
		}
	};
}

export const actions = {
	add: async ({ request }) => {
		try {
			const formData = await request.formData();
			const data = Object.fromEntries(formData.entries());

			const client = createClient({
				serviceDomain: MICROCMS_SERVICE_DOMAIN,
				apiKey: MICROCMS_API_KEY
			});

			const response = await client.create({
				endpoint: 'sale',
				...transformData(data)
			});

			return {
				success: Boolean(response.id),
				date: new Date().toISOString()
			};
		} catch (error) {
			console.error(error);
			return {
				success: false,
				date: new Date().toISOString()
			};
		}
	}
} satisfies Actions;
