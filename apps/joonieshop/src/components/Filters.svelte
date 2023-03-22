<script lang="ts">
	import { onMount } from "svelte";

    interface Option {
        value: string;
    }

    export let filters: Option[] = [];
    export let filter: string;

    let mounted = false;
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
        mounted = true;
    });

    const setType = (type: string, i: number) => {
        filter = type;
        index = i;
        reposition(buttonElements[i], activeElement);
    };

</script>

<section class="-mx-6 md:mx-0">
    <div class="relative flex w-full gap-4 py-4 overflow-x-auto will-change-scroll min-h-max px-7 snap-x md:px-0 no-scrollbar">
        <div bind:this={activeElement} class={`absolute border-[1px] border-brown rounded-3xl will-change-filters transition-filters duration-300 ${!mounted ? 'opacity-0' : ''}`} />
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
</section>

<svelte:window on:resize={() => reposition(buttonElements[index], activeElement)} />
