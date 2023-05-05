<script lang="ts">
	// import { currentUser, pb } from '$lib/pocketbase';
	// function signOut() {
	// 	pb.authStore.clear();
	// }
	// import Header from '$lib/components/Header.svelte';
	// import { AppShell } from '@skeletonlabs/skeleton';

	import { AppShell } from "@skeletonlabs/skeleton";
	import logo from '$lib/images/mainlogo.png';



	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../../app.postcss';
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

<AppShell slotSidebarleft="w-0 md:w-52 bg-surface-500/10">



	<svelte:fragment slot="sidebarLeft">
		<div>
			<div class="flex justify-center items-center">
				<img src={logo} alt="Logo" width="100" height="100" />
			</div>
			<p>
				<span
					class="text-3xl bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
					>Resume Wizard</span
				>
			</p>	
		</div>



		<nav class="list-nav p-4">
			<ul>
				<li><a href="/home">My resume</a></li>
				<li><a href="/home/profile">My Profile</a></li>
			</ul>
		</nav>
	</svelte:fragment>

	<div class="container p-10 mx-auto">
		<slot />
	</div>

</AppShell>



<style>
	#nav-text {
		text-decoration: none;
		color: white;
	}

	/* #main {
		padding: 2rem;
		height: 100vh; 
	 background-image: radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 1) 0px, transparent 50%),
			radial-gradient(at 80% 0%, hsla(189, 85%, 82%, 1) 0px, transparent 50%),
			radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%),
			radial-gradient(at 79% 50%, hsla(340, 28%, 82%, 1) 0px, transparent 50%),
			radial-gradient(at 0% 100%, hsla(14, 53%, 78%, 1) 0px, transparent 50%),
			radial-gradient(at 80% 100%, hsla(240, 62%, 76%, 1) 0px, transparent 50%),
			radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%);
	} */
</style>
