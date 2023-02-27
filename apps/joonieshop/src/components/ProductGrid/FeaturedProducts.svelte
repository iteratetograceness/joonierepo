<script lang="ts">
	import type { Product } from "$utils/medusa/types";
	import ProductCard from "./ProductCard.svelte";

    export let featured: Product[] = [];
</script>

{#if featured.length > 0}
    <section>
        <div class="w-[calc(100vw-2rem)] grid w-full grid-cols-1 md:grid-cols-2 gap-6">
            {#each featured as product, i}
                <ProductCard {product} index={i} featured={true}/>
            {/each}
        </div>
    </section>
{/if}