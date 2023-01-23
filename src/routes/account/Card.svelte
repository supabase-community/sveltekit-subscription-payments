<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div class="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
	<div class="px-5 py-4">
		<h3 class="text-2xl mb-1 font-medium">{title}</h3>
		<p class="text-zinc-300">{description}</p>
		<slot />
	</div>
	<div class="border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md">
		<slot name="footer" />
	</div>
</div>
