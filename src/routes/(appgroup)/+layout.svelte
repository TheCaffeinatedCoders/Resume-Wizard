<script lang="ts">
	// import { currentUser, pb } from '$lib/pocketbase';
	// function signOut() {
	// 	pb.authStore.clear();
	// }
	// import Header from '$lib/components/Header.svelte';
	// import { AppShell } from '@skeletonlabs/skeleton';

	import { AppShell, LightSwitch, autoModeWatcher } from '@skeletonlabs/skeleton';
	import { DEBUG_resetResumeStore } from '$lib/resumeStore';
	import logo from '$lib/images/mainlogo.png';
	import { currentUser, fetchFromPocketbase, saveToPocketbase } from '$lib/pocketbase';
	import { page } from '$app/stores';

	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../../app.postcss';

	import { onMount } from 'svelte';
	// Call autoModeWatcher on component mount for light toggle
	onMount(() => {
		autoModeWatcher();
		// console.log('$page.url.pathname', $page.url.pathname);
	});
</script>



<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<AppShell slotSidebarleft="w-0 md:w-52 bg-surface-500/10">
	<svelte:fragment slot="sidebarLeft">
		<a href="/">
			<div>
				<div class="flex justify-center items-center">
					<img src={logo} alt="Logo" width="100" height="100" />
				</div>
			</div>
		</a>
		<p>
			<span
				class="ml-7 text-3xl bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent"
			>
				Resume Wizard
			</span>
		</p>


		<nav class="list-nav p-4">
			<ul>
				<li><a href="/home">View Resumes</a></li>
				<!-- If CurrentUser -->
				{#if $currentUser}
					<li><a href="/profile">My Profile</a></li>
					<!-- <li>
						<button type="button" class="btn variant-filled" on:click={saveToPocketbase}
							>Sync With Cloud</button
						>
					</li> -->
				{:else}
					<!-- <li><a href="/signup">Create Account</a></li> -->
					<li><a href="/login">Login</a></li>
				{/if}
				<li><a href="https://github.com/TheCaffeinatedCoders/Resume-Wizard"> Github page </a></li>
				<li><LightSwitch /></li>
				<!-- <li>
					<button type="button" class="btn variant-filled" on:click={DEBUG_resetResumeStore}
						>DEBUG: Clear Resume Store</button
					>
				</li> -->
			</ul>
		</nav>
	</svelte:fragment>

	<div class="container p-10 mx-auto">
		<slot />
	</div>
</AppShell>

<style>

</style>