<script lang="ts">
	import {
		convertTimestampToOffsetDate,
		getTomorrowFromISOString,
		getYesterdayFromISOString,
		downloadCsv
	} from '$lib/utils/chart';
	import Download from '$lib/components/icons/Download.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let data;

	let SalesChart: any;

	onMount(async () => {
		SalesChart = (await import('$lib/components/chart/SalesChart.svelte')).default;
	});

	function downloadHandler() {
		downloadCsv(data.data, $page.params.date || convertTimestampToOffsetDate(9, 'YYYY-MM-DD'));
	}
</script>

<svelte:head>
	<title>Dashboard - {$page.params.date || convertTimestampToOffsetDate(9, 'YYYY-MM-DD')}</title>
	<meta
		name="description"
		content="Dashboard - {$page.data.config.shopName || 'Simple Store Template'}"
	/>
</svelte:head>

<div class="container mx-auto min-h-[calc(100dvh-52px-72px)] px-4 md:px-0">
	<div class="mt-4 border-b-2 px-2 pb-4 md:flex md:items-center md:justify-between">
		<h1 class="text-center text-xl font-bold md:text-left md:text-2xl">
			{$page.params.date || convertTimestampToOffsetDate(9, 'YYYY-MM-DD')}{' '}
			の売上データ
		</h1>
		<ul class="mt-2 flex items-center justify-center gap-3 md:mt-0 md:justify-end">
			<li>
				<a
					href={`/dashboard/${getYesterdayFromISOString(
						$page.params.date || convertTimestampToOffsetDate(9, 'YYYY-MM-DD')
					)}`}
					class="hover:underline"
				>
					前日
				</a>
			</li>
			<li>
				<a
					href={`/dashboard/${convertTimestampToOffsetDate(9, 'YYYY-MM-DD')}`}
					class="hover:underline"
				>
					今日
				</a>
			</li>
			<li>
				<a
					href={`/dashboard/${getTomorrowFromISOString(
						$page.params.date || convertTimestampToOffsetDate(9, 'YYYY-MM-DD')
					)}`}
					class="hover:underline"
				>
					翌日
				</a>
			</li>
			<li>
				<a
					href={`/dashboard/${
						$page.params.date || convertTimestampToOffsetDate(9, 'YYYY-MM-DD')
					}/history`}
					class="hover:underline"
				>
					販売履歴
				</a>
			</li>
		</ul>
	</div>
	<div class="flex flex-col gap-6 py-6 md:grid md:grid-cols-2 md:py-12">
		<div class="order-1 flex h-full w-full justify-center md:order-none">
			<svelte:component this={SalesChart} title="本日の販売データ" salesData={data.itemReport} />
		</div>
		<div class="order-3 mt-4 flex h-full w-full justify-center md:order-none md:mt-0">
			<svelte:component
				this={SalesChart}
				title="前日の販売データ"
				salesData={data.prevItemReport}
			/>
		</div>
		<div class="order-2 mt-8 md:order-none md:col-span-2 md:mt-0">
			<div class="mb-2 flex items-center p-2">
				<h2 class="text-xl font-bold">販売データ</h2>
				<div class="ml-2">
					<button type="button" on:click={downloadHandler} aria-label="CSV Download">
						<Download width={32} height={32} />
					</button>
				</div>
			</div>
			<div class="relative overflow-x-auto rounded">
				<table class="w-full text-left">
					<thead class="bg-gray-100 text-xs md:text-sm">
						<tr>
							<th class="p-2 md:p-3" />
							<th class="p-2 md:p-3">商品</th>
							<th class="p-2 md:p-3">単価</th>
							<th class="p-2 md:p-3">売上</th>
							<th class="p-2 md:p-3">販売数</th>
						</tr>
					</thead>
					<tbody class="text-sm md:text-base">
						{#each data.itemReport.sort((a, b) => b.totalPrice - a.totalPrice) as item, index}
							<tr class={`border-b ${index % 2 && 'bg-gray-50'}`}>
								<th scope="row" class="w-1/12 p-2 md:p-3">
									{(index + 1).toString()}
								</th>
								<td class="w-5/12 p-2 md:p-3">{item.title}</td>
								<td class="w-2/12 p-2 md:p-3">
									{item.price.toLocaleString()}円
								</td>
								<td class="w-2/12 p-2 md:p-3">
									{item.totalPrice.toLocaleString()}円
								</td>
								<td class="w-2/12 p-2 md:p-3">
									{item.totalCount.toString()}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
