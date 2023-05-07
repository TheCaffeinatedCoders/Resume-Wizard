<script>
	import newDoc from '$lib/images/newDocument.png';
	import { resumeStore, selectedResumeObjectIndex, addEmptyResumeObject } from '$lib/resumeStore';
	import { goto } from '$app/navigation';

	$: console.log($resumeStore);
	$: console.log($selectedResumeObjectIndex);

	function addNewResume() {
		// Add a new resume to the resume store
		addEmptyResumeObject();
		// Set the selected resume to the newly added resume
		$selectedResumeObjectIndex = $resumeStore.length - 1;
		// Navigate to the edit page
		goto('/home/edit');
	}

</script>

<div class="w-full p-4">
	<form class="flex items-center">
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
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
	</form>

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
		{#each $resumeStore as resume, index}
			<div
				class="max-w-xs w-60 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
			>
				<!-- <a href="/home/edit"> -->
					<div class="ml-11 mt-6">
						<img src={newDoc} alt="Resume Icon" width="100" />
						<p class="pt-3">Existing Resume</p>
					</div>
				<!-- </a> -->
			</div>
		{/each}

		<!-- Sample tailwind card example -->
		<div
			class="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
		>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Noteworthy technology acquisitions 2021
				</h5>
			</a>
			<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
				chronological order.
			</p>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a
				href="#"
				class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Read more
				<svg
					aria-hidden="true"
					class="w-4 h-4 ml-2 -mr-1"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
		</div>
	</div>
</div>

<style>
</style>
