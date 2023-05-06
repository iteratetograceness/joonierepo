<script>
	import Cart from '$components/Cart.svelte';
</script>

<section class="max-w-screen relative -m-6 h-auto md:-m-12 md:h-screen">
	<div
		class="fixed top-0 right-0 z-50 bg-brown px-4 py-3 text-xl text-light sm:text-2xl md:top-12 md:right-12 md:m-0 md:bg-transparent md:p-0 md:text-3xl md:text-brown"
	>
		<Cart />
	</div>
	<slot />
</section>
