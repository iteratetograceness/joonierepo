<script lang="ts">
    import type { Product, ProductVariant } from "$utils/medusa/types";
    import { getRandomColor } from '$utils/common/getRandomColor';
	import { parsePrice } from "$utils/common/parsePrice";
	import { currency } from "$stores/shop";
    
    export let product: Product;

    $: price_or_range = (variants: ProductVariant[]) => {
        if (variants.length === 1) {
            return `$${parsePrice(variants[0].prices.find(price => price.currency_code === $currency)?.amount)}`;
        } else {
            let min = Infinity, max = -Infinity;
            variants.forEach(variant => {
                min = Math.min(variant.prices.find(price => price.currency_code === $currency)?.amount || 0, min);
                max = Math.max(variant.prices.find(price => price.currency_code === $currency)?.amount || 0, max);
            })
            if (min === max) {
                return `$${parsePrice(min)}`;
            }
            return `$${parsePrice(min)}–${parsePrice(max)}`;
        }
    }
</script>

<a 
    class="relative w-full"
    href={`/product/${product.handle}`}
>
    <div class={`-mx-6 md:mx-0 aspect-square md:rounded-3xl overflow-hidden ${getRandomColor(['bg-dark', 'bg-light', 'bg-light-blue'])} hover:opacity-80 transition-opacity duration-500`}>
        {#if product.thumbnail}
            <img class="object-cover w-full h-full" src={product.thumbnail} alt={`Thumbnail for ${product.title}`} />
        {/if}
    </div>
    <div class="flex justify-between w-full pt-3 -mx-2 md:mx-0 md:px-5">
        <b class="font-bold">{product.title.toLowerCase()}</b>
        <p>{price_or_range(product.variants)}</p>
    </div> 
</a>