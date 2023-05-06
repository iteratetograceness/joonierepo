<script>
	const placeholderProducts = Array(12);
	import { getRandomColor } from '$utils/common/getRandomColor';
</script>

<section
	class="grid-cols-[minmax(1fr, 500px)] -mx-6 grid w-full gap-8 py-8 md:m-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
>
	{#each placeholderProducts as _}
		<div class="w-full animate-pulse">
			<div
				class={`aspect-square h-auto w-screen md:w-full md:rounded-3xl ${getRandomColor([
					'bg-dark',
					'bg-light',
					'bg-light-blue'
				])}`}
			/>
			<div class="flex w-full justify-between px-2 pt-3 md:px-0">
				<p class="w-24 rounded-md bg-light-blue" />
				<p class="relative flex items-center gap-1">
					$<span class="inline-block h-full w-10 rounded-md bg-light-blue" />
				</p>
			</div>
		</div>
	{/each}
</section>
