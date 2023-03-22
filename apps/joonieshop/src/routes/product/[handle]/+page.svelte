<script lang="ts">
    import type { PageData } from './$types';
    import { fade } from 'svelte/transition';
    import { getRandomColor } from '$utils/common/getRandomColor';
	import { parsePrice } from '$utils/common/parsePrice';
	import { currency } from '$stores/shop';
	import Labels from '$components/Labels.svelte';
	import Filters from '$components/Filters.svelte';
	import type { ProductOptionValue, ProductVariant } from '$utils/medusa/types';
	import Line from '$components/Line.svelte';

    // TODO: what to do if there are no images?

    export let data: PageData;

    $: images = data.images || [];
    let currentImage = 0;

    let selectedVariant = 0;
    $: optionsMap = generateOptionsMap({}, data.variants);
    $: selectedOptions = data.options?.map(option => option.values[0].value) || [];
    const variantKeyCache = {};

    const optionTypes = { size: ['xs', 's', 'm', 'l', 'xl'], color: [], finish: ['glossy', 'matte'] };
    
    const generateFilters = (values: ProductOptionValue[], type: string) => {
        switch (type) {
            case 'size':
                const sizes: { value: string }[] = [];
                for (const size of optionTypes.size) {
                    const isIncludedSize = values.find(value => value.value.toLowerCase() === size);
                    if (isIncludedSize) {
                        sizes.push({ value: size });
                    }
                }
                return sizes;
            default:
                const mapOfValues = values.reduce((a: Record<string, { value: string }>, c) => {
                    const value = c.value.toLowerCase();
                    if (!a[value]) {
                        a[value] = { value };
                    }
                    return a;
                }, {});
                return Object.values(mapOfValues);
        }
    }
    
    const generateOptionsMap = (map: Record<string, unknown>, variants?: ProductVariant[], i = 0) => {
        if (!variants || variants.length <= 1) return;

        variants.forEach(variant => {
            const alphabeticallySortedOptions = variant.options?.sort((a, b) => a.value.localeCompare(b.value));
            const varianttKey = alphabeticallySortedOptions.map(option => option.value.toLowerCase()).join('-');
            map[varianttKey] = variant.id;
        });
       
       return map; 
    };

    console.log(optionsMap, selectedOptions);

    $: price = parsePrice(data.variants?.[selectedVariant]?.prices.find(price => price.currency_code === $currency)?.amount);

    let labels: string[] = []
    $: hasOtherLabelsInMetaData = (data.metadata?.labels as string[])?.length > 0;
    $: isPartOfCollection = data.collection !== undefined && data.collection !== null;
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
    <div class="md:h-screen md:w-2/5">
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

    <div class="top-0 flex flex-col max-h-screen gap-4 p-6 unset md:sticky md:p-12 md:w-3/5">
        <div class="flex flex-col w-full gap-4 mt-4 md:gap-7 md:mt-32">
            {#if hasAtLeastOneVariantOnSale || isPartOfCollection || hasOtherLabelsInMetaData}
                <Labels {labels} />
            {/if}
            <h1 class="text-3xl antialiased font-bold sm:text-4xl md:text-5xl lg:text-6xl font-libre">{data.title?.toLowerCase() || 'untitled'}</h1>
            <h2 class="text-xl font-light sm:text-2xl md:text-3xl lg:text-4xl">${price}</h2>
            <div>
                {#if data.options && data.options.length > 0}
                    {#each data.options as option, i (i)}
                    <div>
                        <Line />
                        <div class="flex flex-col gap-2 md:items-center md:justify-between md:flex-row">
                            <h3 class="text-lg font-light">{option.title.toLowerCase()}</h3>
                            <Filters filter={selectedOptions[i]} filters={generateFilters(option.values, option.title.toLowerCase())} />
                        </div>
                    </div>
                    {/each}
                {/if}
                <Line />
                <div class="flex flex-col gap-2 md:items-center md:justify-between md:flex-row">
                    <h3 class="text-lg font-light">quantity</h3>
                    <div class="py-4">quantity selector</div>
                </div>
            <Line />
            </div>
            
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