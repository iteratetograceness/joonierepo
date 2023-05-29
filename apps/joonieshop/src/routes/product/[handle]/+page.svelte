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
	import { addToCart, cartError } from '$stores/cart';
	import toast from 'svelte-french-toast';

	/**
	 * TODO:
	 * - Fix layout shift due to photo loading on mobile viewport
	 * - Fix layout shift due to options loading in on desktop viewport
	 */

	export let data: PageData;

	let loading = false;
	$: images = data.images || [];
	let currentImage = 0;

	cartError.subscribe((msg) => {
		if (msg) {
			toast.error(msg);
			cartError.set(null);
		}
	});

	const {
		variant,
		options,
		quantity,
		price,
		salePrice,
		labels,
		actions: { updateOptions, updateQuantity, increaseQuantity, decreaseQuantity, reset }
	} = useProduct(data);

	async function handleAddToCart() {
		if ($variant) {
			loading = true;
			toast.remove();
			await addToCart($variant.id, $quantity);
			reset();
			loading = false;
		}
	}

	$: stock = $variant?.inventory_quantity || 0;
	$: invalidOption = (!$variant && $price === 0) || stock === 0;
</script>

<div class="relative flex min-h-fit w-screen flex-col md:flex-row">
	<div class="overflow-y-scroll md:w-2/5">
		{#each images as image, i}
			<img
				in:fade={{ duration: 300 }}
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
			<Labels labels={$labels} />
			<h1 class="font-libre text-3xl font-bold antialiased sm:text-4xl md:text-5xl lg:text-6xl">
				{data.title?.toLowerCase() || 'untitled'}
			</h1>
			<h2 class="text-xl font-light sm:text-2xl md:text-3xl lg:text-4xl">
				{#if $salePrice}
					$<span class="line-through">{$price}</span>
					<span class="ml-2">{$salePrice}</span>
				{:else if invalidOption}
					<span class="text-red-500">unavailable</span>
				{:else}
					${$price}
				{/if}
			</h2>
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
							update={updateQuantity}
							max={stock}
						/>
					</div>
				</div>
				<Line />
			</div>
			<div class="flex">
				<button 
					disabled={invalidOption || stock === 0 || loading}
					class={`
						w-full bg-brown text-light py-4 rounded-full mt-4 
						transition-colors duration-300 hover:bg-light-brown
						${invalidOption ? 'bg-light-brown cursor-not-allowed ho' : ''}
					`} 
					on:click={handleAddToCart}
				>
					{#if invalidOption}
						unavailable
					{:else if stock === 0}
						out of stock
					{:else if loading}
						loading...
					{:else}
						add to cart
					{/if}
				</button>
			</div>
			<p class="pb-12">{data.description?.toLowerCase()}</p>
		</div>
	</div>
</div>
