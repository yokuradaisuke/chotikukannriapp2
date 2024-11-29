<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Clock from '$lib/components/checkout/Clock.svelte';
	import Loading from '$lib/components/icons/Loading.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import type { ItemObject } from '$lib/types/sale.js';

	export let data;
	export let form;
	let loading = false;

	let cart = {};

	type ValueObject = {
		[key: string]: number;
	};

	function sumValues(obj: ValueObject): number {
		return Object.values(obj).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
	}

	function handleChange(e: Event, item: ItemObject) {
		const target = e.target as HTMLInputElement;

		cart = {
			...cart,
			[item.id]: item.price * Number(target.value)
		};
	}
</script>

<svelte:head>
	<title>Store Checkout</title>
	<meta
		name="description"
		content="Store Checkout - {$page.data.config.shopName || 'Simple Store Template'}"
	/>
</svelte:head>

<div class="min-h-[calc(100dvh-52px-72px)] bg-white">
	<div class="container mx-auto px-4 md:px-0">
		<Clock />
		<form
			use:enhance={() => {
				loading = true;
				return async ({ update, result }) => {
					await update();
					loading = false;
					if (result.type === 'error') {
						toast.push('データの追加に失敗しました', {
							theme: {
								'--toastBackground': '#F87171',
								'--toastProgressBackground': '#EF4444'
							}
						});
					} else {
						toast.push('データを追加しました', {
							theme: {
								'--toastBackground': '#60A5FA',
								'--toastProgressBackground': '#3B82F6'
							}
						});
					}
				};
			}}
			method="POST"
			action="?/add"
		>
			<div class="mb-8 mt-2 w-full rounded-lg border p-4 shadow-sm">
				<div class="space-y-2 text-center">
					<div class="text-sm">合計金額</div>
					<div class="text-4xl font-bold">
						{sumValues(cart).toLocaleString()} 円
					</div>
					<div class="text-xs text-gray-500">消費税込みの価格</div>
				</div>
			</div>
			<div class="relative overflow-x-auto rounded">
				<table class="w-full text-left">
					<thead class="bg-gray-100 text-xs md:text-sm">
						<tr>
							<th class="p-2 md:p-3" />
							<th class="p-2 md:p-3">商品名</th>
							<th class="p-2 md:p-3">価格</th>
							<th class="p-2 md:p-3">個数</th>
						</tr>
					</thead>
					<tbody>
						{#each data.itemList as item, index}
							<tr class={`border-b ${index % 2 && 'bg-gray-50'}`}>
								<th scope="row" class="w-1/12 p-2 md:p-3">
									{(index + 1).toString()}
								</th>
								<td class="w-6/12 p-2 md:p-3">{item.title}</td>
								<td class="w-3/12 p-2 md:p-3">
									{item.price.toLocaleString()}
								</td>
								<td class="w-2/12 p-2 md:p-3">
									<input
										type="number"
										class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 focus:border-blue-500 focus:ring-blue-500"
										inputMode="numeric"
										name={item.id}
										max={99}
										aria-label={`${item.title}の個数`}
										on:change={(event) => handleChange(event, item)}
									/>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			{#if form?.success}
				<div class="my-8">
					<button
						type="button"
						class="w-full rounded-lg bg-sky-500 px-5 py-3 text-xl font-bold text-white hover:cursor-pointer hover:bg-sky-600 focus:ring-4 focus:ring-blue-300"
						on:click={() => {
							window.location.reload();
						}}
					>
						新規会計をする
					</button>
				</div>
			{:else}
				<div class="my-8 grid grid-cols-3 gap-4 md:gap-8">
					<button
						type="submit"
						class="col-span-2 flex w-full items-center justify-center rounded-lg bg-orange-500 p-3 font-bold text-white hover:cursor-pointer hover:bg-orange-600 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 md:px-5 md:text-xl"
						disabled={loading || !sumValues(cart)}
					>
						{#if loading}
							<Loading />
						{/if}
						会計
					</button>
					<button
						type="reset"
						class="w-full rounded-lg bg-sky-700 p-3 font-bold text-white hover:cursor-pointer hover:bg-sky-800 focus:ring-4 focus:ring-blue-300 md:px-5 md:text-xl"
						on:click={() => {
							cart = {};
							toast.push('リセットしました', {
								theme: {
									'--toastColor': 'mintcream',
									'--toastBackground': 'rgba(72,187,120,0.9)',
									'--toastBarBackground': '#2F855A'
								}
							});
						}}
					>
						リセット
					</button>
				</div>
			{/if}
			<input type="hidden" value={sumValues(cart)} name="totalPrice" />
		</form>
	</div>
</div>
