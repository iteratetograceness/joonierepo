<script lang="ts">
	import { onMount } from "svelte";
	import MediaQuery from "./MediaQuery.svelte";

    interface Option {
        value: string;
    }

    export let type: string | null = null;
    export let filters: Option[] = [];
    export let filter: string;
    export let mobileVersion = false;

    let mounted = false;
    let activeElement: HTMLDivElement | undefined;
    let index = 0;
    const buttonElements = filters.map(_ => {
        let elem: HTMLButtonElement | undefined;
        return elem;
    });

    let showMobileDialog = false;
    const toggleMobileDialog = () => {
        showMobileDialog = !showMobileDialog;
    };

    const reposition = (button?: HTMLButtonElement, elem?: HTMLDivElement) => {
        if (showMobileDialog) showMobileDialog = false;
        if (button && elem) {
            elem.style.left = `${button.offsetLeft}px`;
            elem.style.height = `${button.offsetHeight}px`;
            elem.style.width = `${button.offsetWidth}px`;
        }
    };

    onMount(() => {
        filter = filters[0].value;
        reposition(buttonElements[index], activeElement);
        mounted = true;
    });

    const setType = (type: string, i: number) => {
        filter = type;
        index = i;
        reposition(buttonElements[i], activeElement);
    };

</script>

<!-- 
    flex no-scrollbar
    Default: 
     w-full gap-4 py-4 will-change-scroll min-h-max px-7 md:px-0 
 -->

<section class="mx-0">
    <div class={`${mobileVersion ? 'block md:flex md:relative' : 'flex relative'} py-4`}>
        <div bind:this={activeElement} class={`
            ${mobileVersion ? 'hidden md:block md:absolute' : 'absolute'} 
            border-[1px] border-brown rounded-3xl will-change-filters 
            transition-filters duration-300 
            ${!mounted ? 'opacity-0' : ''}
        `} />
        <div class={`
            ${!mobileVersion? 'overflow-x-auto relative snap-x gap-4 py-4 px-7 md:px-0 min-h-max' : `
                text-light md:text-brown left-0 bottom-0 md:inset-auto
                will-change-height transition-height duration-500 md:snap-x
                flex-col md:flex-row bg-brown md:bg-transparent w-screen md:w-auto
                absolute md:relative md:h-auto md:overflow-x-auto min-h-0 box-border
                ${showMobileDialog ? 'h-[80vh]' : 'h-0'}
            `}
            flex no-scrollbar md:will-change-filters      
        `}>
            {#if !mobileVersion}
                <div bind:this={activeElement} class={`
                    ${mobileVersion ? 'hidden md:absolute' : 'absolute'} 
                    border-[1px] border-brown rounded-3xl will-change-filters 
                    transition-filters duration-300 
                    ${!mounted ? 'opacity-0' : ''}
                `} />
            {/if}
            {#if mobileVersion && showMobileDialog}
                <div class="flex justify-between p-8 md:hidden">
                    <h3>{type ? type : null}</h3>
                    <button on:click={toggleMobileDialog}>close</button>
                </div>
            {/if}
            {#each filters as { value }, i (i)}
                <button 
                    bind:this={buttonElements[i]}
                    class:active={filter === value} 
                    class={`px-4 py-2 min-w-max snap-center ${mobileVersion ? `${showMobileDialog ? 'block' : 'hidden'}` : ''}`}
                    on:click={() => setType(value, i)}
                >
                    {value.toLowerCase()}
                </button>
            {/each}
        </div>
        {#if mobileVersion}
            <button on:click={toggleMobileDialog} class="flex items-center md:hidden">
                <p>{filter.toLowerCase()} >></p>
            </button>
        {/if}
    </div>
</section>

<svelte:window on:resize={() => reposition(buttonElements[index], activeElement)} />
