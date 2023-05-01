<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';

	import Mainpage from '$lib/components/Mainpage.svelte';
	import Login from '$lib/components/Login.svelte';

	import Profile from '$lib/components/Profile.svelte';

	async function handleGoogleSignIn() {
		// Add sign in logic here
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
	}
	
</script>

<svelte:head>
	<title>Resume Wizard</title>
	<meta name="description" content="Whip up a resume with ease" />
</svelte:head>

<div class="homecontainer">
	{#if !$currentUser}
		<Mainpage />
		<Login />
		<button class="border border-green-300 rounded-md" on:click={handleGoogleSignIn}>Google Sign In!</button>
	{:else}
	
		<!-- Dawn's code area -->

		<h1>main page but not sure what to put it</h1>
		<!-- <Profile /> -->
	{/if}
</div>

<style>
	.homecontainer {
		/* Body stylings for background color and page size at src/routes/styles.css
			SOMEHOW NEED THIS TO MAKE <MAINPAGE> and <LOGIN> to be centered
		*/
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
