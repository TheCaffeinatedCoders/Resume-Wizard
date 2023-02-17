<script>
	import { currentUser, pb } from '$lib/pocketbase';

    // For some reason TypeScript syntax didn't work here
    // TODO: Figure out why
	/**
	 * @type {string}
	 */
	let username;
	/**
	 * @type {string}
	 */
	let password;
    /**
	 * @type {string}
	 */
    let error;

	async function login() {
		// TODO: Figure out to login with Google or Github button, not username/password
        try {
            await pb.collection('users').authWithPassword(username, password);
            error = "";
        } catch (e) {
            console.error(e);
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
{:else}
	<h1>Welcome, Guest!</h1>
	<form on:submit|preventDefault>
		<input bind:value={username} placeholder="Username" type="text" />
		<input bind:value={password} placeholder="Password" type="password" />
	</form>
	<button on:click={signUp}>Sign Up</button>
	<button on:click={login}>Login</button>
{/if}
<!-- If errror -->
{#if error}
    <p>{error}</p>
{/if}