<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/components/icons/Logo.svelte';
	import { supabaseClient } from '$lib/db';

	$: user = $page.data.session?.user;
</script>

<nav class="sticky top-0 bg-black z-40 transition-all duration-150">
	<a href="#skip" class="sr-only focus:not-sr-only"> Skip to content </a>
	<div class="mx-auto max-w-6xl px-6">
		<div class="flex justify-between align-center flex-row py-4 md:py-6 relative">
			<div class="flex flex-1 items-center">
				<a
					href="/"
					class="cursor-pointer rounded-full transform duration-100 ease-in-out"
					aria-label="Logo"
				>
					<Logo />
				</a>
				<nav class="space-x-2 ml-6 hidden lg:block">
					<a href="/" class="link">Pricing</a>
					<a href="/account" class="link">Account</a>
				</nav>
			</div>

			<div class="flex flex-1 justify-end space-x-8">
				{#if user}
					<button
						class="link"
						on:click={async () => {
							await supabaseClient.auth.signOut();
						}}
					>
						Sign out
					</button>
				{:else}
					<a href="/signin" class="link">Sign in</a>
				{/if}
			</div>
		</div>
	</div>
</nav>

<style lang="postcss">
	.link {
		@apply inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-zinc-200 rounded-md p-1;
	}
	.link:hover {
		@apply text-zinc-100;
	}
	.link:focus {
		@apply outline-none text-zinc-100 ring-2 ring-pink-500 ring-opacity-50;
	}
</style>
