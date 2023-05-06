<script lang="ts">
	import MediaQuery from "./MediaQuery.svelte";
	import type { ProductOption } from "$utils/medusa/types";
	import { isUnique } from "$utils/common/is-unique";
	import Filters from "./Filters.svelte";
	import MobileFilters from "./MobileFilters.svelte";

    export let option: ProductOption;
    export let current: string;
    export let updateOptions: (update: Record<string, string>) => void;

    $: filteredOptions = option.values.map(v => v.value).filter(isUnique);

    const updateOption = (value: string) => {
        updateOptions({ [option.id]: value });
    };
</script>

<div class="flex items-center justify-between gap-2">
    <h3 class="text-lg font-light">{option.title.toLowerCase()}</h3>
    <MediaQuery query="(min-width: 768px)" let:matches>
        {#if matches}
            <Filters filter={current} filters={filteredOptions} onClick={updateOption} />
        {:else}
            <MobileFilters
                filter={current} 
                filters={filteredOptions} 
                onClick={updateOption}
            />
        {/if}
    </MediaQuery>
</div>