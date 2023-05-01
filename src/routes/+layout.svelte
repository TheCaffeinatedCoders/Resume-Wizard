<script lang="ts">
	import { currentUser, pb } from '$lib/pocketbase';
	function signOut() {
		pb.authStore.clear();
	}

	import Header from '$lib/components/Header.svelte';

	import { AppShell } from '@skeletonlabs/skeleton';

	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
</script>

<AppShell>
	<svelte:fragment slot="header">
		{#if $currentUser}
			<Header />
		{/if}
	</svelte:fragment>

	<!-- Router Slot -->
	<div id="main">
		<slot />
	</div>
	<!-- ---- / ---- -->
</AppShell>

<style>
	#main {
		padding: 2rem;
		/* height: 100vh; */
		/* background-image: radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 1) 0px, transparent 50%),
			radial-gradient(at 80% 0%, hsla(189, 85%, 82%, 1) 0px, transparent 50%),
			radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%),
			radial-gradient(at 79% 50%, hsla(340, 28%, 82%, 1) 0px, transparent 50%),
			radial-gradient(at 0% 100%, hsla(14, 53%, 78%, 1) 0px, transparent 50%),
			radial-gradient(at 80% 100%, hsla(240, 62%, 76%, 1) 0px, transparent 50%),
			radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%); */
	}
</style>
