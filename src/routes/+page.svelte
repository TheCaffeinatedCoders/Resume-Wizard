<script lang="ts">
	import { currentUser } from '$lib/pocketbase';

	import Mainpage from '$lib/components/Mainpage.svelte';
	import Login from '$lib/components/Login.svelte';

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

		@apply bg-surface-50-900-token;

		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-500) / 0.33) 0px,
				transparent 50%
			),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
</style>
