<script lang="ts">
    import { flip } from 'svelte/animate';
    import { crossfade } from 'svelte/transition';
	import type { Product } from "$utils/medusa/types";
	import ProductCard from "./ProductCard.svelte";

    export let featured: Product[] = [];
    const [send, receive] = crossfade({
        duration: 500
    });
</script>

{#if featured.length > 0}
    <section>
        <div class={`${featured[0].metadata?.show ? 'relative' : 'absolute'} w-[calc(100vw-2rem)] aspect-video grid w-full grid-cols-1 md:grid-cols-2 gap-6 pt-8`}>
            {#each featured as product (product.handle)}
                <div
                    animate:flip={{ duration: 500 }}
                    class={`${product.metadata?.show ? '' : 'absolute opacity-0 inset-0 top-8 -z-1 pointer-events-none w-full md:w-1/2'}`}
                    in:receive="{{ key: product.handle }}"
                    out:send="{{ key: product.handle }}"
                >
                    <ProductCard {product} featured={true}/>
                </div>
            {/each}
        </div>
    </section>
{/if}