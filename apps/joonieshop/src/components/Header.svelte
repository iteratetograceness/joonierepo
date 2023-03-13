<script>
  import { cartQuantity } from '$stores/cart';
  import { createEventDispatcher } from 'svelte';
  import Icons from '$components/Icons.svelte';

  const dispatch = createEventDispatcher();
  
  function openCart() {
    dispatch('openCart', true);
  }
</script>

<nav class="flex flex-col-reverse justify-between gap-6 text-3xl md:gap-0 sm:text-4xl md:text-5xl md:flex-row">
  <div class="flex flex-col items-center gap-4 md:items-start">
    <a class="font-libre" href="/">joonieshop</a>
    <p class="text-lg sm:text-xl text-center w-[25ch] sm:w-[32ch] md:text-left">a collection of (purchasable) creations by jueun grace yun</p>
  </div>
  <a class="inline-flex items-center self-end gap-2 md:self-start font-libre" href="/cart" on:click={openCart}>
    <span class="hidden md:block">cart</span>
    <span class="block md:hidden"><Icons type="cart" /></span>
    ({$cartQuantity})
  </a>
</nav>
