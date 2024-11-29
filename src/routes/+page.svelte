<script>
	import Gauge from '$lib/components/icons/Gauge.svelte';
	import Calculator from '$lib/components/icons/Calculator.svelte';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.data.config.shopName || 'Simple Store Template'}</title>
	<meta
		name="description"
		content={`Welcome to ${$page.data.config.shopName || 'Simple Store Template'}`}
	/>
</svelte:head>

<div class="min-h-[calc(100dvh-52px-72px)]">
	<div class="grid gap-10 p-10 md:grid-cols-2">
		<div>
			<a
				href="/dashboard"
				class="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-10 shadow hover:bg-gray-100"
			>
				<div>
					<Gauge width={80} height={80} />
				</div>
				<h5 class="text-2xl font-bold tracking-tight text-gray-800">Dashboard</h5>
			</a>
		</div>
		<div>
			<a
				href="/dashboard/checkout"
				class="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-10 shadow hover:bg-gray-100"
			>
				<div>
					<Calculator width={80} height={80} />
				</div>
				<h5 class="text-2xl font-bold tracking-tight text-gray-800">Checkout</h5>
			</a>
		</div>
	</div>
</div>
