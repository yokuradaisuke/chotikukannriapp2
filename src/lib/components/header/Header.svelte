<script>
	import Gauge from '$lib/components/icons/Gauge.svelte';
	import Store from '$lib/components/icons/Store.svelte';
	import Calculator from '$lib/components/icons/Calculator.svelte';

	export let shopName = 'Simple Store';
</script>

<header class="bg-slate-700">
	<div class="container mx-auto flex items-center justify-between p-4 text-white md:px-0">
		<div>
			<a href="/" class="flex items-center text-2xl font-bold hover:opacity-80">
				<Store />
				<span class="ml-2">{shopName}</span>
			</a>
		</div>
		<div class="ml-auto flex items-center space-x-4">
			<a href="/dashboard" class="hover:opacity-80" aria-label="Dashboard">
				<Gauge />
			</a>
			<a href="/dashboard/checkout" class="hover:opacity-80" aria-label="Checkout">
				<Calculator />
			</a>
		</div>
	</div>
</header>
