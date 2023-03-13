<script>
  import '../app.postcss';
  import "@fontsource/libre-caslon-text";
  import "@fontsource/inter";

  import { page } from '$app/stores';
  import Footer from '$components/Footer.svelte';
  import { handleStoreCart } from '$stores/cart';
  import { onMount } from 'svelte';
	import Header from '$components/Header.svelte';

  $: isCart = $page.url.pathname === '/cart';
  $: hideHeaderAndFooter = $page.url.pathname.includes('product');

  onMount(async () => {
    if (typeof window !== 'undefined') {
      await handleStoreCart();
    }
  });

  const openCart = async () => {
    await handleStoreCart();
  }
</script>


<main class='min-h-screen p-6 min-w-mobile md:p-12'>
  {#if !hideHeaderAndFooter}
    <Header on:openCart={openCart} />
  {/if}
  <div class="relative flex flex-col min-h-screen">
    <slot />
    {#if !hideHeaderAndFooter}
      <Footer />
    {/if}
  </div>
</main>
