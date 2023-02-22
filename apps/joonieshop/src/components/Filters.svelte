<script>
	import { getProductTypes, productTypes } from "$stores/products";
	import { onMount } from "svelte";
	import Button from "./Button.svelte";

    // onMount(async () => {
    //     if (typeof window !== 'undefined') {
    //         await getProductTypes();
    //     }
    // });

    const TYPES = ['all'];

    // console.log('TYPES', TYPES);

    export let filter = 'all';
</script>

<div>
    {#each TYPES as product_type}
        <Button on:click={() => filter = product_type}>{product_type}</Button>
    {/each}
</div>