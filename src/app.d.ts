// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { Database } from '../types/database';
import { Session } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Supabase {
			Database: Database;
			SchemaName: 'public';
		}

		interface PageData {
			session: Session | null;
			meta: {
				title: string;
				description: string;
				image: string;
			};
		}

		// interface Error {}
		// interface Locals {}
		// interface Platform {}
	}
}

export {};
