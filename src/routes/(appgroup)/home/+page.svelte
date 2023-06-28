<script lang="ts">
	import newDoc from '$lib/images/newDocument.png';
	import {
		resumeStore,
		selectedResumeObjectIndex,
		addEmptyResumeObject,
		removeResumeObject
	} from '$lib/resumeStore';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { currentUser, saveToPocketbase } from '$lib/pocketbase';
	import { writable } from 'svelte/store';

	// $: console.log('Home page loaded resumeStore: ', $resumeStore);
	// $: console.log('Home page selectedResumeObjectIndex: ', $selectedResumeObjectIndex);

	function addNewResume() {
		// Add a new resume to the resume store
		goto('/edit');
		addEmptyResumeObject();
		// Set the selected resume to the newly added resume
		// $selectedResumeObjectIndex = $resumeStore.length - 1;
		selectedResumeObjectIndex.set(get(resumeStore).length - 1);
		// Navigate to the edit page
	}

	let hover = writable(new Array(get(resumeStore).length).fill(false)); // Initialize hover as an array of booleans
	function hoverEnter(index: number) {
		// Update only the specific index in the hover array to true
		hover.update((hovers) => {
			hovers[index] = true;
			return hovers;
		});
	}
	function hoverLeave(index: number) {
		// Update only the specific index in the hover array to false
		hover.update((hovers) => {
			hovers[index] = false;
			return hovers;
		});
	}

	function viewResume(index: number) {
		// viewResume implementation
		selectedResumeObjectIndex.set(index);
		// Navigate to the edit page
		goto('/edit');
	}
	function deleteResume(index: number) {
		// deleteResume implementation
		removeResumeObject(index);
		if (get(currentUser)?.id) {
			// Save the resume to the cloud
			saveToPocketbase();
		}
	}
</script>

<div class="w-full p-4">
	<!-- <form class="flex items-center">
		<label for="voice-search" class="sr-only">Search</label>
		<div class="relative w-full">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<svg
					aria-hidden="true"
					class="w-5 h-5 text-gray-500 dark:text-gray-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd"
					/></svg
				>
			</div>
			<input
				type="text"
				id="voice-search"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Search your resume"
				required
			/>
			<button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3">
				<svg
					aria-hidden="true"
					class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
						clip-rule="evenodd"
					/></svg
				>
			</button>
		</div>
		<button
			type="submit"
			class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			<svg
				aria-hidden="true"
				class="w-5 h-5 mr-2 -ml-1"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>Search
		</button>
	</form> -->

	<br />
	<br />
	<br />

	<div class="flex flex-row flex-wrap space-x-9">
		<!-- New Resume Card -->
		<div
			class="max-w-xs w-60 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
		>
			<!-- <a href="/home/edit"> -->
			<button type="button" on:click={addNewResume}>
				<div class="ml-11 mt-6">
					<img src={newDoc} alt="New Resume Icon" width="100" />
					<p class="pt-3">New Resume</p>
				</div>
			</button>
			<!-- </a> -->
		</div>

		<!-- Resume Cards -->
		{#each $resumeStore as _resume, index}
			<div
				class="card hover:bg-gray-400 transition-opacity duration-500 max-w-xs w-60 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
				on:mouseenter={() => hoverEnter(index)}
				on:mouseleave={() => hoverLeave(index)}
			>
				<div class="ml-11 mt-6">
					<img src={newDoc} alt="New Resume Icon" width="100" />
					<p class="pt-3">Edit Resume: {index}</p>
				</div>

				{#if $hover[index]}
					<div class="boxes z-10 transition-opacity duration-500" id="buttonsContainer">
						<button
							class="box bg-white hover:bg-gray-100 rounded-full dark:bg-slate-600 dark:hover:bg-slate-500"
							on:click={() => viewResume(index)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>

							<div class="ml-1">
								<span>View</span>
							</div>
						</button>

						<button
							class="box bg-white hover:bg-gray-100 rounded-full dark:bg-slate-600 dark:hover:bg-slate-500"
							on:click={() => deleteResume(index)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
								/>
							</svg>

							<div class="ml-1">
								<span>Delete</span>
							</div>
						</button>
					</div>
				{/if}
			</div>

			<!-- <div
				class="hover:bg-gray-300 max-w-xs w-60 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
			>
				<div class="ml-11 mt-6">
					<img src={newDoc} alt="New Resume Icon" width="100" />
					<p class="pt-3">Edit Resume: {index}</p>
				</div>

				<button type="button" on:click={() => editExistingResume(index)}>
				<div class="ml-11 mt-6">

					<span>Delete</span>
				</div>
			</button>
			</div> -->
		{/each}
	</div>
</div>

<style>
	.card {
		position: relative;
	}

	.boxes {
		display: flex;
		position: absolute;
		left: 2rem;
		top: 6rem;
		flex-direction: row;
		/* transition: box-shadow 0.3s ease; */
	}

	.box {
		display: flex;
		flex-direction: row;
		padding: 0.5rem;
		margin-right: 1rem;
	}

	/* .box:hover {
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
	} */
</style>
