<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/datepicker.min.js">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { DateInput } from 'date-picker-svelte';

	import gptImage from '$lib/images/ChatGPT_logo.svg.webp';

	let startDate = new Date();
	let endDate = new Date();
	let yes = false;

	let selectedDegree = '1';
	let showCustomDegree = false;

	$: {
		showCustomDegree = selectedDegree == '15';
	}
</script>

<div class="body">
	<h1>Edit your unique resume!</h1>

	<!-- <label class="label">
		<span>Select</span>
		<select class="select variant-form-material">
			<option value="1">Option 1</option>
			<option value="2">Option 2</option>
			<option value="3">Option 3</option>
			<option value="4">Option 4</option>
			<option value="5">Option 5</option>
		</select>
	</label>

	<label class="label">
		<span>Textarea</span>
		<textarea
			class="textarea"
			rows="4"
			placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
		/>
	</label> -->

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
							<!-- <input type="checkbox" id="endDate" name="endDate" /> -->
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

					<div class="textarea-container">
						<textarea class="textarea" rows="4" placeholder="Enter some long form content." />
						<button class="chatgpt-button">
							<img src={gptImage} alt="ChatGPT" />
						</button>
					</div>

					<!-- <div date-rangepicker class="flex items-center">
						<div class="relative">
							<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									aria-hidden="true"
									class="w-5 h-5 text-gray-500 dark:text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
										clip-rule="evenodd"
									/></svg
								>
							</div>
							<input
								name="start"
								type="text"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Select date start"
							/>
						</div>
						<span class="mx-4 text-gray-500">to</span>
						<div class="relative">
							<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									aria-hidden="true"
									class="w-5 h-5 text-gray-500 dark:text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
										clip-rule="evenodd"
									/></svg
								>
							</div>
							<input
								name="end"
								type="text"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Select date end"
							/>
						</div>
					</div> -->
				</div>
			</Step>
			<Step>
				<svelte:fragment slot="header">(Experience)</svelte:fragment>
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
				<svelte:fragment slot="header">(Projects)</svelte:fragment>
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
		position: relative;
		display: inline-block;
	}

	.textarea {
		display: block;
		width: 100%;
		margin-bottom: 10px;
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
