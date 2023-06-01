<script lang="ts">
    import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

    export let form: ActionData;

    let password: string | undefined = undefined;
    let confirmPassword: string | undefined = undefined;

    const passwordConfirmationVaidator = (pw: string | undefined, c: string | undefined) => {
        if (pw && c && pw !== c) return false;        
        return true;
    }

    $: passwordConfirmation = passwordConfirmationVaidator(password, confirmPassword);
</script>

<section class="my-6 p-6 border-brown border-[1px] rounded-xl min-w-64 md:max-w-sm">
    <h1>create an account</h1>
    <form method="POST" use:enhance>
        <label for="first_name">
            <p>first name</p>
            <input id="first_name" name="first name" type="text" required />
        </label>

        <label for="last_name">
            <p>last name</p>
            <input id="last_name" name="last name" type="text" required />
        </label>

        <label for="email">
            <p>email</p>
            <input id="email" name="email" type="email" required />
        </label>

        <label for="phone">
            <p>phone (optional)</p>
            <input id="phone" name="phone" type="phone" />
        </label>

        <label for="pw">
            <p>password</p>
            <input bind:value={password} id="pw" name="password" type="password" required/>
        </label>

        <label for="confirm_pw">
            <p>
                password confirmation 
                <span class="error">{passwordConfirmation ? '' : 'womp'}</span>
            </p>
            <input 
                bind:value={confirmPassword} 
                id="confirm_pw" 
                name="confirm password" 
                type="password" 
                required
            />
        </label>

        <button disabled={form?.invalid}>submit</button>
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