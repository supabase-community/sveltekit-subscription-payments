import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { ProductWithPrice, Subscription } from '../../types/stripe';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { setHeaders } = event;
	const { supabaseClient } = await getSupabase(event);

	const { data: products } = await supabaseClient
		.from('products')
		.select('*, prices(*)')
		.eq('active', true)
		.eq('prices.active', true)
		.order('metadata->index')
		.order('unit_amount', { foreignTable: 'prices' });

	const { data: subscription } = await supabaseClient
		.from('subscriptions')
		.select('*, prices(*, products(*))')
		.in('status', ['trialing', 'active'])
		.single();

	setHeaders({
		'cache-control': 'max-age=60'
	});

	return {
		products: (products as unknown as ProductWithPrice[]) ?? [],
		subscription: subscription as Subscription
	};
}) satisfies PageLoad;
