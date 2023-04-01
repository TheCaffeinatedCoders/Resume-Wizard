<script lang="ts">
	import { currentUser } from '$lib/pocketbase';

	import Mainpage from '$lib/components/Mainpage.svelte';
	import Login from '$lib/components/Login.svelte';

	import { goto } from '$app/navigation';


	import Profile from '$lib/components/Profile.svelte';
</script>

<svelte:head>
	<title>Resume Wizard</title>
	<meta name="description" content="Whip up a resume with ease" />
</svelte:head>

<div class="homecontainer">
	{#if !$currentUser}
		<Mainpage />
		<Login />
	{:else}
		NavigationPreloadManager()
		<h1>Welcome, {$currentUser.username}!</h1>
		<a href="/home">click me to go homepage</a>


		<!-- <Profile /> -->
	{/if}
</div>

<style>
	.homecontainer {
		/* Body stylings for background color and page size at src/routes/styles.css */
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
