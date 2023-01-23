import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const { session } = await getSupabase(event);

	return {
		session,
		meta: {
			title: 'SvelteKit Subscription Starter',
			description: 'Brought to you by Stripe and Supabase.',
			cardImage: '/og.png'
		}
	};
}) satisfies LayoutLoad;
