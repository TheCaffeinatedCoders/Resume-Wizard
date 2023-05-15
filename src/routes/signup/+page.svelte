<script lang="ts">
	import { currentUser, pb } from '$lib/pocketbase';
	// import UserInfo from '$lib/components/UserInfo.svelte';
	import { goto } from '$app/navigation';

	let username: string;
	let password: string;
	let error: string;

	// On mount, if currentUser is set, redirect to the '/profile' route
	onMount(() => {
		if ($currentUser) {
			goto('/profile');
		}
	});	

	async function signUp() {
		try {
			const data = {
				username,
				password,
				passwordConfirm: password
			};
			const createdUser = await pb.collection('users').create(data);
			error = '';
			goto('/login')
		} catch (e) {
			console.error(e);
			//@ts-ignore
			error = JSON.stringify(e.data);
		}
	}

	function signOut() {
		pb.authStore.clear();
	}

	async function handleGoogleSignIn() {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
		goto('/home'); // Add this line to redirect to the '/home' route
	}

	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../../app.postcss';
	import { onMount } from 'svelte';
</script>

<svelte:head>
	<!-- <link rel="stylesheet" href="/tutorial/dark-theme.css"> -->
</svelte:head>

	<div class="loginMain min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 class="mt-6 text-center text-3xl font-extrabold ">Create New Account</h2>
			<p class="mt-2 text-center text-sm max-w">
				Or
				<a href="/login" class="font-medium text-blue-600 hover:text-blue-500"> login to an account </a>
			</p>
		</div>

		<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
				<form class="space-y-6">
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">
							Email address
						</label>
						<div class="mt-1">
							<input
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								required
								class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Enter your email address"
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
							/>
						</div>
					</div>
					<div>
						<label for="password" class="block text-sm font-medium text-gray-700"> Confirm Password </label>
						<div class="mt-1">
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								autocomplete="current-password"
								required
								class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Confirm your password"
							/>
						</div>
					</div>

					<div>
						<button
							on:click={signUp}
							class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Create Email/Password Account
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
<!-- {/if} -->

<!-- If errror -->
{#if error}
	<p>{error}</p>
{/if}

<style>
	/* .loginMain {
		background-image: url('$lib/images/loginBackground.jpg');
		background-size: cover;
		background-position: center;
	} */
</style>
