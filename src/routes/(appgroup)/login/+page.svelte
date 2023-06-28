<script lang="ts">
	import { currentUser, pb } from '$lib/pocketbase';
	// import UserInfo from '$lib/components/UserInfo.svelte';
	import { goto } from '$app/navigation';

	let email: string = '';
	let password: string = '';
	let error: string = '';

	// On mount, if currentUser is set, redirect to the '/profile' route
	onMount(() => {
		if ($currentUser) {
			goto('/profile');
		}
	});

	async function login() {
		try {
			const authData = await pb.collection('users').authWithPassword(email, password);
			error = '';

			// Navigate to the '/home' route
			goto('/home');
		} catch (e: any) {
			if (e.status === 400 || e.status === 405) {
				// Display an error message to the user
				error = 'Invalid username or password';
				console.log('Invalid username or password');
			} else {
				console.error(e);
				// @ts-ignore
				error = JSON.stringify(e.data);
			}
		}
	}


	function signOut() {
		pb.authStore.clear();
	}

	async function handleGoogleSignIn() {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
		const updateOAuthFlag = await pb
			.collection('users')
			.update(authData.record.id, { isOAuth: true });
		goto('/home'); // Add this line to redirect to the '/home' route
	}
	async function handleDiscordSignIn() {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
		const updateOAuthFlag = await pb
			.collection('users')
			.update(authData.record.id, { isOAuth: true });
		goto('/home'); 
	}
	async function handleGithubSignIn() {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'github' });
		const updateOAuthFlag = await pb
			.collection('users')
			.update(authData.record.id, { isOAuth: true });
		goto('/home'); 
	}

	// Your selected Skeleton theme:
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	// import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	// import '../../app.postcss';
	import { onMount } from 'svelte';
</script>

<svelte:head>
	<!-- <link rel="stylesheet" href="/tutorial/dark-theme.css"> -->
</svelte:head>

<div class="loginMain min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<h2 class="mt-6 text-center text-3xl font-extrabold">Sign in to your account</h2>
		<p class="mt-2 text-center text-sm max-w">
			Or
			<a href="/signup" class="font-medium text-blue-600 hover:text-blue-500">
				create an account
			</a>
		</p>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
			<form class="space-y-6">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
					<div class="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Enter your email address"
							bind:value={email}
						/>
					</div>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
					<div class="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Enter your password"
							bind:value={password}
						/>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="remember_me"
							name="remember_me"
							type="checkbox"
							class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
						/>
						<label for="remember_me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
					</div>

					<div class="text-sm">
						<a href="#" class="font-medium text-blue-600 hover:text-blue-500">
							Forgot your password?
						</a>
					</div>
				</div>

				<div>
					<button
						on:click={login}
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Sign in
					</button>
					<!-- If errror -->
					<br />
					{#if error}
						<p class="px-2 bg-red-400 text-black">{error}</p>
					{/if}
				</div>
			</form>
			<div class="mt-6">
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<div class="w-full border-t border-gray-300" />
					</div>
					<div class="relative flex justify-center text-sm">
						<span class="px-2 bg-gray-100 text-gray-500"> Or continue with </span>
					</div>
				</div>

				<div class="mt-6 grid grid-cols-3 gap-3">
					<div>
						<button
							class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
							on:click={handleGithubSignIn}
						>
							<img
								class="h-5 w-5"
								src="https://www.svgrepo.com/show/512317/github-142.svg"
								alt=""
							/>
						</button>
					</div>
					<div>
						<button
							class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
							on:click={handleDiscordSignIn}
						>
							<img class="h-5 w-5" src="https://www.svgrepo.com/show/506463/discord.svg" alt="" />
						</button>
					</div>
					<div>
						<button
							class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
							on:click={handleGoogleSignIn}
						>
							<img class="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg" alt="" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
