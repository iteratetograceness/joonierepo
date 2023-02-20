<script>
  import { page } from '$app/stores';
  import { cartQuantity } from '$stores/cart';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  $: currentRoute = $page.url.pathname;

  // let showMenu = false;

  const links = [
    { name: 'Back to Main', path: 'https://joonie.dev' },
    { name: 'JOONIESHOP', path: '/' }, 
    { name: 'Cart', path: '/cart' }
  ];

  function openCart() {
    // showMenu = false;
    dispatch('openCart', true);
  }
</script>

<nav class="flex items-center justify-between p-4 text-lg bg-transparent lg:px-6">
  {#each links as link, i (link.name)}
    <div 
      class:active={currentRoute === link.path} 
      class={`md:w-1/3 ${link.path === '/' ? 'flex justify-start md:justify-center w-1/2' : link.path === '/cart' ? 'flex justify-end w-1/2' : 'justify-start hidden md:flex'}`}
    >
      <a 
        href={link.path}
        data-sveltekit-preload-data="hover" 
        on:click={link.path === '/cart' ? openCart : null}
        class={`relative mx-2 my-1 before:content-[''] before:absolute 
                before:block before:w-full before:h-[1.5px] before:bottom-[-2px] 
                before:left-0 before:bg-dark-blue before:hover:scale-x-100 
                before:scale-x-0 before:origin-top-left before:transition 
                before:ease-in-out before:duration-300 motion-reduce:before:transition-none
                ${currentRoute === link.path ? 'before:scale-x-100' : ''}`}
      >
        {link.name}{link.path === '/cart' ? ` (${$cartQuantity})` : ''}
      </a>
    </div>
  {/each}

  <!-- UNCOMMENT IF ADDING MORE LINKS -->
  <!-- <div class="flex items-center">
    <button
      on:click={() => {
        showMenu = true;
      }}
      aria-label="Open mobile menu"
      class="md:hidden"
    >
      <Icons type="menu" />
    </button>
  </div> -->
  <!-- Mobile Menu -->
  <!-- <div
    class={`absolute inset-0 flex justify-end w-full max-h-screen 
            overflow-hidden bg-dark-blue md:hidden transition-all 
            duration-300 ease-in-out text-light
            ${showMenu ? 'opacity-100 z-50' : 'opacity-0 z-[-50]'}`}
  >
    <div class={`w-full p-6`}>
      <div class="flex items-center justify-between w-full">
        <button
          aria-label="Close menu"
          on:click={() => {
            showMenu = false;
          }}
        >
          <Icons strokeColor="currentColor" type="close" />
        </button>
        <button on:click={openCart} class="relative mr-4">
            Cart ({$cartQuantity})
        </button>
      </div>
      <div class="flex flex-col items-end w-full gap-4 mt-10">
        <div
          class:active={currentRoute === '/'}
          on:click={() => {
            showMenu = false;
          }}
        >
          <a
            href="/"
            class="px-2 py-1 text-xl font-bold text-white hover:opacity-100">Home</a
          >
        </div>
        <div
          on:click={() => {
            showMenu = false;
          }}
        >
          <a
            href="https://joonie.dev"
            class='px-2 py-1 text-xl font-bold text-white hover:opacity-100'>Back to Main</a
          >
        </div>
      </div>
    </div>
  </div> -->
</nav>
