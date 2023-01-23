<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { getValid } from '$lib/helpers';

	$: authType = getValid($page.url.searchParams.get('type'), [
		'password',
		'signup',
		'magiclink'
	] as const);

	let email = '';
	let password = '';

	let message = '';
	let isError = false;

	async function handleSubmit() {
		message = '';
		if (authType === 'password') {
			const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
			isError = !!error;
			message = isError ? 'Something went wrong' : 'Successfully signed in';
		} else if (authType === 'signup') {
			const { error } = await supabaseClient.auth.signUp({ email, password });
			isError = !!error;
			message = isError ? 'Something went wrong' : 'Successfully signed up';
		} else if (authType === 'magiclink') {
			const { error } = await supabaseClient.auth.signInWithOtp({ email });
			isError = !!error;
			message = isError ? 'Something went wrong' : 'Take a look at your inbox';
		}
	}
</script>

<div class="height-screen-helper flex flex-col justify-center h-full">
	<form
		method="post"
		on:submit|preventDefault={handleSubmit}
		class="flex flex-col gap-4 w-80 max-w-lg p-3 mx-auto"
	>
		{#if message}
			<p class="{isError ? 'text-red-700' : 'text-green-700'} font-semibold text-lg text-center">
				{message}
			</p>
		{/if}

		<label class="flex flex-col gap-2">
			<span class="text-neutral-400 text-sm">Email address</span>
			<input
				type="text"
				bind:value={email}
				placeholder="Your email address"
				class="bg-neutral-700 rounded px-3 py-2 border border-neutral-500"
			/>
		</label>

		{#if authType !== 'magiclink'}
			<label class="flex flex-col gap-2">
				<span class="text-neutral-400 text-sm">Your Password</span>
				<input
					type="password"
					bind:value={password}
					placeholder="Your password"
					class="bg-neutral-700 rounded px-3 py-2 border border-neutral-500"
				/>
			</label>
		{/if}

		<button
			class="bg-neutral-500 font-semibold px-3 py-2 rounded hover:bg-slate-500 focus:ring"
			type="submit"
		>
			{authType === 'password' ? 'Sign in' : authType === 'signup' ? 'Sign up' : 'Send Magic Link'}
		</button>

		<div class="flex flex-col gap-2 mt-2 text-sm ">
			{#if authType !== 'password'}
				<a
					class="text-neutral-400 hover:text-neutral-300 transition-colors underline"
					href="?type=password"
					>Already have an account? Sign in
				</a>
			{:else}
				<a
					class="text-neutral-400 hover:text-neutral-300 transition-colors underline"
					href="?type=magiclink"
					>Send a magic link email
				</a>
				<a
					class="text-neutral-400 hover:text-neutral-300 transition-colors underline"
					href="?type=signup"
					>Don't have an account? Sign up
				</a>
			{/if}
		</div>
	</form>
</div>
