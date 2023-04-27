<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';

	import Mainpage from '$lib/components/Mainpage.svelte';
	import Login from '$lib/components/Login.svelte';

	import Profile from '$lib/components/Profile.svelte';

	// Broken Google Button Signin Function
	// async function handleGoogleSignIn() {
	// 	// // Add sign in logic here
	// 	// console.log('Google sign in');
	// 	// // Use fetch to call /api/oauth2-redirect POST function
	// 	// const googleAuthData = await fetch('/api/oauth2-redirect', {
	// 	// 	method: 'POST',
	// 	// 	headers: {
	// 	// 		'Content-Type': 'application/json'
	// 	// 	},
	// 	// 	body: JSON.stringify({ provider: 'google' })
	// 	// })
	// 	// // .then((res) => console.log(res.json())); 
	// 	// console.log("Google auth data:", googleAuthData);
	// 	const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
	// }
</script>

<svelte:head>
	<title>Resume Wizard</title>
	<meta name="description" content="Whip up a resume with ease" />
</svelte:head>

<div class="homecontainer">
	{#if !$currentUser}
		<Mainpage />
		<Login />
		<!-- Broken Google Button -->
		<!-- <button class="border border-green-300 rounded-md" on:click={handleGoogleSignIn}>Google Sign In!</button> -->
	{:else}
	
		<!-- Dawn's code area -->

		<h1>main page but not sure what to put it</h1>
		<!-- <Profile /> -->
	{/if}
</div>

<style>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';

	.homecontainer {
		/* Body stylings for background color and page size at src/routes/styles.css
			SOMEHOW NEED THIS TO MAKE <MAINPAGE> and <LOGIN> to be centered
		*/
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
