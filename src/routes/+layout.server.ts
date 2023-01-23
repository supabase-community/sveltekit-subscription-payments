import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	return {
		session: getServerSession(event)
	};
}) satisfies LayoutServerLoad;
