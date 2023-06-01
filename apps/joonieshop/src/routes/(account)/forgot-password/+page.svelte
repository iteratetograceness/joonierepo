<script lang="ts">
    import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<section class="my-6 p-6 border-brown border-[1px] rounded-xl min-w-64 md:max-w-sm">
    <h1>request password reset</h1>
    <form method="POST" use:enhance>
        <label for="email">
            <p>email</p>
            <input id="email" name="email" type="text" required />
        </label>

        <button>submit</button>
    </form>

	{#if form?.invalid}
        <p class="error">
            {#if form?.email}
                email is invalid
            {:else if form?.message}
                {form.message}
            {:else}
                form is invalid
            {/if}
        </p>
    {/if}
        
    <div>
        <a href="/login">back to login</a>
        <a href="/signup">create an account</a>
    </div>
</section>