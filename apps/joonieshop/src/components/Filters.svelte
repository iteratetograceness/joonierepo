<script lang="ts">
	import type { ProductType } from "$utils/medusa/types";
	import { onMount } from "svelte";
	import Line from "./Line.svelte";

    export let filters: ProductType[] = [];
    export let filter = 'all';

    let activeElement: HTMLDivElement | undefined;
    let index = 0;
    const buttonElements = filters.map(filter => {
        let elem: HTMLButtonElement | undefined;
        return elem;
    });

    const reposition = (button?: HTMLButtonElement, elem?: HTMLDivElement) => {
        if (button && elem) {
            elem.style.left = `${button.offsetLeft}px`;
            elem.style.height = `${button.offsetHeight}px`;
            elem.style.width = `${button.offsetWidth}px`;
        }
    };

    onMount(() => {
        reposition(buttonElements[index], activeElement);
    });

    const setType = (type: string, i: number) => {
        filter = type;
        index = i;
        reposition(buttonElements[i], activeElement);
    };

</script>

<section class="py-10 -mx-6 md:mx-0">
    <Line />
    <div class="relative flex w-full gap-4 py-4 overflow-x-auto will-change-scroll min-h-max px-7 snap-x md:px-0 no-scrollbar">
        <div bind:this={activeElement} class="absolute border-[1px] border-brown rounded-3xl will-change-filters transition-filters duration-300" />
        {#each filters as { value }, i (i)}
            <button 
                bind:this={buttonElements[i]}
                class:active={filter === value} 
                class="px-4 py-2 min-w-max snap-center"
                on:click={() => setType(value, i)}
            >
                {value.toLowerCase()}
            </button>
        {/each}
    </div>
    <Line />
</section>

<svelte:window on:resize={() => reposition(buttonElements[index], activeElement)} />
