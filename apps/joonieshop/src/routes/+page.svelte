<script lang="ts">
	// import { cart, loadCart } from '$stores/cart';


  // import type { PageData } from './$types';
  // export let data: PageData;

  $: allProducts = [];

  // async function addToCart(product_id?: string, quantity = 1) {
  //   const res = await fetch('/api/cart', {
  //     method: 'PATCH',
  //     body: JSON.stringify({ product_id, quantity }),
  //   })

  //   if (res.ok) {
  //     loadCart();
  //     console.log($cart);
  //   } else {
  //     alert(JSON.stringify(await res.json()))
  //   }
  // }

</script>

<svelte:head>
  <title>joonieshop</title>
</svelte:head>

<main>
  <section>
    <div class="lg:h-[90vh]">
      hey
      <!-- {#each allProducts as product}
        <button on:click={() => addToCart(product.id, 1)}>ADD TO CART: {product.name}</button>
      {/each} -->
    </div>
  </section>
</main>
