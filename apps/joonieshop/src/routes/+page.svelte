<script lang="ts">
	import type { PageData } from './$types';
	import Filters from '$components/Filters.svelte';
	import ProductGrid from '$components/ProductGrid/ProductGrid.svelte';
	import type { Product } from '$utils/medusa/types';
	import ProductGridSkeleton from '$components/ProductGrid/ProductGridSkeleton.svelte';
	import Line from '$components/Line.svelte';

	export let data: PageData;

	let filter = 'all';
	$: filters = Array.isArray(data.filters)
		? ['all', ...data.filters.map((filter) => filter.value)]
		: ['all'];

	const filterProductsByCategory = (unfilteredProducts: Product[], category = 'all') => {
		const caseInsensitiveCategory = category.toLowerCase();

		return unfilteredProducts.map((p) => {
			const caseInsensitiveProductType = p.type?.value.toLowerCase();
			const show =
				caseInsensitiveCategory === 'all'
					? true
					: caseInsensitiveProductType === caseInsensitiveCategory;
			p.metadata = { show };
			return p;
		});
	};
</script>

<svelte:head>
	<title>joonieshop</title>
</svelte:head>

<main>
	<section class="flex min-h-screen flex-col">
		<div class="py-6">
			<Line />
			<Filters bind:filter {filters} />
			<Line />
		</div>
		{#if !data}
			<ProductGridSkeleton />
		{:else if data.products.length === 0}
			<p>No products available.</p>
		{:else}
			<ProductGrid products={filterProductsByCategory(data.products, filter)} />
		{/if}
	</section>
</main>
