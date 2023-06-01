// See https://kit.svelte.dev/docs/types#app

import type { User } from 'sveltekit-medusa-client';

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code?: string;
			message?: string;
			status?: number;
		}
		interface Locals {
			user?: User;
			sid?: string;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
