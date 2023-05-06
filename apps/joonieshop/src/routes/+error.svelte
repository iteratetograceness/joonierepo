<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<div class="flex h-screen flex-col items-center justify-center ">
	<div class="flex w-auto flex-col items-center justify-center p-6 md:p-0">
		<div class="mb-8 flex w-full items-center gap-1">
			<div class="mx-6 h-20 w-px bg-dark-blue" />
			<h1>{$page.status}:</h1>
			{#if $page.error?.message}
				<div class="text-lg font-medium">{$page.error?.message}</div>
			{/if}
		</div>
		<a
			href="/"
			data-sveltekit-preload-data="hover"
			class="w-full bg-dark-blue/90 p-3 text-center text-sm font-medium uppercase text-light hover:bg-dark-blue/100"
		>
			Return to Home Page
		</a>
	</div>
</div>
