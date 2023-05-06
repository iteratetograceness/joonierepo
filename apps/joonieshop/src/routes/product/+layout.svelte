<script>
	import Cart from "$components/Cart.svelte";
</script>

<section class="relative h-auto -m-6 md:h-screen md:-m-12 max-w-screen">
    <div class="fixed top-0 right-0 z-50 px-4 py-3 md:top-12 md:right-12 text-xl sm:text-2xl md:text-3xl text-light md:text-brown bg-brown md:bg-transparent md:p-0 md:m-0">
        <Cart />
    </div>
    <slot/>
</section>