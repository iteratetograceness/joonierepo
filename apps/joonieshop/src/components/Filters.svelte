<script lang="ts">
	import { onMount } from "svelte";

    export let filters: string[] = [];
    export let filter: string;
    export let onClick: (value: string) => void = () => {};

    let mounted = false;
    let activeElement: HTMLDivElement | undefined;
    let index = 0;

    const buttonElements = filters.map(_ => {
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

    const updateFilter = (value: string, i: number) => {
        reposition(buttonElements[i], activeElement);
        filter = value;
        index = i;
        onClick(value);
    };
</script>

<section class="flex relative py-4">
    <div 
        class="inset-auto snap-x flex w-screen md:w-auto relative overflow-x-auto no-scrollbar" 
    >
        <div bind:this={activeElement} class={`
            absolute border-[1px] border-brown rounded-3xl will-change-filters 
            transition-filters duration-300 -z-1 ${!mounted ? 'opacity-0' : ''}
        `} />
        {#each filters as value, i (i)}
            <button 
                bind:this={buttonElements[i]}
                class:active={filter === value} 
                class="px-4 py-2 min-w-max snap-center"
                on:click={() => updateFilter(value, i)}
            >
                {value.toLowerCase()}
            </button>
        {/each}
    </div>
</section>

<svelte:window on:resize={() => reposition(buttonElements[index], activeElement)} />
