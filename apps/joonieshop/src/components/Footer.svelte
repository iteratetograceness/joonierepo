<script>
	const links_and_text = [
		{ href: 'https://joonie.dev', text: 'Made by Jueun Grace Yun ©' },
		// { href: 'https://instagram.com/joonieshop', text: '@joonieshop' },
		{ text: `All Rights Reserved ${new Date().getFullYear()}` }
	];
</script>

<footer class="flex flex-col gap-2 md:gap-0 md:flex-row w-full items-center justify-between px-4 py-3">
	{#each links_and_text as link_or_text}
		{#if link_or_text.href}
			<a
				href={link_or_text.href}
				class="text-sm md:text-lg transition-[color] duration-200 hover:text-light-blue"
			>
				{link_or_text.text}
			</a>
		{:else}
			<p class="text-sm md:text-lg">
				{link_or_text.text}
			</p>
		{/if}
	{/each}
</footer>
