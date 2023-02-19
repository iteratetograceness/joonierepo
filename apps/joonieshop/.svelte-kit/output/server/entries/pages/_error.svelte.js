import { c as create_ssr_component, d as subscribe, h as escape } from "../../chunks/index3.js";
import { p as page } from "../../chunks/stores.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="${"flex h-screen flex-col items-center justify-center "}"><div class="${"flex w-auto flex-col items-center justify-center p-6 md:p-0"}"><div class="${"mb-8 flex w-full items-center"}"><div class="${"mx-6 h-20 w-px bg-white"}"></div>
      <div class="${"text-lg font-medium"}">${escape($page.status)}: ${escape($page.error?.message)}</div></div>
    <a href="${"/"}" data-sveltekit-preload-data="${"hover"}" class="${"w-full bg-white/90 p-3 text-center text-sm font-medium uppercase text-black hover:bg-white/100"}">Return to Home Page
    </a></div></div>`;
});
export {
  Error as default
};
