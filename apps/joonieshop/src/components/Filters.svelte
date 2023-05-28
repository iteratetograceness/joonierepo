<script lang="ts">
	import { onMount } from 'svelte';

	export let filters: string[] = [];
	export let filter: string;
	export let onClick: (value: string) => void = () => {};

	let mounted = false;
	let activeElement: HTMLDivElement | undefined;
	let index = 0;

	const buttonElements = filters.map((_) => {
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

<section class="relative flex py-4">
	<div class="no-scrollbar relative inset-auto flex w-screen snap-x overflow-x-auto md:w-full md:px-1">
		<div
			bind:this={activeElement}
			class={`
            -z-1 absolute rounded-3xl border-[1px] border-brown 
            transition-filters duration-300 will-change-filters ${!mounted ? 'opacity-0' : ''}
        `}
		/>
		{#each filters as value, i (i)}
			<button
				bind:this={buttonElements[i]}
				class:active={filter === value}
				class="min-w-max snap-center px-4 py-2"
				on:click={() => updateFilter(value, i)}
			>
				{value.toLowerCase()}
			</button>
		{/each}
	</div>
</section>

<svelte:window on:resize={() => reposition(buttonElements[index], activeElement)} />
