<script lang="ts">
	import { onMount } from 'svelte';
	import ApexCharts from 'apexcharts';
	import type { ChartData } from '$lib/types/sale';

	export let title: string = '販売データ';
	export let salesData: ChartData[] = [];
	let ref: HTMLDivElement;
	let chart: ApexCharts;
	let options = createOptions(salesData);
	$: if (chart) {
		chart.updateOptions(createOptions(salesData));
	}

	function createOptions(salesData: ChartData[]) {
		const sortData = salesData.sort((a, b) => a.title.localeCompare(b.title));
		return {
			series: sortData.map((item) => item.totalPrice || 0),
			labels: sortData.map((item) => item.title),
			tooltip: {},
			chart: {
				type: 'donut'
			},
			legend: {
				position: 'bottom'
			},
			plotOptions: {
				pie: {
					donut: {
						size: '50%',
						labels: {
							show: true,
							total: {
								showAlways: true,
								show: true,
								label: '合計',
								formatter(w: any) {
									return `${w.globals.seriesTotals
										.reduce((accumulator: number, currentValue: number) => {
											return accumulator + currentValue;
										}, 0)
										.toLocaleString()}円`;
								}
							}
						}
					}
				}
			}
		};
	}

	onMount(() => {
		chart = new ApexCharts(ref, options);

		chart.render();

		return () => chart.destroy();
	});
</script>

<div class="grow">
	<p class="mb-4 text-center font-bold">{title}</p>
	<div bind:this={ref} id="donutsChart" class="grow" />
</div>
