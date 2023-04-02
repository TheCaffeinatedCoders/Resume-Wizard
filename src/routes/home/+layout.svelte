<script lang="ts">
	import { pb } from '$lib/pocketbase';
	function signOut() {
		pb.authStore.clear();
	}
	import logo from '$lib/images/mainlogo.png';
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<!-- <header class="header">
	<h1 class="header-title">Resume Wizard</h1>
	<nav>
		<a href="/home">Home</a>
		<a href="/home/collection">Collection</a>
		<a href="/home/edit">Edit</a>
		<button on:click={signOut}>Logout</button>
	</nav>
	<img class="header-logo" src={logo} alt="Logo" />
</header>
<div class="main"> -->

<AppShell>
	<svelte:fragment slot="header">
		<!-- <header class="header" style="background: linear-gradient(45deg, #0A58CA, #29A2C6);">
			<div class="logo-container">
				<a href="/home">
					<img src={logo} alt="Logo" />
				</a>
			</div>

			<div class="breadcrumb-container">
				<ol class="breadcrumb">
					<li class="crumb"><a href="/home/collection">Collection</a></li>
					<li class="crumb-separator" aria-hidden>/</li>
					<li class="crumb"><a href="/home/edit">Edit</a></li>
				</ol>
			</div>
		</header> -->

		<header>
			<nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
				<div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
					<a href="/home" class="flex items-center">
						<img src={logo} alt="Logo" width="100" height="100" />
						<h2>
							<span
								class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
								>Resume Wizard</span
							>
						</h2>
					</a>
					<div class="flex items-center lg:order-2">
						<a
							href="#"
							class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
							>Log in</a
						>
						<a
							href="#"
							class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
							>Get started</a
						>
						<button
							data-collapse-toggle="mobile-menu-2"
							type="button"
							class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="mobile-menu-2"
							aria-expanded="false"
						>
							<span class="sr-only">Open main menu</span>
							<svg
								class="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clip-rule="evenodd"
								/></svg
							>
							<svg
								class="hidden w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/></svg
							>
						</button>
					</div>
					<div
						class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
						id="mobile-menu-2"
					>
						<ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
							<li>
								<a
									href="/home/collection"
									class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
									aria-current="page">Collection</a
								>
							</li>
							<li>
								<a
									href="/home/edit"
									class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
									>Edit</a
								>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
</AppShell>

<style>
</style>
