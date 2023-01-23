<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import Footer from './Footer.svelte';
	import Navbar from './Navbar.svelte';

	export let data: LayoutData;

	onMount(() => {
		document.body.classList.remove('loading');

		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="robots" content="follow, index" />
	<link href="/favicon.ico" rel="shortcut icon" />
	<meta content={data.meta.description} name="description" />
	<meta
		property="og:url"
		content={`https://subscription-starter.vercel.app${$page.url.pathname}`}
	/>
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:image" content={data.meta.cardImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@vercel" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:image" content={data.meta.cardImage} />
</svelte:head>

<div class="bg-black min-h-screen flex flex-col">
	<Navbar />
	<main id="#skip" class="flex-1">
		<slot />
	</main>
	<Footer />
</div>
