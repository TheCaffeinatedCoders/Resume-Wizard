<script lang="ts">
	import { currentUser } from '$lib/pocketbase';

	import Home from '$lib/components/Home.svelte';
	import Login from '$lib/components/Login.svelte';
	import Profile from '$lib/components/Profile.svelte';
</script>

<svelte:head>
	<title>Resume Wizard</title>
	<meta name="description" content="Whip up a resume with ease" />
</svelte:head>

<div class="homecontainer">
	{#if !$currentUser}
		<Home />
		<Login />
	{:else}
		<h1>Welcome, {$currentUser.username}!</h1>
		<Profile />
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
