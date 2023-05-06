<script lang="ts">
	import type { PageData } from './$types';
	import { getRandomColor } from '$utils/common/getRandomColor';
	import { parsePrice } from '$utils/common/parsePrice';
	import { currency } from '$stores/shop';
	import Labels from '$components/Labels.svelte';
	import Line from '$components/Line.svelte';
	import QuantitySelector from '$components/QuantitySelector.svelte';
	import { useProduct } from '$stores/product';
	import ProductOptions from '$components/ProductOptions.svelte';
	import { fade } from 'svelte/transition';
	import { addToCart } from '$stores/cart';

	export let data: PageData;

	$: images = data.images || [];
	let currentImage = 0;

	const {
		variant,
		options,
		quantity,
		actions: { updateOptions, increaseQuantity, decreaseQuantity, resetOptions }
	} = useProduct(data);

	async function handleAddToCart() {
		if ($variant) {
			await addToCart($variant.id, $quantity);
			resetOptions();
		}
	}

	$: price = parsePrice(
		$variant?.prices.find((price) => price.currency_code === $currency)?.amount
	);

	let labels: string[] = [];
	$: hasOtherLabelsInMetaData = (data.metadata?.labels as string[])?.length > 0;
	$: isPartOfCollection = data.collection !== undefined && data.collection !== null;
	$: hasAtLeastOneVariantOnSale = data.variants?.some((variant) =>
		variant.prices.some(
			(price) => price.price_list?.type === 'sale' && price.price_list?.status === 'active'
		)
	);
	$: {
		if (isPartOfCollection) {
			labels.push(data.collection.handle);
		}

		if (hasAtLeastOneVariantOnSale) {
			labels.push('sale');
		}

		if (hasOtherLabelsInMetaData) {
			(data.metadata?.labels as string[])?.forEach((label: string) => labels.push(label));
		}
	}
</script>

<div class="relative flex min-h-fit w-screen flex-col md:flex-row">
	<div class="overflow-y-scroll md:w-2/5">
		{#each images as image, i}
			<img
				transition:fade={{ duration: 300 }}
				class={`${currentImage === i ? '' : 'hidden'} md:block ${getRandomColor()}`}
				src={image.url}
				alt={`${i + 1} of ${images.length}`}
			/>
		{/each}
		<div class="flex h-32 w-fit overflow-x-scroll md:hidden">
			{#each images as image, i}
				<button on:click={() => (currentImage = i)}>
					<img
						class={`h-full ${currentImage !== i ? 'opacity-50' : ''}`}
						src={image.url}
						alt={`Click to view image ${i + 1} of ${images.length}`}
					/>
				</button>
			{/each}
		</div>
	</div>

	<div class="unset top-0 flex flex-col p-6 md:sticky md:left-[40%] md:h-max md:w-3/5 md:p-10">
		<div class="mt-4 flex w-full flex-col gap-6 md:mt-24 md:gap-6">
			<Labels {labels} />
			<h1 class="font-libre text-3xl font-bold antialiased sm:text-4xl md:text-5xl lg:text-6xl">
				{data.title?.toLowerCase() || 'untitled'}
			</h1>
			<h2 class="text-xl font-light sm:text-2xl md:text-3xl lg:text-4xl">${price}</h2>
			<div>
				{#each data.options as option, i (i)}
					<div>
						<Line />
						<ProductOptions {option} {updateOptions} current={$options[option.id]} />
					</div>
				{/each}
				<Line />
				<div class="flex items-center justify-between gap-2">
					<h3 class="text-lg font-light">quantity</h3>
					<div class="py-4">
						<QuantitySelector
							count={$quantity}
							increment={increaseQuantity}
							decrement={decreaseQuantity}
						/>
					</div>
				</div>
				<Line />
			</div>
			<div class="flex">
				<button>go back</button>
				<button on:click={handleAddToCart}>add to cart</button>
			</div>
			<p>{data.description}</p>
			<!-- Add to cart button -->
		</div>
	</div>
</div>
