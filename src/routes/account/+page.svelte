<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import LoadingDots from '$lib/components/LoadingDots.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import Card from './Card.svelte';

	export let data: PageData;

	$: ({ subscription, userDetails } = data);

	let loading = false;

	const withLoading: SubmitFunction = () => {
		loading = true;
		return ({ update }) => {
			update().then(() => {
				loading = false;
			});
		};
	};

	$: subscriptionPrice =
		subscription &&
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: subscription?.prices?.currency,
			minimumFractionDigits: 0
		}).format((subscription?.prices?.unit_amount || 0) / 100);
</script>

<section class="bg-black mb-32">
	<div class="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
		<div class="sm:flex sm:flex-col sm:align-center">
			<h1 class="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">Account</h1>
			<p class="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
				We partnered with Stripe for a simplified billing.
			</p>
		</div>
	</div>
	<div class="p-4">
		<Card
			title="Your Plan"
			description={subscription
				? `You are currently on the ${subscription?.prices?.products?.name} plan.`
				: ''}
		>
			<div class="text-xl mt-8 mb-4 font-semibold">
				{#if loading}
					<div class="h-12 mb-6">
						<LoadingDots />
					</div>
				{:else if subscription}
					{subscriptionPrice}/{subscription?.prices?.interval}
				{:else}
					<a href="/">Choose your plan</a>
				{/if}
			</div>

			<div
				slot="footer"
				class="flex items-start justify-between flex-col sm:flex-row sm:items-center"
			>
				<p class="pb-4 sm:pb-0">Manage your subscription on Stripe.</p>

				<form action="?/openStripePortal" method="post" use:enhance={withLoading}>
					<Button type="submit" variant="slim" {loading} disabled={loading || !subscription}>
						Open customer portal
					</Button>
				</form>
			</div>
		</Card>
		<Card
			title="Your Name"
			description="Please enter your full name, or a display name you are comfortable with."
		>
			<div class="text-xl mt-8 mb-4 font-semibold">
				{#if userDetails}
					{userDetails.full_name ??
						(userDetails.first_name && userDetails.last_name
							? `${userDetails.first_name} ${userDetails.last_name}`
							: '')}
				{:else}
					<div class="h-8 mb-6">
						<LoadingDots />
					</div>
				{/if}
			</div>

			<p slot="footer">Please use 64 characters at maximum.</p>
		</Card>
		<Card title="Your Email" description="Please enter the email address you want to use to login.">
			<p class="text-xl mt-8 mb-4 font-semibold">
				{data.session?.user?.email ?? ''}
			</p>
			<p slot="footer">We will email you to verify the change.</p>
		</Card>
	</div>
</section>
