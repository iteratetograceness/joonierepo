<script>
	import Filters from "$components/Filters.svelte";
import { allProducts, getAllProducts } from "$stores/products";

  /**
	 * @type {any[]} -- TODO: typing.
	 */
  let products = [];
  let filtered = products;
  let filter = 'all';

  $: {
    filtered = filterProductsByCategory(products, filter);
  }

  let loading = true;

  allProducts.subscribe((p) => {
    if (p?.all.length > 0) {
      products = p.all;
    }

    loading = false;
  });

  getAllProducts();

  // @ts-ignore - TODO: typing.
  const filterProductsByCategory = (unfilteredProducts, category = 'all') => {
    if (category === "all") {
      return unfilteredProducts;
    }

    // @ts-ignore - will be fixed by typing Products.
    return unfilteredProducts.filter((p) => p.type === category);
  };
</script>

<svelte:head>
  <title>joonieshop</title>
</svelte:head>

<main>
  <section>
    <div class="lg:h-[90vh]">
      <Filters {filter} />
      {#if loading}
        <div>
          <p>Loading products ...</p>
        </div>
      {:else}
      {#each filtered as { id, title, variants }}
        <li>
          <a href={`product/${id}`}>
            <div>
              <p class="title">{title}</p>
              <!-- <p>
                {formatPrice(
                  variants[0].prices[0].amount,
                  variants[0].prices[0].currency_code
                )}
              </p> -->
            </div>
          </a>
        </li>
      {/each}
    {/if}
    </div>
  </section>
</main>

<style>
  a {
    text-decoration: none;
  }
</style>