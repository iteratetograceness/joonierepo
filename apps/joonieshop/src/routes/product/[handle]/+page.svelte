<script lang="ts">
    import type { PageData } from './$types';
    import { fade } from 'svelte/transition';
    import { cartQuantity } from '$stores/cart';
    import { getRandomColor } from '$utils/common/getRandomColor';
	import { parsePrice } from '$utils/common/parsePrice';
	import { currency } from '$stores/shop';
	import Labels from '$components/Labels.svelte';

    export let data: PageData;

    $: images = data.images || [];
    let currentImage = 0;

    console.log(data);

    // Currently only supports having ONE type of product option:
    let selectedVariant = 0;
    $: selectedVariantId = data.variants?.[selectedVariant]?.id;
    $: price = parsePrice(data.variants?.[selectedVariant]?.prices.find(price => price.currency_code === $currency)?.amount);

    let labels: string[] = []
    $: hasOtherLabelsInMetaData = (data.metadata?.labels as string[])?.length > 0;
    $: isPartOfCollection = data.collection !== undefined;
    $: hasAtLeastOneVariantOnSale = data.variants?.some(variant => variant.prices.some(price => price.price_list?.type === 'sale' && price.price_list?.status === 'active'));
    $: {
        if (isPartOfCollection) {
            // @ts-expect-error -- checks if collection exists already.
            labels.push(data.collection.handle);
        } 
        
        if (hasAtLeastOneVariantOnSale) {
            labels.push('sale');
        }
        
        if (hasOtherLabelsInMetaData) {
            (data.metadata?.labels as string[])?.forEach((label: string) => labels.push(label));
        }
    };
</script>

<div class="relative flex flex-col w-screen min-h-screen overflow-y-scroll md:flex-row scrollbar-hide overscroll-contain">
    <div class="md:h-screen md:w-1/2">
        {#each images as image, i}
            <img transition:fade="{{ delay: 250, duration: 300 }}" class={`${currentImage === i ? '' : 'hidden'} md:block ${getRandomColor()}`} src={image.url} alt={`${i+1} of ${images.length}`} />
        {/each}
        <div class="flex h-32 overflow-x-scroll w-fit md:hidden">
            {#each images as image, i}
                <button on:click={() => currentImage = i}>
                    <img class={`h-full ${currentImage !== i ? 'opacity-50' : ''}`} src={image.url} alt={`Click to view image ${i+1} of ${images.length}`} />
                </button>
            {/each}
        </div>
    </div>

    <div class="top-0 flex flex-col gap-4 unset md:sticky p-7 w-screens md:w-1/2">
        <a href="/cart" class="absolute top-4 right-4 md:top-8 md:right-7">{`Cart (${$cartQuantity})`}</a>
        <div class="flex flex-col w-full md:w-4/5">
            <!-- Go back -->
            {#if hasAtLeastOneVariantOnSale || isPartOfCollection || hasOtherLabelsInMetaData}
                <Labels {labels} />
            {/if}
            <h1 class="mb-4 text-2xl font-bold">{data.title}</h1>
            <h2 class="mb-4 text-xl font-medium">${price}</h2>
            {#if data.options && data.options.length > 0}
                {#each data.options as option, i (i)}
                    <div class="flex flex-col gap-2 py-8">
                        <h3 class="text-lg font-medium">{option.title}</h3>
                        <div class="flex flex-row gap-2">
                            {#each option.values as value, j}
                                <button 
                                    class={`px-4 py-2 text-base font-medium ${selectedVariant === j ? 'bg-light-blue text-white' : 'bg-dark-blue text-white'}`} 
                                    on:click={() => selectedVariant = j}
                                >
                                    {value.value}
                                </button>
                            {/each}
                        </div>
                    </div>
                {/each}
            {/if}
            <!-- Quantity Selector -->
            <p class="text-lg">{data.description}</p>
            <!-- Add to cart button -->
        </div>
        
    </div>
</div>

<style>
    /* For Webkit-based browsers (Chrome, Safari and Opera) */
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }

    /* For IE, Edge and Firefox */
    .scrollbar-hide {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>