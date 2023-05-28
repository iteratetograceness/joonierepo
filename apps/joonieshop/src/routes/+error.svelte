<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<div class="flex h-screen flex-col items-center justify-center ">
	<div class="flex w-auto flex-col items-center justify-center md:p-0">
		{#if $page.error?.message}
			<div class="text-lg italic font-medium">{$page.error?.message.toLowerCase()}</div>
		{/if}
		<h1 class="text-[150px] strong -my-10">{$page.status}</h1>
		{#if $page.error?.message}
			<div class="text-lg italic font-medium">{$page.error?.message.toLowerCase()}</div>
		{/if}
		<a
			href="/"
			data-sveltekit-preload-data="hover"
			class="mt-10 rounded-xl bg-brown text-light w-fit p-3 text-center text-sm font-medium"
		>
			go back home
		</a>
	</div>
</div>
