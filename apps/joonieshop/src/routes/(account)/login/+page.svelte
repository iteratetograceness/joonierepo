<script lang="ts">
    import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<section class="my-6 p-6 border-brown border-[1px] rounded-xl min-w-64 md:max-w-sm">
    <h1>login</h1>
    <form method="POST" use:enhance>
        <label for="email">
            <p>email</p>
            <input id="email" name="email" type="email" required />
        </label>

        <label for="pw">
            <p>password</p>
            <input id="pw" name="password" type="password" value="" required/>
        </label>

        <button>login</button>
    </form>

	{#if form?.invalid}
        <p class="error">
            {#if form?.message}
                {form.message}
            {:else}
                form is invalid
            {/if}
        </p>
    {/if}
        
    <div>
        <a href="/forgot-password">forgot your password?</a>
        <a href="/signup">create an account</a>
    </div>
</section>