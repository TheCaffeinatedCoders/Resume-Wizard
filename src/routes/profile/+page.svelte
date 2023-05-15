<script>
	import { logout } from '$lib/pocketbase';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	// let fullName = 'John Doe';
	// let userId = 'john_doe123';
	// let newPassword = '';

	// On mount, if currentUser is not set, redirect to the '/login' route
	onMount(() => {
		if (!get(currentUser)) {
			goto('/login');
		}
	});

	function handleSignOut() {
		// Add sign out logic here
		logout();
		goto('/');
	}

	function handleChangePassword() {
		// Add password change logic here
		console.log('Password changed');
	}

</script>

<div class="flex flex-col items-center min-h-screen">
	<div class="max-w-md w-full mt-12 bg-white p-8 rounded-md shadow-lg">
		<h1 class="text-2xl font-bold mb-4 text-gray-900">Profile</h1>
		<div class="mb-4">
			<label for="fullName" class="block text-sm font-medium text-gray-700">Email: </label>
			<p id="fullName" class="mt-1 text-sm text-gray-900">{$currentUser?.email}</p>
		</div>
		<div class="mb-4">
			<label for="userId" class="block text-sm font-medium text-gray-700">User ID:</label>
			<p id="userId" class="mt-1 text-sm text-gray-900">{$currentUser?.id}</p>
		</div>
		<!-- If the isOAuth is not true -->
		{#if !$currentUser?.isOAuth}
		<div class="mb-4">
			<label for="newPassword" class="block text-sm font-medium text-gray-700"
				>Change Password:</label
			>
			<input
				type="password"
				id="newPassword"
				placeholder="New password"
				class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				
			/>
			<input
				type="password"
				id="confirmNewPassword"
				placeholder="Confirm new password"
				class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				
			/>
			<button
				type="button"
				class="mt-2 w-full bg-blue-500 text-white py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
				on:click={handleChangePassword}
			>
				Change Password
			</button>
		</div>
		{:else}
		<p class="text-l font-bold mb-4 text-gray-900">Logged in with Oauth</p>
		{/if}
		<button
			type="button"
			class="w-full bg-red-500 text-white py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
			on:click={handleSignOut}
		>
			Sign Out
		</button>
	</div>
</div>
