import { c as create_ssr_component, d as subscribe, f as each, h as escape } from "../../chunks/index3.js";
import { a as cart } from "../../chunks/cart.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let allProducts;
  let $$unsubscribe_cart;
  $$unsubscribe_cart = subscribe(cart, (value) => value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  allProducts = data.results || [];
  $$unsubscribe_cart();
  return `${$$result.head += `<!-- HEAD_svelte-1uoca09_START -->${$$result.title = `<title>joonieshop</title>`, ""}<!-- HEAD_svelte-1uoca09_END -->`, ""}

<main><section><div class="${"lg:h-[90vh]"}">${each(allProducts, (product) => {
    return `<button>ADD TO CART: ${escape(product.name)}</button>`;
  })}</div></section></main>`;
});
export {
  Page as default
};
