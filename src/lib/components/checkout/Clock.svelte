<script lang="ts">
	import { onMount } from 'svelte';

	let clockState = '...';

	onMount(() => {
		const clock = setInterval(() => {
			clockState = new Date().toLocaleString();
		}, 1000);
		return () => clearInterval(clock);
	});
</script>

<div class="pt-2 text-right text-sm">{clockState}</div>
