<script>
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores'
	import { onMount } from 'svelte';
	import Cart from './Cart.svelte';
	
	onMount(() => {
		invalidateAll();
	})

	$: isLoggedIn = $page.data.user !== null;
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
	<div class="flex justify-between gap-0 sm:gap-4 h-min items-center text-base sm:text-lg font-libre">
		{#if isLoggedIn}
			<a class="" href="/account">account</a>
		{:else}
			<a class="" href="/login">login</a>
		{/if}
		<span class="hidden md:block">/</span>
		<Cart />
	</div>
	
</nav>
