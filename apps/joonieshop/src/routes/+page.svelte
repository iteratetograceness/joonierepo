<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import type { PageData } from './$types';
	import Filters from "$components/Filters.svelte";
	import ProductGrid from "$components/ProductGrid/ProductGrid.svelte";
	import type { Product } from '$utils/medusa/types';
	import ProductGridSkeleton from '$components/ProductGrid/ProductGridSkeleton.svelte';
  
  export const prerender = true;
  export let data: PageData;

  let filter = 'All';
  $: filters = Array.isArray(data.filters) ? [{ value: 'all', metadata: {} }, ...data.filters] : [{ value: 'all', metadata: {} }];

  const filterProductsByCategory = (unfilteredProducts: Product[], category = 'all') => {
    const caseInsensitiveCategory = category.toLowerCase();

    return unfilteredProducts.map((p) => {
      const caseInsensitiveProductType = p.type?.value.toLowerCase();
      const show = caseInsensitiveCategory === 'all' ? true : caseInsensitiveProductType === caseInsensitiveCategory;
      p.metadata = { show };
      return p;
    });
  };

  const reload = () => {
    invalidateAll();
  }
</script>

<svelte:head>
  <title>joonieshop</title>
</svelte:head>

<main>
  <section class="flex flex-col min-h-screen">
    <Filters bind:filter={filter} {filters} />
    {#await data.streamed.allProducts}
      <ProductGridSkeleton />
    {:then products}
      {#if Array.isArray(products) && products.length > 0}
        <ProductGrid products={filterProductsByCategory(products, filter)} />
      {:else}
        <p>No products available.</p>
      {/if}
    {:catch}
      <div class="flex flex-col items-center self-center justify-center gap-3 mt-24 rounded-full w-60 h-60 bg-brown sm:w-72 sm:h-72 text-light">
        <p class="text-lg text-3xl font-bold">Oops!</p>
        <span class="w-[20ch] text-md sm:text-lg text-center">We ran into an issue. <button class="inline font-bold hover:text-yellow transition-[color] duration-200" on:click={reload}>Click here</button> to try again.</span>
      </div>
    {/await}
  </section>
</main>
