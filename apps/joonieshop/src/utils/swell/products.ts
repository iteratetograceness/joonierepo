import swell from './init';

export const Products = {
	getAll: async () => {
		return await swell.products.list();
	}
};
