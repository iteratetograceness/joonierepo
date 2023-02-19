import "../../../../chunks/init.js";
import swell from "swell-js";
const Cart = {
  get: async () => {
    return await swell.cart.get();
  },
  addItem: async ({ product_id, quantity = 1 }) => {
    return await swell.cart.addItem({
      product_id,
      quantity
    });
  }
};
const PATCH = async ({ request }) => {
  const body = await request.json();
  const response = await Cart.addItem(body);
  return new Response(JSON.stringify({ data: response }));
};
export {
  PATCH
};
