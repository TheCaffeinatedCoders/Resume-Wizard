<script lang="ts">
	import { currentUser, pb } from '$lib/pocketbase';
	import UserInfo from '$lib/components/UserInfo.svelte';

	let username: string;
	let password: string;
    let error: string;

	async function login() {
		// TODO: Figure out to login with Google or Github button, not username/password
        try {
            await pb.collection('users').authWithPassword(username, password);
            error = "";
        } catch (e) {
            console.error(e);
            // @ts-ignore
            error = JSON.stringify(e.data);
        }
	}

	async function signUp() {
		try {
            // Put data into a const object
			const data = {
				username,
				password,
                passwordConfirm: password
			};
            // const createdUser is the user that is created with the data
			const createdUser = await pb.collection('users').create(data);
			await login();
            error = "";
		} catch (e) {
            // TODO: Handle error
			console.error(e);
            // @ts-ignore
            error = JSON.stringify(e.data);
		}
	}

    function signOut() {
        pb.authStore.clear();
    }
</script>

{#if $currentUser}
	<h1>Welcome, {$currentUser.username}!</h1>
    <button on:click={signOut}>Sign Out</button>
	<UserInfo />
{:else}
	<h1>Welcome, Guest!</h1>
	<form on:submit|preventDefault>
		<input bind:value={username} placeholder="Username" type="text" />
		<input bind:value={password} placeholder="Password" type="password" />
	</form>
	<div class="login_buttons">
		<button on:click={signUp}>Sign Up</button>
		<button on:click={login}>Login</button>
	</div>
{/if}
<!-- If errror -->
{#if error}
    <p>{error}</p>
{/if}

<style>
	.login_buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 1rem;
		gap: 2rem;
	}
</style>