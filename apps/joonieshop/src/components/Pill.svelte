<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let text: string = '';
	export let isButton = false;

	const dispatch = createEventDispatcher();
	function handleClick() {
		dispatch('click');
	}
</script>

{#if isButton}
	<button class="rounded-full bg-brown px-3 py-1 font-light tracking-wide text-light" on:click={handleClick}>{text}</button>
{:else}
	<span class="rounded-full bg-brown px-3 py-1 font-light tracking-wide text-light">{text}</span>
{/if}
