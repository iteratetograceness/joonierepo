<script lang="ts">
	import { goto } from '$app/navigation';
	import Pill from './Pill.svelte';

	export let labels: string[] = [];

	const goBack = () => {
		goto('/');
	}
</script>

<div class="flex gap-1">
	<Pill text="< return to home" on:click={goBack} isButton />
	{#if labels.includes('featured')}<Pill text="featured" />{/if}
	{#if labels.includes('sale')}<Pill text="sale" />{/if}
	{#if labels.filter((label) => label !== 'featured' && label !== 'sale').length > 0}
		{#each labels.filter((label) => label !== 'featured' && label !== 'sale') as label}
			<Pill text={label} />
		{/each}
	{/if}
</div>
