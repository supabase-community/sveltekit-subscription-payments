<script lang="ts">
	import LoadingDots from './LoadingDots.svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type $$restProps = HTMLButtonAttributes;

	export let variant: 'slim' | 'flat' = 'flat';
	export let active: boolean = false;
	export let width: number = 100;
	export let loading: boolean = false;
	export let disabled: boolean = false;
</script>

<button
	on:click
	{disabled}
	aria-pressed={active}
	data-variant={variant}
	style:width
	class:slim={variant === 'slim'}
	class:loading
	{...$$restProps}
>
	<slot />
	{#if loading}
		<i class="pl-2 m-0 flex">
			<LoadingDots />
		</i>
	{/if}
</button>

<style lang="postcss">
	button {
		@apply bg-white text-zinc-800 cursor-pointer inline-flex px-10 rounded-sm leading-6  transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center uppercase py-4 border border-transparent items-center;
	}

	button:hover {
		@apply bg-zinc-800 text-white border border-white;
	}

	button:focus {
		@apply outline-none ring-2 ring-pink-500 ring-opacity-50;
	}

	button:active {
		@apply bg-zinc-600;
	}

	button.loading {
		@apply bg-zinc-700 text-zinc-500 border-zinc-600 cursor-not-allowed;
	}

	button.slim {
		@apply py-2 transform-none normal-case;
	}

	button:disabled,
	button:disabled:hover {
		@apply text-zinc-400 border-zinc-600 bg-zinc-700 cursor-not-allowed;
		filter: grayscale(1);
		-webkit-transform: translateZ(0);
		-webkit-perspective: 1000;
		-webkit-backface-visibility: hidden;
	}
</style>
