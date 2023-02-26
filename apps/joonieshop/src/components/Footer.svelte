<script>
  const links_and_text = [
    { href: 'https://joonie.dev', text: 'Made by Jueun Grace Yun ©' },
    // { href: 'https://instagram.com/joonieshop', text: '@joonieshop' },
    { text: `All Rights Reserved ${new Date().getFullYear()}` },
  ];

</script>

<footer class="flex items-center justify-between w-full p-8">
  {#each links_and_text as link_or_text}
    {#if link_or_text.href}
      <a data-sveltekit-preload-data="hover" href={link_or_text.href} class="text-lg hover:font-medium">
        {link_or_text.text}
      </a>
    {:else}
      <p class="text-lg">
        {link_or_text.text}
      </p>
    {/if}
  {/each}
</footer>
