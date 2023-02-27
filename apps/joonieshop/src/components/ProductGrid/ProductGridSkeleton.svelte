<script>    
	const placeholderProducts = Array(12);
    import { getRandomColor } from '$utils/common/getRandomColor';
</script>

<section class="w-full grid grid-cols-[minmax(1fr, 500px)] gap-8 py-10 -mx-4 md:m-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each placeholderProducts as _}
        <div class="w-full animate-pulse">
            <div class={`w-full h-auto aspect-image ${getRandomColor(['bg-dark', 'bg-light', 'bg-light-blue'])}`} />
            <div class="flex justify-between w-full px-2 pt-3 md:px-0">
                <p class="w-24 rounded-md bg-light-blue"/>
                <p class="relative flex items-center gap-1">$<span class="inline-block w-10 h-full rounded-md bg-light-blue"/></p>
            </div> 
        </div>
    {/each}
</section>