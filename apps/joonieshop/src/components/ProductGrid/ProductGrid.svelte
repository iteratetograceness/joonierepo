<script lang="ts">
	import type { Product } from "$utils/medusa/types";
	import ProductCard from './ProductCard.svelte';

    export let products: Product[] = [];
</script>

<section class="w-[calc(100vw-2rem)] grid grid-cols-[minmax(1fr, 500px)] gap-8 py-8 m-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each products as product, i }
        <ProductCard {product} index={i} />
    {/each}
</section>
