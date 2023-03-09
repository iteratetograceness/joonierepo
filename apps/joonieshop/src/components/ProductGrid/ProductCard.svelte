<script lang="ts">
    import type { Product, ProductVariant } from "$utils/medusa/types";
    import { getRandomColor } from '$utils/common/getRandomColor';
	import { parsePrice } from "$utils/common/parsePrice";
	import { currency } from "$stores/shop";
    
    export let product: Product;
    export let featured = false;

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
            return `$${parsePrice(min)} - $${parsePrice(max)}`;
        }
    }
</script>

<a 
    class="relative w-full" 
    data-sveltekit-preload-data="hover"
    href={`/product/${product.handle}`}
>
    {#if featured}
        <div class="absolute top-0 left-0 z-50 flex items-center justify-center h-10 px-5 text-sm font-bold w-max bg-yellow text-brown">FEATURED</div>
    {/if}
    <div class={`w-screen md:w-full h-auto -mx-4 md:mx-0 aspect-image ${getRandomColor(['bg-dark', 'bg-light', 'bg-light-blue'])} ${!product.thumbnail ? 'hover:opacity-80 transition-opacity duration-500' : ''}`}>
        {#if product.thumbnail}
            <img class="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-95" src={product.thumbnail} alt={`Thumbnail for ${product.title}`} />
        {/if}
    </div>
    <div class="flex justify-between w-full pt-3">
        <b>{product.title}</b>
        <p>{price_or_range(product.variants)}</p>
    </div> 
</a>