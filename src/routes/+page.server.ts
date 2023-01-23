import { getURL } from '$lib/helpers';
import { stripe } from '$lib/server/stripe';
import { createOrRetrieveCustomer } from '$lib/server/supabaseAdmin';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	async createCheckoutSession(event) {
		const { session } = await getSupabase(event);
		if (!session) {
			throw redirect(302, '/signin');
		}

		const { request } = event;
		const formData = await request.formData();
		const priceId = formData.get('priceId') as string;

		const customer = await createOrRetrieveCustomer({
			uuid: session.user.id || '',
			email: session.user.email || ''
		});

		const baseUrl = getURL();
		const checkoutSession = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			billing_address_collection: 'required',
			customer,
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			mode: 'subscription',
			allow_promotion_codes: true,
			subscription_data: {
				trial_from_plan: true
			},
			success_url: `${baseUrl}/account`,
			cancel_url: baseUrl
		});

		if (!checkoutSession.url) {
			throw error(500, {
				message: 'Cannot create checkout session'
			});
		}

		throw redirect(302, checkoutSession.url);
	}
} satisfies Actions;
