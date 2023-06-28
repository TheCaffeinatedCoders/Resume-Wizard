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
	import { page } from '$app/stores'

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

<!-- <div class="flex" id="header">
	<aside
		class="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2"
		style="height: 100vh"
	>
		<a
			href="/home" 
			class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
			id="nav-text"
		>
			<span class="text-2xl"><i class="bx bx-home" /></span>
			<span>My Resumes</span>
		</a>

		<a
			href="/home/profile" 
			class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
			id="nav-text"
		>
			<span class="text-2xl"><i class="bx bx-user" /></span>
			<span>My Profile</span>
		</a>
	</aside>

	<slot />
</div> -->

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
				<p>
					<span
						class="text-3xl bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
					>
						Resume Wizard
					</span>
				</p>
			</div>
		</a>

		<nav class="list-nav p-4">
			<ul>
				<li><a href="/home">View Resumes</a></li>
				<!-- If CurrentUser -->
				{#if $currentUser}
					<li><a href="/profile">My Profile</a></li>
					<!-- <li>
						<button type="button" class="btn variant-filled" on:click={saveToPocketbase}>Save To Cloud</button
						>
						<button type="button" class="btn variant-filled" on:click={fetchFromPocketbase}>
							Fetch From Cloud</button
						>
					</li> -->
				{:else}
					<!-- <li><a href="/signup">Create Account</a></li> -->
					<li><a href="/login">Login</a></li>
				{/if}
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
