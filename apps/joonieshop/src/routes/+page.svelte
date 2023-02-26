<script lang="ts">
	import Filters from "$components/Filters.svelte";
	import ProductGrid from "$components/ProductGrid.svelte";
  import { allProducts, getAllProducts } from "$stores/products";
  
  let products: any[] = [];
  let filtered = products;
  let filter = 'All';
  let loading = true;

  $: {
    filtered = filterProductsByCategory($allProducts.all, filter);
  }

  const getProducts = async () => {
    loading = true;
    await getAllProducts();
    loading = false;
  };
  
  getProducts();

  // @ts-ignore - TODO: typing.
  const filterProductsByCategory = (unfilteredProducts, category = 'All') => {
    if (category === "All") {
      return unfilteredProducts;
    }
        
    // @ts-ignore - will be fixed by typing Products.
    return unfilteredProducts.filter((p) => p.type?.value === category);
  };
</script>

<svelte:head>
  <title>joonieshop</title>
</svelte:head>

<main>
  <section>
    <div class="p-4">
      <Filters bind:filter={filter} />
      {#if loading}
        <div>
          <p>Loading products ...</p>
        </div>
      {:else}
        <ProductGrid products={filtered} />
      {/if}
    </div>
  </section>
</main>