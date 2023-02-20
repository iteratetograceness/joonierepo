<script>
  export let title = '';
  export let removeLabels = false;
  export let imageSrc;
  export let price = '';
  export let currencyCode = '';
  export let href = '';
  export let priority = 'lazy';

  let hover = false;
</script>

<div
  on:mouseenter={() => {
    hover = true;
  }}
  on:mouseleave={() => {
    hover = false;
  }}
  class="w-full h-full overflow-hidden"
>
  <a
    data-test="grid-tile"
    {href}
    data-sveltekit-prefetch
    class="relative flex items-center justify-center w-full h-full focus:border-blue-500 focus:border-2"
  >
    <img
      alt={title}
      class={`w-full md:w-1/2 lg:w-full flex-none transition duration-300 ease-in-out ${
        hover ? 'scale-110' : ''
      }`}
      fetchpriority={priority === 'eager' ? 'high' : 'low'}
      decoding="async"
      loading={priority}
      src={imageSrc}
    />
    {#if !removeLabels}
      <div class="absolute top-0 left-0">
        <div class="p-3 text-2xl font-medium bg-black ">
          {title}
        </div>
        <div class="p-3 text-sm bg-black w-fit">
          ${price}
          {currencyCode}
        </div>
      </div>
    {/if}
  </a>
</div>
