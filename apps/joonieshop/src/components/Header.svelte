<script>
	import Cart from './Cart.svelte';
</script>

<nav
	class="flex flex-col-reverse justify-between gap-6 text-xl sm:text-2xl md:flex-row md:gap-0 md:text-3xl"
>
	<div class="flex flex-col items-center gap-4 md:items-start">
		<a class="font-libre" href="/">joonieshop</a>
		<p class="w-[25ch] text-center text-lg sm:w-[32ch] sm:text-xl md:text-left">
			a collection of (purchasable) creations by jueun grace yun
		</p>
	</div>
	<Cart />
</nav>
