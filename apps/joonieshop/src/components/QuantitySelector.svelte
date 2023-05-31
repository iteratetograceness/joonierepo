<script lang="ts">
	import { onMount } from 'svelte';
	import Icons from './Icons.svelte';

	export let count = 1;
	export let increment: () => void;
	export let decrement: () => void;
	export let update: (quantity: number) => void;
	export let max = 100;
	export let focusInputOnMount = false;

	let input: HTMLInputElement;

	if (focusInputOnMount) {
		onMount(() => {
			input.focus();
		})
	}

	const handleInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const value = parseInt(target.value);

		if (value > max) {
			update(max);
			return;
		}

		if (value < 0) {
			update(0);
			return;
		}

		update(value);
	}

	function isNumberKey(evt: KeyboardEvent) {
		const charCode = (evt.which) ? evt.which : evt.keyCode
		if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;
		return true;
	}
</script>

<div class="flex items-center justify-center gap-4">
	<button
		class="flex h-8 w-8 items-center justify-center rounded-full border-[1px] border-brown disabled:opacity-25 disabled:hover:cursor-not-allowed"
		on:click={decrement}
		disabled={count === 0}
	>
		<Icons type="minus" />
	</button>
	<input 
		bind:this={input}
		class="w-12 text-center py-2" 
		on:input={handleInput}
		on:keypress={isNumberKey}
		value={count} 
		type="number" 
		min={0} 
		max={max}
	/>
	<button
		class="flex h-8 w-8 items-center justify-center rounded-full border-[1px] border-brown disabled:opacity-25 disabled:hover:cursor-not-allowed"
		on:click={increment}
		disabled={count === max}
	>
		<Icons type="plus" />
	</button>
</div>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>