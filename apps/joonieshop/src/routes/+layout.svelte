<script>
  import '../app.postcss';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import ShoppingCart from '$components/ShoppingCart.svelte';
  import { cart } from '$stores/cart';
  import { onMount } from 'svelte';

  let c = $cart;

  onMount(async () => {
    if (typeof window !== 'undefined') {

      // TODO: Instead of making an API call on every mount, should we store a boolean in local storage
      // that let's us know there is an existing cart that was previously abandoned?
      // await getCartItems();

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
    // await getCartItems();
    // console.log($cart);
    showCart = true;
  }
</script>

<main class={`${showCart ? 'h-screen' : 'min-h-screen'} text-white overflow-hidden`}>
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
  <div class="min-h-screen overflow-scroll">
    <slot />
    <Footer />
  </div>
</main>
