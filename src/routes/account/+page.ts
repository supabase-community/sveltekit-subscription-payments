import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { Subscription, UserDetails } from '../../../types/stripe';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		throw redirect(302, '/signin');
	}

	const { data: userDetails } = await supabaseClient.from('users').select('*').single();
	const { data: subscription } = await supabaseClient
		.from('subscriptions')
		.select('*, prices(*, products(*))')
		.in('status', ['trialing', 'active'])
		.single();

	return {
		userDetails: userDetails as unknown as UserDetails,
		subscription: subscription as Subscription
	};
}) satisfies PageLoad;
