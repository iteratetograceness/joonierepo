import "../../chunks/init.js";
import swell from "swell-js";
import { e as error } from "../../chunks/index.js";
const Products = {
  getAll: async () => {
    return await swell.products.list();
  }
};
class ShopError extends Error {
  status;
  code;
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
const handleSwellError = (err) => {
  if (err instanceof ShopError && err.status && err.message) {
    throw error(err.status, err.message);
  } else {
    throwUnexpectedError();
  }
};
const throwUnexpectedError = () => {
  throw error(500, "We ran into an unexpected issue. Please try again later.");
};
const load = async () => {
  try {
    const allProducts = await Products.getAll();
    if (allProducts)
      return allProducts;
  } catch (err) {
    handleSwellError(err);
  }
};
export {
  load
};
