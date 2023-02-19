import { c as create_ssr_component, b as add_attribute, d as subscribe, v as validate_component, e as createEventDispatcher, f as each, g as escape, h as add_classes } from "../../chunks/index3.js";
import { p as page } from "../../chunks/stores.js";
import { w as writable } from "../../chunks/index2.js";
const app = "";
const Icons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { strokeColor = "#000" } = $$props;
  let { type } = $$props;
  let { width = "24px;" } = $$props;
  let { height = "24px;" } = $$props;
  if ($$props.strokeColor === void 0 && $$bindings.strokeColor && strokeColor !== void 0)
    $$bindings.strokeColor(strokeColor);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<div>${type === "star" ? `<svg width="${"20"}" height="${"20"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M12.43 8L10 0L7.57 8H0L6.18 12.41L3.83 20L10 15.31L16.18 20L13.83 12.41L20 8H12.43Z"}"></path></svg>` : `${type === "cart" ? `<svg width="${"20"}" height="${"22"}" viewBox="${"0 0 20 22"}" fill="${"none"}"${add_attribute("stroke", strokeColor, 0)}><path d="${"M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path><path d="${"M1 5H19"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path><path d="${"M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path></svg>` : `${type === "close" ? `<svg viewBox="${"0 0 24 24"}" width="${"24"}" height="${"24"}"${add_attribute("stroke", strokeColor, 0)} stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" fill="${"none"}" shape-rendering="${"geometricPrecision"}" class="${"hover:text-accent-3 h-6 w-6"}"><path d="${"M18 6L6 18"}"></path><path d="${"M6 6l12 12"}"></path></svg>` : `${type === "minus" ? `<svg width="${"18"}" height="${"18"}" viewBox="${"0 0 24 24"}" fill="${"none"}"><path d="${"M5 12H19"}"${add_attribute("stroke", strokeColor, 0)} stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path></svg>` : `${type === "plus" ? `<svg width="${"18"}" height="${"18"}" viewBox="${"0 0 24 24"}" fill="${"none"}"><path d="${"M12 5V19"}"${add_attribute("stroke", strokeColor, 0)} stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path><path d="${"M5 12H19"}"${add_attribute("stroke", strokeColor, 0)} stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path></svg>` : `${type === "menu" ? `<svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-6 w-6"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"#fff"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M4 6h16M4 12h16m-7 6h7"}"></path></svg>` : `${type === "search" ? `<svg${add_attribute("style", `width:${width};height:${height}`, 0)} viewBox="${"0 0 24 24"}"><path${add_attribute("fill", strokeColor, 0)} d="${"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"}"></path></svg>` : `${type === "arrowLeft" ? `<svg width="${"24"}" height="${"24"}" viewBox="${"0 0 24 24"}" fill="${"none"}"${add_attribute("stroke", strokeColor, 0)}><path d="${"M19 12H5"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path><path d="${"M12 19L5 12L12 5"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path></svg>` : `${type === "arrowRight" ? `<svg width="${"24"}" height="${"24"}" viewBox="${"0 0 24 24"}" fill="${"none"}"${add_attribute("stroke", strokeColor, 0)} xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M5 12H19"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path><path d="${"M12 5L19 12L12 19"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path></svg>` : `${type === "caretRight" ? `<svg viewBox="${"0 0 24 24"}" width="${"24"}" height="${"24"}"${add_attribute("stroke", strokeColor, 0)} stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" fill="${"none"}" shape-rendering="${"geometricPrecision"}" class="${"Collapse_icon__JsuEg"}"><path d="${"M9 18l6-6-6-6"}"></path></svg>` : ``}`}`}`}`}`}`}`}`}`}</div>`;
});
const cartQuantity = writable(0);
const cart = writable([]);
const SearchBar_svelte_svelte_type_style_lang = "";
const css = {
  code: "form.svelte-1qk1hkg{margin:0px;padding:0px;display:inline}input.svelte-1qk1hkg::-moz-placeholder{color:rgb(85, 85, 85)}input.svelte-1qk1hkg::placeholder{color:rgb(85, 85, 85)}",
  map: null
};
const SearchBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value2) => $page = value2);
  let value = $page.url.searchParams.get("q");
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<form class="${"relative flex w-full items-center svelte-1qk1hkg"}"><div class="${"absolute top-0 right-0 mr-2"}">${validate_component(Icons, "Icons").$$render($$result, { strokeColor: "#fff", type: "search" }, {}, {})}</div>
  <input id="${"searchInput"}" type="${"text"}" placeholder="${"Search for products..."}" autocomplete="${"off"}" class="${"w-full border border-white/30 bg-transparent p-2 svelte-1qk1hkg"}"${add_attribute("value", value, 0)}>
</form>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentRoute;
  let $page, $$unsubscribe_page;
  let $cartQuantity, $$unsubscribe_cartQuantity;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_cartQuantity = subscribe(cartQuantity, (value) => $cartQuantity = value);
  createEventDispatcher();
  let tabs = [
    { name: "All", path: "/search" },
    {
      name: "Featured",
      path: "/search/featured"
    },
    { name: "Apparel", path: "/search/clothes" }
  ];
  currentRoute = $page.url.pathname;
  $$unsubscribe_page();
  $$unsubscribe_cartQuantity();
  return `<nav class="${"flex items-center bg-transparent p-4 lg:px-6"}"><div class="${"flex w-1/3 items-center"}"><div class="${["mr-4", currentRoute === "/" ? "active" : ""].join(" ").trim()}"><a href="${"/"}" data-sveltekit-prefetch class="${""}"><picture><source srcset="${"/svelte_logo.png"}" type="${"image/png"}">
          <img alt="${"Svelte Logo"}" class="${"h-[38] w-[32]"}" decoding="${"async"}"${add_attribute("height", 38, 0)} loading="${"eager"}" src="${"/svelte_logo.png"}"${add_attribute("width", 32, 0)}></picture></a></div>
    <div class="${"hidden lg:flex"}">${each(tabs, (tab, i) => {
    return `<div${add_classes((currentRoute === tab.path ? "active" : "").trim())}><a data-sveltekit-prefetch${add_attribute("href", tab.path, 0)}${add_attribute("class", `hover:opacity-100 px-2 py-1 text-white rounded-lg ${currentRoute === tab.path ? "opacity-100" : "opacity-75"}`, 0)}>${escape(tab.name)}</a>
        </div>`;
  })}</div></div>
  <div class="${"hidden w-1/3 lg:block"}">${validate_component(SearchBar, "SearchBar").$$render($$result, {}, {}, {})}</div>
  <div class="${"ml-auto flex items-center"}"><button class="${"relative my-2 mx-4"}">${validate_component(Icons, "Icons").$$render($$result, { strokeColor: "#fff", type: "cart" }, {}, {})}
      <div data-test="${"cart-quantity"}" class="${"absolute bottom-0 left-0 -ml-3 -mb-3 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs text-black"}">${escape($cartQuantity)}</div></button>
    <button aria-label="${"Open menu"}" class="${"lg:hidden"}">${validate_component(Icons, "Icons").$$render($$result, { type: "menu" }, {}, {})}</button></div>
  ${``}</nav>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex w-full flex-col items-center justify-center border-t border-zinc-700 py-8 px-4"}"><div class="${"flex items-center"}">Deployed on <a class="${"font-bold"}" href="${"https://vercel.com/home"}"><img src="${"/Vercel_Logo.png"}" alt="${"Vercel Logo"}" class="${"h-5 ml-1"}"></a></div></div>`;
});
const ShoppingCart_svelte_svelte_type_style_lang = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_cart;
  $$unsubscribe_cart = subscribe(cart, (value) => value);
  $$unsubscribe_cart();
  return `<main${add_attribute("class", `${"min-h-screen"} text-white overflow-hidden`, 0)}>
  ${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
  <div class="${"min-h-screen overflow-scroll"}">${slots.default ? slots.default({}) : ``}
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div></main>`;
});
export {
  Layout as default
};
