// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code?: string;
			message?: string;
			status?: number;
		}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
