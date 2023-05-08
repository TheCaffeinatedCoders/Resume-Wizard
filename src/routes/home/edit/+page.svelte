<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/datepicker.min.js" lang="ts">
	import {
		Stepper,
		Step,
		InputChip,
		ProgressRadial,
		ListBox,
		ListBoxItem
	} from '@skeletonlabs/skeleton';
	import { DateInput } from 'date-picker-svelte';
	// import type { Snapshot } from './$types';

	import gptImage from '$lib/images/chatgptLogo.png';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import {
		resumeStore,
		selectedResumeObjectIndex,
		createEmptyEducationObject,
		createEmptyJobObject,
		createEmptyProjectObject,
		addEmptyResumeObject
	} from '$lib/resumeStore';
	import { goto } from '$app/navigation';

	onMount(() => {
		if ($resumeStore.length == 0 || $selectedResumeObjectIndex == -1) {
			addEmptyResumeObject();
			selectedResumeObjectIndex.set($resumeStore.length - 1);
		}
	});

	//PERSONAL INFORMATION section
	// let formData = {
	// 	name: '',
	// 	phone: '',
	// 	email: '',
	// 	github: '',
	// 	linkedin: ''
	// };

	// export const snapshot: Snapshot = {
	// 	capture: () => formData,
	// 	restore: (value) => (formData = value)
	// };

	//DATE sections
	// let startDate = new Date();
	// let endDate = new Date();
	// let currentlyWorking = false; //when true, the end date will be disabled

	// Degree dropdown table
	// let selectedDegree = '1'; //index of the degree
	let showCustomDegree = false; //when true, user can put their own customed degree which wasn't listed

	// toggle to show the suggestion on the right side with 3 different options FROM AI generating description section
	let showSuggestion = true;

	// the value of the description area (textarea)
	let description = 'Enter a project description here';
	let suggestedSentences = ['', '', ''];

	//skill section
	let stackList: any = [];
	let languagesList: any = [];
	let frameworksList: any = [];
	let toolsList: any = [];
	let libaryList: any = [];

	// TODO: Carson broke this, needs to be reworked
	// $: {
	// 	showCustomDegree = selectedDegree == '15';
	// }

	//AI function
	let loadingSuggestions = false;
	async function fetchSuggestions() {
		const queryParams = new URLSearchParams({
			prompt: description,
			completionCount: String(3),
			maxTokens: String(200)
		});
		loadingSuggestions = true;
		// fetch the suggestions from the backend
		const response = await fetch(`/api/getSuggestions?${queryParams}`);
		// parse the response into suggestedSentences
		let data = await response.json();
		suggestedSentences = [];
		for (let suggestion of data) {
			suggestedSentences.push(suggestion);
		}
		loadingSuggestions = false;
	}

	// Subscribe to resumeStore and log the value of the store to the console on change
	// $: console.log("Edit Page Resume Store Value: ", $resumeStore);
	// $: console.log("Edit Page Selected Resume Object Index: ", $selectedResumeObjectIndex);

	// Get the current resume object from the resume store at the selected index
	// This is a local variable that we can change, but it won't change the resume store
	let currentResumeObject = get(resumeStore)[$selectedResumeObjectIndex];
	if (currentResumeObject == undefined) {
		goto('/home');
	}
	// Subscribe to currentResumeObject and update the resume store at the selected index with the current resume object on change
	$: resumeStore.update((resumeStore) => {
		resumeStore[$selectedResumeObjectIndex] = currentResumeObject;
		return resumeStore;
	});
	let selectedEducation: number = 0;
	let selectedJob: number = 0;
	let selectedProject: number = 0;
</script>

<div class="body">
	<h1>Edit your unique resume!</h1>

	<div class="wrapStepper">
		<Stepper>
			<!-- Personal Information Step -->
			<Step>
				<svelte:fragment slot="header">Personal Information</svelte:fragment>
				<div class="forms">
					<label class="label" for="Name">
						<span>Name</span>
						<input
							bind:value={currentResumeObject.personalInfo.name}
							type="text"
							placeholder="Input"
							class="input variant-form-material"
						/>
					</label>
					<label>
						<span>Phone</span>
						<input
							bind:value={currentResumeObject.personalInfo.phoneNumber}
							type="text"
							placeholder="Input"
							class="input variant-form-material"
						/>
					</label>
					<label class="label" for="Email">
						<span>Email</span>
						<input
							bind:value={currentResumeObject.personalInfo.email}
							type="text"
							placeholder="Input"
							class="input variant-form-material"
						/>
					</label>
					<label class="label" for="Github URL">
						<span>Github</span>
						<input
							bind:value={currentResumeObject.personalInfo.github}
							type="text"
							placeholder="Input"
							class="input variant-form-material"
						/>
					</label>
					<label class="label" for="Linkedin URL">
						<span>Linkedin</span>
						<input
							bind:value={currentResumeObject.personalInfo.linkedin}
							type="text"
							placeholder="Input"
							class="input variant-form-material"
						/>
					</label>
				</div>
			</Step>

			<!-- Education Step -->
			<Step>
				<svelte:fragment slot="header">Education</svelte:fragment>
				<button
					class="button"
					on:click={() => currentResumeObject.education.push(createEmptyEducationObject())}
					>Add Education</button
				>
				<!-- Edit dropdown for each education object -->
				<!-- <ListBox>
					{#each currentResumeObject.education as educationObject, index}
					<ListBoxItem bind:group={selectedEducation} name="medium" value={index}>{educationObject.school}</ListBoxItem>
					{/each}
				</ListBox> -->
				<select class="select" bind:value={selectedEducation}>
					{#each currentResumeObject.education as educationObject, index}
						<option value={index}>{educationObject.school}</option>
					{/each}
				</select>

				<div class="forms">
					<div class="formEDBasic">
						<label class="label" for="School Name">
							<span>School name</span>
							<input
								type="text"
								placeholder="Input"
								class="input variant-form-material"
								bind:value={currentResumeObject.education[selectedEducation].school}
							/>
						</label>
						<label class="label" for="School Location">
							<span>School Location</span>
							<input
								type="text"
								placeholder="Input"
								class="input variant-form-material"
								bind:value={currentResumeObject.education[selectedEducation].location}
							/>
						</label>
						<label class="label" for="Degree">
							<span>Degree</span>
							<select
								class="select"
								bind:value={currentResumeObject.education[selectedEducation].degree}
							>
								console.log(selectedDegree);
								<option value="1">Bachelor of Arts</option>
								<option value="2">Bacherlor of Science</option>
								<option value="3">BBA</option>
								<option value="4">High School Diiploma</option>
								<option value="5">GED</option>
								<option value="6">Associate of Arts</option>
								<option value="7">Associate of Science</option>
								<option value="8">Associate of Applied Science</option>
								<option value="9">Master of Arts</option>
								<option value="10">Master of Science</option>
								<option value="11">Master of Business Administration</option>
								<option value="12">J.D.</option>
								<option value="13">M.D.</option>
								<option value="14">Ph.D.</option>
								<option value="15">Enter a different degree</option>
							</select>
						</label>
						{#if showCustomDegree}
							<label class="label" for="Custom Degree">
								<span>Enter your degree</span>
								<input
									type="text"
									placeholder="Input"
									class="input variant-form-material"
									bind:value={currentResumeObject.education[selectedEducation].degree}
								/>
							</label>
						{/if}
					</div>

					<div class="formEDDate">
						<label class="label" for="Education Start Date">
							<span>Start Date</span>
							<!-- Currently buggy, the education start date model expects a current date function and not of type date. Needs to be fixed -->
							<!-- <DateInput format="yyyy/MM/dd" placeholder="2000/31/12" bind:value={currentResumeObject.education[selectedEducation].startDate} /> -->
							<DateInput format="yyyy/MM/dd" />
						</label>
						<label class="label" for="Education End Date">
							<span>End Date</span>
							<!-- <DateInput format="yyyy/MM/dd" disabled={currentlyWorking} bind:value={currentResumeObject.education[selectedEducation].endDate} /> -->
							<DateInput format="yyyy/MM/dd" />
						</label>

						<div class="checkboxHeight">
							<label for="endDate">
								<input
									type="checkbox"
									id="endDate"
									name="endDate"
									style="margin-right: 0.5rem"
									bind:checked={currentResumeObject.education[selectedEducation].currentlyAttending}
								/>
								I'm currently attending here
							</label>
						</div>
					</div>
				</div>
			</Step>

			<!-- Job Experience Step -->
			<Step>
				<svelte:fragment slot="header">Professional Experience</svelte:fragment>
				<button
					class="button"
					on:click={() => currentResumeObject.jobs.push(createEmptyJobObject())}>Add Job</button
				>
				<!-- Edit dropdown for each job object -->
				<select class="select" bind:value={selectedJob}>
					{#each currentResumeObject.jobs as jobObject, index}
						<option value={index}>{jobObject.position}</option>
					{/each}
				</select>

				<div class="forms">
					<div class="formEDBasic">
						<label class="label" for="Job Title">
							<span>Job Position</span>
							<input
								type="text"
								placeholder="Input"
								class="input variant-form-material"
								bind:value={currentResumeObject.jobs[selectedJob].position}
							/>
						</label>
						<label class="label" for="Company Title">
							<span>Company</span>
							<input
								type="text"
								placeholder="Input"
								class="input variant-form-material"
								bind:value={currentResumeObject.jobs[selectedJob].company}
							/>
						</label>
						<label class="label" for="Company Location">
							<span>Location</span>
							<input
								type="text"
								placeholder="Input"
								class="input variant-form-material"
								bind:value={currentResumeObject.jobs[selectedJob].location}
							/>
						</label>
					</div>

					<div class="formEDDate">
						<label class="label" for="Job Start Date">
							<span>Start Date</span>
							<DateInput format="yyyy/MM/dd" placeholder="2000/31/12" />
						</label>
						<label class="label" for="Job End Date">
							<span>End Date</span>
							<DateInput
								format="yyyy/MM/dd"
								disabled={currentResumeObject.jobs[selectedJob].currentlyWorking}
							/>
						</label>

						<div class="checkboxHeight">
							<label class="label" for="Currently Working Job Checkbox">
								<input
									type="checkbox"
									id="endDate"
									name="endDate"
									style="margin-right: 0.5rem"
									bind:checked={currentResumeObject.jobs[selectedJob].currentlyWorking}
								/>
								I'm currently working here
							</label>
						</div>
					</div>

					{#if showSuggestion}
						<div class="textarea-container ">
							<textarea
								bind:value={currentResumeObject.jobs[selectedJob].description}
								class="textarea h-96"
								rows="20"
								placeholder="Enter some long form content."
							/>
							<button
								class="chatgpt-button"
								on:click={() => {
									fetchSuggestions();
									showSuggestion = !showSuggestion;
								}}
							>
								<img src={gptImage} alt="ChatGPT" />
							</button>
						</div>
					{:else}
						<div class="flex w-full h-96 mt-10">
							<div class="w-1/2">
								<textarea
									bind:value={currentResumeObject.jobs[selectedJob].description}
									class="textarea h-full"
									placeholder="Enter some long form content."
								/>
							</div>
							<div class="w-1/2 ml-10">
								<div class="flex flex-col h-full">
									<!-- If loadingSuggestions -->
									{#if loadingSuggestions}
										<ProgressRadial value={undefined} />
									{:else}
										<button
											type="button"
											on:click={() => {
												currentResumeObject.jobs[selectedJob].description = suggestedSentences[0];
												showSuggestion = !showSuggestion;
											}}
											class="textarea h-full mb-3"
											placeholder="Enter some long form content."
										>
											{suggestedSentences[0]}
										</button>
										<button
											type="button"
											on:click={() => {
												currentResumeObject.jobs[selectedJob].description = suggestedSentences[1];
												showSuggestion = !showSuggestion;
											}}
											class="textarea h-full mb-3"
											placeholder="Enter some long form content."
										>
											{suggestedSentences[1]}
										</button>
										<button
											type="button"
											on:click={() => {
												currentResumeObject.jobs[selectedJob].description = suggestedSentences[2];
												showSuggestion = !showSuggestion;
											}}
											class="textarea h-full"
											placeholder="Enter some long form content."
										>
											{suggestedSentences[2]}
										</button>
									{/if}
								</div>
							</div>
						</div>
					{/if}
				</div>
			</Step>

			<!-- Programming Projects Step -->
			<Step>
				<svelte:fragment slot="header">Projects</svelte:fragment>

				<button
					class="button"
					on:click={() => currentResumeObject.projects.push(createEmptyProjectObject())}
					>Add Project</button
				>
				<!-- Edit dropdown for each job object -->
				<select class="select" bind:value={selectedProject}>
					{#each currentResumeObject.projects as projectObject, index}
						<option value={index}>{projectObject.name}</option>
					{/each}
				</select>

				<div class="forms">
					<div class="formEDBasic">
						<label class="label" for="Project Name">
							<span>Project Name</span>
							<input
								type="text"
								placeholder="Input"
								class="input variant-form-material"
								bind:value={currentResumeObject.projects[selectedProject].name}
							/>
						</label>
						<label class="label" for="Tech stack used">
							<span>Stack that used</span>
							<InputChip
								bind:value={currentResumeObject.projects[selectedProject].technologies}
								name="chips"
								placeholder="Enter any value..."
							/>
						</label>
					</div>

					<div class="formEDDate">
						<label class="label" for="Project Start Date">
							<span>Start Date</span>
							<DateInput format="yyyy/MM/dd" placeholder="2000/31/12" />
						</label>

						<label class="label" for="Project End Date">
							<span>End Date</span>
							<DateInput
								format="yyyy/MM/dd"
								disabled={currentResumeObject.projects[selectedProject].inProgress}
							/>
						</label>

						<div class="checkboxHeight">
							<label class="label" for="Project In Progress">
								<input
									type="checkbox"
									id="projectInProgress"
									name="projectInProcess"
									style="margin-right: 0.5rem"
									bind:checked={currentResumeObject.projects[selectedProject].inProgress}
								/>
								I'm still working on this project
							</label>
						</div>
					</div>

					{#if showSuggestion}
						<div class="textarea-container ">
							<textarea
								bind:value={currentResumeObject.projects[selectedProject].description}
								class="textarea h-96"
								rows="20"
								placeholder="Enter some long form content."
							/>
							<button
								class="chatgpt-button"
								on:click={() => {
									showSuggestion = !showSuggestion;
									fetchSuggestions();
								}}
							>
								<img src={gptImage} alt="ChatGPT" />
							</button>
						</div>
					{:else}
						<div class="flex w-full h-96 mt-10">
							<div class="w-1/2">
								<textarea
									bind:value={currentResumeObject.projects[selectedProject].description}
									class="textarea h-full"
									placeholder="Enter some long form content."
								/>
							</div>
							<div class="w-1/2 ml-10">
								<div class="flex flex-col h-full">
									<textarea
										on:click={() => {
											currentResumeObject.projects[selectedProject].description =
												suggestedSentences[0];
											showSuggestion = !showSuggestion;
										}}
										bind:value={suggestedSentences[0]}
										class="textarea h-full mb-3"
										placeholder="Enter some long form content."
									/>
									<textarea
										on:click={() => {
											currentResumeObject.projects[selectedProject].description =
												suggestedSentences[1];
											showSuggestion = !showSuggestion;
										}}
										bind:value={suggestedSentences[1]}
										class="textarea h-full mb-3"
										placeholder="Enter some long form content."
									/>
									<textarea
										on:click={() => {
											currentResumeObject.projects[selectedProject].description =
												suggestedSentences[2];
											showSuggestion = !showSuggestion;
										}}
										bind:value={suggestedSentences[2]}
										class="textarea h-full"
										placeholder="Enter some long form content."
									/>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</Step>

			<!-- Skills Step -->
			<Step>
				<svelte:fragment slot="header">Skills</svelte:fragment>

				<div class="forms">
					<div class="formEDBasic">
						<label class="label" for="Programming Languages">
							<span>Languages</span>
							<InputChip
								bind:value={currentResumeObject.skills.languages}
								name="chips"
								placeholder="Enter any value..."
							/>
						</label>
						<label class="label" for="Frameworks Used">
							<span>Frameworks</span>
							<InputChip
								bind:value={currentResumeObject.skills.frameworks}
								name="chips"
								placeholder="Enter any value..."
							/>
						</label>
						<label class="label" for="Developer Tools Used">
							<span>Developer Tools</span>
							<InputChip
								bind:value={currentResumeObject.skills.tools}
								name="chips"
								placeholder="Enter any value..."
							/>
						</label>
						<label class="label" for="Libaries Used">
							<span>Libraries</span>
							<InputChip
								bind:value={currentResumeObject.skills.libaries}
								name="chips"
								placeholder="Enter any value..."
							/>
						</label>
					</div>
				</div>
			</Step>
		</Stepper>
	</div>
</div>

<style>
	.checkboxHeight {
		margin-top: 2rem;
	}

	.forms {
		margin: 4rem 2rem;
	}

	.label {
		margin: 1rem 0;
	}

	.formEDBasic {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.formEDDate {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 2rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
	}

	/* .body { */
	/* @apply text-error-900;
		background-color: hsla(0, 100%, 50%, 0.5); */

	/* padding: 2rem;
		height: 100vh;
		background-image: radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 1) 0px, transparent 50%),
			radial-gradient(at 80% 0%, hsla(189, 85%, 82%, 1) 0px, transparent 50%),
			radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%),
			radial-gradient(at 79% 50%, hsla(340, 28%, 82%, 1) 0px, transparent 50%),
			radial-gradient(at 0% 100%, hsla(14, 53%, 78%, 1) 0px, transparent 50%),
			radial-gradient(at 80% 100%, hsla(240, 62%, 76%, 1) 0px, transparent 50%),
			radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%); */
	/* } */

	.textarea-container {
		width: 100%;
		margin-top: 2.5rem;
		position: relative;
		display: inline-block;
	}

	/* actual class for textarea */
	/* .textarea {
	} */

	.chatgpt-button {
		display: inline-block;
		background-color: transparent;
		border: none;
		padding: 0;
		cursor: pointer;
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 1;
	}

	.chatgpt-button img {
		width: 40px;
		height: 40px;
		display: block;
		transition: 0.3s;
		opacity: 0.8;
	}

	.chatgpt-button:hover img {
		opacity: 1;
	}
</style>
