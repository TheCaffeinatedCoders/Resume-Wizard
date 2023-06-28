<script lang="ts">
	import { currentUser, pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	// Your selected Skeleton theme:
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// import '../theme.postcss';
	// This contains the bulk of Skeletons required styles:
	// import '@skeletonlabs/skeleton/styles/all.css';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	// import '../../app.postcss';

	// let username: string = '';
	let email: string = '';
	let password: string = '';
	let passwordConfirm: string = '';
	let error: string = '';

	// On mount, if currentUser is set, redirect to the '/profile' route
	onMount(() => {
		if ($currentUser) {
			goto('/profile');
		}
	});

	async function signUp() {
		try {
			const data = {
				// username: email,
				email: email,
				emailVisibility: true,
				password: password,
				passwordConfirm: passwordConfirm,
				// name: 'test',
				// userData: 'JSON',
				isOAuth: false
			};

			console.log("Attemting to create user with data:", data);
			const createdUser = await pb.collection('users').create(data);
			console.log("User created successfully:", createdUser);
			// If the user was created successfully, log them in
			const loginResponse = await pb.collection('users').authWithPassword(email, password);
			console.log("User logged in successfully:", loginResponse);
			error = '';
			goto('/home');
		} catch (e: any) {
			console.log(e);
			error = JSON.stringify(e.data);	
			// If the error was 400 or 403, display a user-friendly message
			if (e.status === 400) {
				error = 'Invalid email or password, try again. If you are already registered, please login. Minimum password length is 5 characters.';
				console.log('Invalid email or password, try again. If you are already registered, please login. Minimum password length is 5 characters.');
			} else if (e.status === 403) {
				error = 'Not authorized to create user';
				console.log('Not authorized to create user');
			} else {
				console.error(e);
				// @ts-ignore
				error = JSON.stringify(e.data);
			}
		}
	}
</script>

<svelte:head>
	<!-- <link rel="stylesheet" href="/tutorial/dark-theme.css"> -->
</svelte:head>

<div class="loginMain min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<h2 class="mt-6 text-center text-3xl font-extrabold">Create New Account</h2>
		<p class="mt-2 text-center text-sm max-w">
			Or
			<a href="/login" class="font-medium text-blue-600 hover:text-blue-500">
				login to an account
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
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">
						Confirm Password
					</label>
					<div class="mt-1">
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							autocomplete="current-password"
							required
							class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Confirm your password"
							bind:value={passwordConfirm}
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
			<!-- If errror -->
			<br />
			{#if error}
				<p class="px-2 bg-red-400 text-black">{error}</p>
			{/if}
		</div>
	</div>
</div>
