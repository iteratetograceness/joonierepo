<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status}</title>
</svelte:head>

<div class="flex flex-col items-center justify-center h-screen ">
  <div class="flex flex-col items-center justify-center w-auto p-6 md:p-0">
    <div class="flex items-center w-full gap-1 mb-8">
      <div class="w-px h-20 mx-6 bg-dark-blue" />
      <h1>{$page.status}:</h1>
      {#if $page.error?.message}
        <div class="text-lg font-medium"> {$page.error?.message}</div>
      {/if}
    </div>
    <a
      href="/"
      data-sveltekit-preload-data="hover"
      class="w-full p-3 text-sm font-medium text-center uppercase text-light bg-dark-blue/90 hover:bg-dark-blue/100"
    >
      Return to Home Page
    </a>
  </div>
</div>