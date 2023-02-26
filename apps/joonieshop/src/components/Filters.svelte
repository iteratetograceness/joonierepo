<script lang="ts">
	import { getProductTypes, productTypes } from "$stores/products";
	import Button from "./Button.svelte";
	import { fade } from 'svelte/transition';
    import { backInOut } from 'svelte/easing';
    import { onMount } from "svelte";

    export let filter = 'All';
    let animate = false;

    onMount(() => {
        animate = true;
    })

    const getTypes = async () => {
        await getProductTypes();
    };

    getTypes();

    const setType = (type: string) => {
        filter = type;
    };

    $: allTypes = ['All', ...$productTypes];

</script>

<div class="flex flex-wrap h-10 gap-1">
    {#if animate}
        {#each allTypes as product_type, i (i)}
            <div transition:fade={{ duration: 1200, delay: 100 * i, easing: backInOut }}>
                <Button on:click={() => setType(product_type)}>{product_type}</Button>
            </div>
        {/each}
    {/if}
</div>