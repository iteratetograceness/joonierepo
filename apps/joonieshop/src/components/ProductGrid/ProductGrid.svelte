<script lang="ts">
    import { flip } from 'svelte/animate';
    import { crossfade } from 'svelte/transition';
	import type { Product } from "$utils/medusa/types";
	import ProductCard from './ProductCard.svelte';

    export let products: Product[] = [];
    const [send, receive] = crossfade({
        duration: 500
    });
</script>

<section class="relative w-[calc(100vw-2rem)] grid grid-cols-[minmax(1fr, 500px)] gap-8 py-8 m-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each products as product (product.handle) }
        <div 
            animate:flip={{ duration: 500 }}
            class={`${product.metadata?.show ? '' : 'absolute opacity-0 inset-0 top-8 -z-1 pointer-events-none w-full md:w-1/2 lg:w-1/3 xl:w-1/4'}`}
            in:receive="{{ key: product.handle }}"
	        out:send="{{ key: product.handle }}"
        >
            <ProductCard 
                {product} 
            />
        </div>
    {/each}
</section>
