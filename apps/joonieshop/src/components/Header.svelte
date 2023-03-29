<script>
	import Cart from "./Cart.svelte";
</script>

<nav class="flex flex-col-reverse justify-between gap-6 text-xl md:gap-0 sm:text-2xl md:text-3xl md:flex-row">
  <div class="flex flex-col items-center gap-4 md:items-start">
    <a class="font-libre" href="/">joonieshop</a>
    <p class="text-lg sm:text-xl text-center w-[25ch] sm:w-[32ch] md:text-left">a collection of (purchasable) creations by jueun grace yun</p>
  </div>
  <Cart />
</nav>
