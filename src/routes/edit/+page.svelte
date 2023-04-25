<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/datepicker.min.js" lang="ts">
	import { Stepper, Step, InputChip } from '@skeletonlabs/skeleton';
	import { DateInput } from 'date-picker-svelte';

	import gptImage from '$lib/images/chatgptLogo.png';

	let startDate = new Date();
	let endDate = new Date();
	let yes = false; //when true, the end date will be disabled

	let selectedDegree = '1'; //index of the degree
	let showCustomDegree = false; //when true, user can put their own customed degree which wasn't listed

	// toggle to show the suggestion on the right side with 3 different options
	let showSuggestion = true;

	// the value of the description area (textarea)
	let description = "I'm a genius";
	let suggestedSentences = ["I'm genius number 1", "I'm genius number 2", "I'm genius number 3"];

    let stackList: any = [];
 	let languagesList: any = [];
 	let frameworksList: any = [];
 	let toolsList: any = [];
 	let libaryList: any = [];

	$: {
		showCustomDegree = selectedDegree == '15';
	}

	async function fetchSuggestions() {

		// console.log("Fetching new suggestions")

		const queryParams = new URLSearchParams({
			prompt: description,
			completionCount: String(3),
			maxTokens: String(200),
		});

		// fetch the suggestions from the backend
		const response = await fetch(`/api/getSuggestions?${queryParams}`);

		// parse the response into suggestedSentences
		// console.log("New suggestions fetched");
		// console.log(response);
		let data = await response.json();
		
		// console.log(data);

		suggestedSentences = [];

		for (let suggestion of data) {
			suggestedSentences.push(suggestion);
		}

	}
</script>

<div class="body">
	<h1>Edit your unique resume!</h1>

	<div class="wrapStepper">
		<Stepper>
			<Step>
				<svelte:fragment slot="header">Personal Information</svelte:fragment>
				<div class="forms">
					<label class="label">
						<span>Name</span>
						<input type="text" placeholder="Input" class="input variant-form-material" />
					</label>
					<label>
						<span>Phone</span>
						<input type="text" placeholder="Input" class="input variant-form-material" />
					</label>
					<label class="label">
						<span>Email</span>
						<input type="text" placeholder="Input" class="input variant-form-material" />
					</label>
					<label class="label">
						<span>Github</span>
						<input type="text" placeholder="Input" class="input variant-form-material" />
					</label>
					<label>
						<span>Linkedin</span>
						<input type="text" placeholder="Input" class="input variant-form-material" />
					</label>
				</div>
			</Step>

			<Step>
				<svelte:fragment slot="header">Education</svelte:fragment>

				<div class="forms">
					<div class="formEDBasic">
						<label class="label">
							<span>School name</span>
							<input type="text" placeholder="Input" class="input variant-form-material" />
						</label>
						<label class="label">
							<span>School Location</span>
							<input type="text" placeholder="Input" class="input variant-form-material" />
						</label>
						<label class="label">
							<span>Degree</span>
							<select class="select" bind:value={selectedDegree}>
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
							<label class="label">
								<span>Enter your degree</span>
								<input type="text" placeholder="Input" class="input variant-form-material" />
							</label>
						{/if}
					</div>

					<div class="formEDDate">
						<label class="label">
							<span>Start Date</span>
							<DateInput format="yyyy/MM/dd" placeholder="2000/31/12" bind:value={startDate} />
						</label>
						<label class="label">
							<span>End Date</span>
							<DateInput format="yyyy/MM/dd" disabled={yes} bind:value={endDate} />
						</label>

						<div class="checkboxHeight">
							<label for="endDate">
								<input
									type="checkbox"
									id="endDate"
									name="endDate"
									style="margin-right: 0.5rem"
									bind:checked={yes}
								/>
								I'm currently attending here
							</label>
						</div>
					</div>
				</div>
			</Step>

			<Step>
				<svelte:fragment slot="header">Professional Experience</svelte:fragment>

				<div class="forms">
					<div class="formEDBasic">
						<label class="label">
							<span>Job Title</span>
							<input type="text" placeholder="Input" class="input variant-form-material" />
						</label>
						<label class="label">
							<span>Company</span>
							<input type="text" placeholder="Input" class="input variant-form-material" />
						</label>
						<label class="label">
							<span>Location</span>
							<input type="text" placeholder="Input" class="input variant-form-material" />
						</label>
					</div>

					<div class="formEDDate">
						<label class="label">
							<span>Start Date</span>
							<DateInput format="yyyy/MM/dd" placeholder="2000/31/12" bind:value={startDate} />
						</label>
						<label class="label">
							<span>End Date</span>
							<DateInput format="yyyy/MM/dd" disabled={yes} bind:value={endDate} />
						</label>

						<div class="checkboxHeight">
							<label for="endDate">
								<input
									type="checkbox"
									id="endDate"
									name="endDate"
									style="margin-right: 0.5rem"
									bind:checked={yes}
								/>
								I'm currently working here
							</label>
						</div>
					</div>

					{#if showSuggestion}
						<div class="textarea-container ">
							<textarea
								bind:value={description}
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
									bind:value={description}
									class="textarea h-full"
									placeholder="Enter some long form content."
								/>
							</div>
							<div class="w-1/2 ml-10">
								<div class="flex flex-col h-full">
									<textarea
										on:click={() => {
											description = suggestedSentences[0];
											showSuggestion = !showSuggestion;
										}}
										bind:value={suggestedSentences[0]}
										class="textarea h-full mb-3"
										placeholder="Enter some long form content."
									/>
									<textarea
										on:click={() => {
											description = suggestedSentences[1];
											showSuggestion = !showSuggestion;
										}}
										bind:value={suggestedSentences[1]}
										class="textarea h-full mb-3"
										placeholder="Enter some long form content."
									/>
									<textarea
										on:click={() => {
											description = suggestedSentences[2];
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

			<Step>
				<svelte:fragment slot="header">Projects</svelte:fragment>

				<div class="forms">
					<div class="formEDBasic">
						<label class="label">
							<span>Project Name</span>
							<input type="text" placeholder="Input" class="input variant-form-material" />
						</label>
						<label class="label">
							<span>Stack that used</span>
							<InputChip bind:value={stackList} name="chips" placeholder="Enter any value..." />
						</label>
					</div>

					<div class="formEDDate">
						<label class="label">
							<span>Start Date</span>
							<DateInput format="yyyy/MM/dd" placeholder="2000/31/12" bind:value={startDate} />
						</label>

						<label class="label">
							<span>End Date</span>
							<DateInput format="yyyy/MM/dd" disabled={yes} bind:value={endDate} />
						</label>

						<div class="checkboxHeight">
							<label for="endDate">
								<input
									type="checkbox"
									id="endDate"
									name="endDate"
									style="margin-right: 0.5rem"
									bind:checked={yes}
								/>
								I'm still working on this project
							</label>
						</div>
					</div>

					{#if showSuggestion}
						<div class="textarea-container ">
							<textarea
								bind:value={description}
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
									bind:value={description}
									class="textarea h-full"
									placeholder="Enter some long form content."
								/>
							</div>
							<div class="w-1/2 ml-10">
								<div class="flex flex-col h-full">
									<textarea
										on:click={() => {
											description = suggestedSentences[0];
											showSuggestion = !showSuggestion;
										}}
										bind:value={suggestedSentences[0]}
										class="textarea h-full mb-3"
										placeholder="Enter some long form content."
									/>
									<textarea
										on:click={() => {
											description = suggestedSentences[1];
											showSuggestion = !showSuggestion;
										}}
										bind:value={suggestedSentences[1]}
										class="textarea h-full mb-3"
										placeholder="Enter some long form content."
									/>
									<textarea
										on:click={() => {
											description = suggestedSentences[2];
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

			<Step>
				<svelte:fragment slot="header">Skills</svelte:fragment>

				<div class="forms">
					<div class="formEDBasic">
						<label class="label">
							<span>Languages</span>
							<InputChip bind:value={languagesList} name="chips" placeholder="Enter any value..." />
						</label>
						<label class="label">
							<span>Frameworks</span>
							<InputChip bind:value={frameworksList} name="chips" placeholder="Enter any value..." />
						</label>
						<label class="label">
							<span>Developer Tools</span>
							<InputChip bind:value={toolsList} name="chips" placeholder="Enter any value..." />
						</label>
						<label class="label">
							<span>Libraries</span>
							<InputChip bind:value={libaryList} name="chips" placeholder="Enter any value..." />
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

	.body {
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
	}

	.textarea-container {
		width: 100%;
		margin-top: 2.5rem;
		position: relative;
		display: inline-block;
	}

	/* actual class for textarea */
	.textarea {
	}

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
