import { env } from '$env/dynamic/private';
import Stripe from 'stripe';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY_LIVE ?? env.STRIPE_SECRET_KEY ?? '', {
	// https://github.com/stripe/stripe-node#configuration
	apiVersion: '2022-11-15',
	// Register this as an official Stripe plugin.
	// https://stripe.com/docs/building-plugins#setappinfo
	appInfo: {
		name: 'SvelteKit Subscription Starter',
		version: '0.0.1'
	}
});
