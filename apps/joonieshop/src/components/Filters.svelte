<script lang="ts">
	import Button from "./Button.svelte";
	import type { ProductType } from "$utils/medusa/types";
	import { getAnimationDelay } from "$utils/common/getDelay";

    export let filters: ProductType[] = [];
    export let filter = 'All';

    const setType = (type: string) => {
        filter = type;
    };

    $: allTypes = [{ value: 'All', metadata: {} }, ...filters];

</script>

<div class="flex flex-wrap h-10 gap-1">
    {#each allTypes as { value }, i (i)}
        <div class:active={filter === value} class={`animate-fadeIn ${getAnimationDelay(i)} rounded-3xl current:bg-dark-blue current:text-light transition-color duration-300`}>
            <Button on:click={() => setType(value)}>{value}</Button>
        </div>
    {/each}
</div>