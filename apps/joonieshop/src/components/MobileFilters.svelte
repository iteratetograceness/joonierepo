<script lang="ts">
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Icons from './Icons.svelte';

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

	const openDialog = () => (showDialog = true);

	const closeDialog = () => (showDialog = false);
</script>

<section class="flex py-4">
	<button on:click={openDialog} class="flex items-center gap-2">
		<p>{filter.toLowerCase()}</p>
		<Icons type="mobile-dropdown" />
	</button>
	{#if showDialog}
		<div class="fixed inset-0 z-50 bg-black bg-opacity-25" transition:fade={{ duration: 300 }} />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="fixed inset-0 z-50 flex items-end justify-center" on:click={closeDialog}>
			<div
				class="relative flex w-screen flex-col rounded-t-3xl bg-brown p-9 pb-20 text-light"
				transition:slide={{
					duration: 500,
					easing: quintOut,
					delay: 100
				}}
			>
				<button class="mb-9 self-end rounded-full p-2 hover:bg-dark-brown transition-colors duration-300" on:click={closeDialog}>
					<Icons type="close" />
				</button>
				{#each filters as value, i (i)}
					<button
						class:active={filter === value}
						class="mb-4 rounded-3xl px-4 py-2 hover:bg-dark-brown transition-colors duration-300"
						on:click={() => updateFilter(value, i)}
					>
						{value.toLowerCase()}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</section>
