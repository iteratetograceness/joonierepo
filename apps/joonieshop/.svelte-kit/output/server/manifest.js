export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		entry: {"file":"_app/immutable/start-17ad463c.js","imports":["_app/immutable/start-17ad463c.js","_app/immutable/chunks/index-90dbde55.js","_app/immutable/chunks/singletons-0ab141cc.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/cart",
				pattern: /^\/api\/cart\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/cart/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
