<script lang="ts">
    // TODO: typing.
    export let products: any[] = [];
    console.log(products)
    $: price_or_range = (variants: any[]) => {
        if (variants.length === 1) {
            return `$${Math.floor(variants[0].prices[0].amount / 100)}`;
        } else {
            let min = Infinity, max = -Infinity;
            variants.forEach(variant => {
                min = Math.min(variant.prices[0].amount, min);
                max = Math.max(variant.prices[0].amount, max);
            })
            if (min === max) {
                return `$${Math.floor(min / 100)}`;
            }
            return `$${Math.floor(min / 100)} - $${Math.floor(max / 100)}`;
        }
    }
</script>

<section class="grid grid-cols-[minmax(1fr, 500px)] gap-8 py-10 -mx-4 md:m-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each products as { title, thumbnail, handle, variants }}
        <a class="w-full" href={`/product/${handle}`}>
            <div class="w-full h-auto aspect-image bg-yellow">
                <img class="object-cover w-full h-full" src={thumbnail} alt="placeholder" />
            </div>
            <div class="flex justify-between w-full pt-3">
                <p>{title}</p>
                <p>{price_or_range(variants)}</p>
            </div> 
        </a>
    {/each}
</section>