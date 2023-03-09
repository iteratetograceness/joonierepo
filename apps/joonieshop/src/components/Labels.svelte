<script lang="ts">
    export let labels: string[] = [];
    export let classname: string = '';
</script>

<div class="flex gap-2">
{#if labels.includes('featured')}<span class={classname}>Featured</span>{/if}
{#if labels.includes('sale')}<span class={classname}>Sale</span>{/if}
{#if labels.filter((label) => label !== 'featured' && label !== 'sale').length > 0}
    {#each labels.filter((label) => label !== 'featured' && label !== 'sale') as label}
        <span class={classname}>{label}</span>
    {/each}
{/if}
</div>