<script lang="ts">
	import Footer from '$lib/components/footer/Footer.svelte';
	import '../app.postcss';
	import Header from '$lib/components/header/Header.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	export let data;
</script>

<div class="app">
	<Header shopName={data.config?.shopName} />

	<main class="container mx-auto">
		<slot />
	</main>

	<Footer serverTime={data.serverDate} />
	<SvelteToast options={{ reversed: true, intro: { y: -92 } }} />
</div>

<style>
	:root {
		--toastContainerTop: 2rem;
		--toastContainerRight: auto;
		--toastContainerBottom: auto;
		--toastContainerLeft: calc(50vw - 8rem);
	}
</style>
