<script>
	import Icons from "./Icons.svelte";

    export let count = 1;

    const decrementCount = () => {
        if (count > 1) {
            count--;
        }
    }

    const incrementCount = () => {
        count++;
    }
</script>

<div class="flex items-center justify-center gap-4">
    <button class="flex justify-center items-center border-[1px] rounded-full w-8 h-8 border-brown disabled:opacity-25 disabled:hover:cursor-not-allowed" on:click={decrementCount} disabled={count === 1}>
        <Icons type="minus"/>
    </button>
    <p>{count}</p>
    <button class="flex justify-center items-center border-[1px] rounded-full w-8 h-8 border-brown" on:click={incrementCount}>
        <Icons type="plus"/>
    </button>
</div>