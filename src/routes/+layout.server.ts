import { MICROCMS_API_KEY, MICROCMS_SERVICE_DOMAIN } from '$env/static/private';
import type { ConfigObject } from '$lib/types/config';
import { createClient } from 'microcms-js-sdk';

export async function load() {
	try {
		const client = createClient({
			serviceDomain: MICROCMS_SERVICE_DOMAIN,
			apiKey: MICROCMS_API_KEY
		});

		const response = await client.getObject<ConfigObject>({
			endpoint: 'config'
		});

		const config = {
			shopName: response.shopName
		};

		return {
			config,
			serverDate: new Date().toISOString()
		};
	} catch (error) {
		console.error(error);
		return { config: undefined, serverDate: undefined };
	}
}
