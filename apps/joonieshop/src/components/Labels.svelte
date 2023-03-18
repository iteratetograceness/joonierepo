<script lang="ts">
	import Pill from "./Pill.svelte";

    export let labels: string[] = [];
</script>

<div class="flex gap-1">
{#if labels.includes('featured')}<Pill text="featured" />{/if}
{#if labels.includes('sale')}<Pill text="sale" />{/if}
{#if labels.filter((label) => label !== 'featured' && label !== 'sale').length > 0}
    {#each labels.filter((label) => label !== 'featured' && label !== 'sale') as label}
    <Pill text={label} />
    {/each}
{/if}
</div>