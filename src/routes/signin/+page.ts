import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { session } = await getSupabase(event);

	if (session) {
		throw redirect(302, '/account');
	}
}) satisfies PageLoad;
