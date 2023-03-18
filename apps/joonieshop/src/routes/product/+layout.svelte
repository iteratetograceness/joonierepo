<script>
	import Cart from "$components/Cart.svelte";
</script>

<section class="relative h-auto -m-6 overflow-hidden md:h-screen md:-m-12 max-w-screen">
    <div class="absolute top-0 right-0 z-50 px-4 py-3 text-3xl md:top-12 md:right-12 sm:text-4xl md:text-5xl text-light md:text-brown bg-brown md:bg-transparent md:p-0 md:m-0">
        <Cart />
    </div>
    <slot/>
</section>