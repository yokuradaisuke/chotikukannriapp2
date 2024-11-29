<script lang="ts">
	export let serverTime = new Date().toLocaleString();
</script>

<footer class="bg-slate-800 py-4">
	<div class="container mx-auto text-center text-sm text-white opacity-50">
		<span>rendered: {serverTime}</span>
	</div>
</footer>
