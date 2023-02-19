export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Vercel_Logo.png","favicon.png","heart_icon.svg","svelte_logo.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		entry: {"file":"_app/immutable/start-0177db07.js","imports":["_app/immutable/start-0177db07.js","_app/immutable/chunks/index-2fe51df0.js","_app/immutable/chunks/singletons-a9ad6bf3.js","_app/immutable/chunks/index-f3d0dc6f.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/api/cart",
				pattern: /^\/api\/cart\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/cart/_server.ts.js')
			},
			{
				id: "/product/[handle]",
				pattern: /^\/product\/([^/]+?)\/?$/,
				params: [{"name":"handle","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,3], leaf: 5 },
				endpoint: null
			},
			{
				id: "/search",
				pattern: /^\/search\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/search/[collection]",
				pattern: /^\/search\/([^/]+?)\/?$/,
				params: [{"name":"collection","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
