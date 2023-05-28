<script>
	import '../app.postcss';
	import '@fontsource/libre-caslon-text';
	import '@fontsource/inter/variable.css';
	import { page } from '$app/stores';
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import { onMount } from 'svelte';
	import { cart } from '$stores/cart';
	import { fade } from 'svelte/transition';
	import { Toaster } from 'svelte-french-toast';

	/** @type {import('./$types').LayoutData} */
	export let data;

	onMount(() => {
		if (data.cart) {
			cart.update(() => data.cart);
		}
	});

	$: hideHeaderAndFooter = $page.url.pathname.includes('product');
</script>

<main class="box-border min-h-sansPadding min-w-mobile p-6 md:p-12" transition:fade={{ duration: 100 }}>
	<Toaster 
		position="bottom-right" 
		toastOptions={{ 
			iconTheme: { primary: 'hsl(18, 71%, 33%)', secondary: 'hsl(12, 6%, 97%)' },
			style: 'color: hsl(18, 71%, 33%)'
		}}
	/>
	{#if !hideHeaderAndFooter}
		<Header />
	{/if}
	<div class="relative flex min-h-content flex-col">
		<slot />
	</div>
	{#if !hideHeaderAndFooter}
		<Footer />
	{/if}
</main>
