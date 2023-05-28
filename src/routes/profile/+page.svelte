<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { logout, currentUser, sendVerifyEmail, confirmVerifyEmail, requestPasswordReset, confirmChangePassword } from '$lib/pocketbase';

	// On mount, if currentUser is not set, redirect to the '/login' route
	onMount(() => {
		if (!get(currentUser)) {
			goto('/login');
		}
		console.log(get(currentUser));
	});

	function handleSignOut() {
		// Add sign out logic here
		logout();
		goto('/');
	}

	async function handleVerifyEmail() {
		// Add email verification logic here
		if (!$currentUser?.email) return;
		let confirmation = await sendVerifyEmail($currentUser?.email);
		console.log('Email verification sent', confirmation);
		emailVerifyTokenBoxToggle = true;
	}

	let emailVerifyToken: string = '';
	let emailVerifyTokenBoxToggle: boolean = false;
	async function handleConfirmVerifyEmail() {
		if (!$currentUser) return;
		let confirmationResponse = await confirmVerifyEmail(emailVerifyToken);
		console.log('Email verification confirmed', confirmationResponse);
	}

	async function createPasswordResetEmail() {
		if (!$currentUser?.email) return;
		let confirmation = await requestPasswordReset($currentUser?.email);
		console.log('Password reset request sent', confirmation);
		passwordChangeToggle = true;
	}

	let newPassword: string = '';
	let confirmNewPassword: string = '';
	let passwordChangeToggle: boolean = false;
	let resetPasswordVerificationToken: string = '';
	function handleChangePassword() {
		if (!$currentUser?.email) return;
		// if (newPassword !== confirmNewPassword) {
		// 	console.log('Passwords do not match');
		// 	return;
		// }
		confirmChangePassword(resetPasswordVerificationToken, newPassword, confirmNewPassword);
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

		{#if !$currentUser?.verified}
			<div class="mb-4">
				<p class="text-l font-bold mb-4 text-gray-900">Email Not Verified ❌</p>
				<button
					type="button"
					class="mt-2 w-full bg-blue-500 text-white py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
					on:click={handleVerifyEmail}
				>
					Send Verification Email
				</button>
				{#if emailVerifyTokenBoxToggle}
					<label for="verifyEmailToken" class="block text-m font-medium text-gray-700 pt-4"
						>Verify Email Token:</label
					>
					<input
						type="text"
						id="verifyEmailToken"
						placeholder="Insert Email Verification Token Here"
						class="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						bind:value={emailVerifyToken}
					/>
					<button
						type="button"
						class="mt-2 w-full bg-blue-500 text-white py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
						on:click={handleConfirmVerifyEmail}
					>
						Submit Email Verification Token
					</button>
				{/if}
			</div>
		{:else}
			<p class="text-l font-bold mb-4 text-gray-900">Email Verified ✅</p>
		{/if}

		{#if !$currentUser?.isOAuth}
			<button
				type="button"
				class="mt-2 mb-2 w-full bg-blue-500 text-white py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
				on:click={createPasswordResetEmail}
			>
				Toggle Change Password Prompt
			</button>
			{#if passwordChangeToggle}
				<div class="mb-4">
					<input
						type="password"
						id="newPassword"
						placeholder="New password"
						class="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						bind:value={newPassword}
					/>
					<input
						type="password"
						id="confirmNewPassword"
						placeholder="Confirm new password"
						class="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						bind:value={confirmNewPassword}
					/>
					<input
						type="text"
						id="passwordVerificationToken"
						placeholder="Insert Password Verification Token Here"
						class="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						bind:value={resetPasswordVerificationToken}
					/>
					<button
						type="button"
						class="mt-2 w-full bg-blue-500 text-white py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
						on:click={handleChangePassword}
					>
						Request Change Password
					</button>
				</div>
			{/if}
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
