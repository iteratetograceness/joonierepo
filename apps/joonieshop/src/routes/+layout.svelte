<script>
  import '../app.postcss';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import { handleStoreCart } from '$stores/cart';
  import { onMount } from 'svelte';

  onMount(async () => {
    if (typeof window !== 'undefined') {

      await handleStoreCart();

      document.addEventListener('keydown', (e) => {
        let keyCode = e.code;
        if (keyCode === "Escape") {
          showCart = false;
        }
      });
    }
  });

  let showCart = false;
  let loading = false;

  async function openCart() {
    // await handleStoreCart(); ?????
    showCart = true;
  }
</script>

<main class={`${showCart ? 'h-screen' : 'min-h-screen'} overflow-hidden`}>
  <!-- {#if showCart}
    <ShoppingCart
      items={$cart}
      on:click={hideCart}
      on:removeProduct={removeProduct}
      on:addProduct={addToCart}
      on:getCheckoutUrl={getCheckoutUrl}
      bind:loading
    />
  {/if} -->
  <Header on:openCart={openCart} />
  <div class="relative min-h-screen overflow-scroll">
    <slot />
    <Footer />
  </div>
</main>
