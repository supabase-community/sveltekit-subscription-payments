import { getURL } from '$lib/helpers';
import { stripe } from '$lib/server/stripe';
import { createOrRetrieveCustomer } from '$lib/server/supabaseAdmin';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	async openStripePortal(event) {
		const { session } = await getSupabase(event);

		if (!session?.user) {
			throw redirect(302, '/signin');
		}

		const customer = await createOrRetrieveCustomer({
			uuid: session.user.id || '',
			email: session.user.email || ''
		});
		if (!customer)
			throw error(500, {
				message: 'Could not get customer'
			});

		const { url } = await stripe.billingPortal.sessions.create({
			customer,
			return_url: `${getURL()}/account`
		});

		throw redirect(302, url);
	}
} satisfies Actions;
