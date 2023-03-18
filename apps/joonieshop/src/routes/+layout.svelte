<script>
  import '../app.postcss';
  import "@fontsource/libre-caslon-text";
  import "@fontsource/inter/variable.css";

  import { handleStoreCart } from '$stores/cart';
  import { page } from '$app/stores';
  import Footer from '$components/Footer.svelte';
  import { onMount } from 'svelte';
	import Header from '$components/Header.svelte';

  $: hideHeaderAndFooter = $page.url.pathname.includes('product');

  onMount(async () => {
    if (typeof window !== 'undefined') {
      await handleStoreCart();
    }
  });
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
