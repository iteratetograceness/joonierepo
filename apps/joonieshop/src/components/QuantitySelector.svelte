<script lang="ts">
	import Icons from "./Icons.svelte";

    export let count = 1;
    export let increment: () => void;
    export let decrement: () => void;
</script>

<div class="flex items-center justify-center gap-4">
    <button class="flex justify-center items-center border-[1px] rounded-full w-8 h-8 border-brown disabled:opacity-25 disabled:hover:cursor-not-allowed" on:click={decrement} disabled={count === 1}>
        <Icons type="minus"/>
    </button>
    <p>{count}</p>
    <button class="flex justify-center items-center border-[1px] rounded-full w-8 h-8 border-brown" on:click={increment}>
        <Icons type="plus"/>
    </button>
</div>