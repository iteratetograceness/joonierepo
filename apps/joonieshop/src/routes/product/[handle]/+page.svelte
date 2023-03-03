<script lang="ts">
    import type { PageData } from './$types';
    import { cartQuantity } from '$stores/cart';

    export let data: PageData;
    $: images = data.images || [];
    let currentImage = 0;
    let content: HTMLDivElement;
</script>

<div class="relative flex flex-col w-screen min-h-screen overflow-scroll h-fit md:flex-row scrollbar-hide overscroll-contain" on:scroll={() => console.log(content.scrollHeight)}>
    <div class="w-screen h-screen md:w-1/2" >
        {#each images as image, i}
            <img class={`${currentImage === i ? '' : 'hidden'} md:block`} src={image.url} alt={`${i+1} of ${images.length}`} />
        {/each}
        <div class="flex h-32 md:hidden">
            {#each images as image, i}
                <button on:click={() => currentImage = i}>
                    <img class={`h-full ${currentImage !== i ? 'opacity-50' : ''}`} src={image.url} alt={`Click to view image ${i+1} of ${images.length}`} />
                </button>
            {/each}
        </div>
    </div>

    <div class="sticky top-0 flex flex-col p-4 w-screens md:w-1/2" bind:this={content}>
        <a href="/cart" class="self-end">{`Cart (${$cartQuantity})`}</a>
        <!-- Pills for collections / sale -->
    </div>
</div>

<style>
    /* For Webkit-based browsers (Chrome, Safari and Opera) */
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }

    /* For IE, Edge and Firefox */
    .scrollbar-hide {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>