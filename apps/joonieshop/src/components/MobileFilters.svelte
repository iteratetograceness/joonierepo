<script lang="ts">
    import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Icons from "./Icons.svelte";

    export let filters: string[] = [];
    export let filter: string;
    export let onClick: (value: string) => void;

    let index = 0;
    let showDialog = false;

    const updateFilter = (value: string, i: number) => {
        filter = value;
        index = i;
        closeDialog();
        onClick(value);
    };

    const openDialog = () => showDialog = true;

    const closeDialog = () => showDialog = false;
</script>

<section class="flex py-4">
    <button on:click={openDialog} class="flex items-center gap-2">
        <p>{filter.toLowerCase()}</p>
        <Icons type="mobile-dropdown" />
    </button>
    {#if showDialog}
        <div class="fixed inset-0 bg-black bg-opacity-25 z-50" transition:fade={{ duration: 300 }}/>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="fixed inset-0 flex items-end justify-center z-50" on:click={closeDialog}>
            <div 
                class="relative flex flex-col w-screen bg-brown text-light rounded-t-3xl p-9 pb-20"
                transition:slide={{ 
                    duration: 500, 
                    easing: quintOut, 
                    delay: 100 
                }}
            >
                <button class="self-end mb-9" on:click={closeDialog}>
                    <Icons type="close" />
                </button>
                {#each filters as value, i (i)}
                    <button
                        class:active={filter === value}
                        class="px-4 py-2 mb-4 rounded-3xl hover:bg-dark-brown"
                        on:click={() => updateFilter(value, i)}
                    >
                        {value.toLowerCase()}
                    </button>
                {/each}
            </div>
        </div>
    {/if}
</section>
