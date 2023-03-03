<script>
  import '../app.postcss';
  import { page } from '$app/stores';
  import Footer from '$components/Footer.svelte';
  import { handleStoreCart } from '$stores/cart';
  import { onMount } from 'svelte';
	import Header from '$components/Header.svelte';
	import { goto } from '$app/navigation';

  $: isCart = $page.url.pathname === '/cart';

  onMount(async () => {
    if (typeof window !== 'undefined') {
      await handleStoreCart();
    }
  });

  const openCart = async () => {
    await handleStoreCart();
    goto('/cart');
  }
</script>


<main class='min-h-screen overflow-hidden'>
  <Header cart={isCart} on:openCart={openCart} />
  <div class="relative flex flex-col min-h-screen overflow-scroll">
    <slot />
    <Footer />
  </div>
</main>
