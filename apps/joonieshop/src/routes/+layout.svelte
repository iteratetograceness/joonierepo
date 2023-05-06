<script>
  import '../app.postcss';
  import "@fontsource/libre-caslon-text";
  import "@fontsource/inter/variable.css";
  import { page } from '$app/stores';
  import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import { onMount } from 'svelte';
	import { cart } from '$stores/cart';

  /** @type {import('./$types').LayoutData} */
  export let data;

  onMount(() => {
    if (data.cart) {
      cart.update(() => data.cart);
    }
  })

  $: hideHeaderAndFooter = $page.url.pathname.includes('product');
</script>


<main class='box-border p-6 min-h-sansPadding min-w-mobile md:p-12'>
  {#if !hideHeaderAndFooter}
    <Header />
  {/if}
  <div class="relative flex flex-col min-h-content">
    <slot />
  </div>
  {#if !hideHeaderAndFooter}
    <Footer />
  {/if}
</main>
