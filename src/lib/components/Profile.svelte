<script lang="ts">
	import { currentUser, pb } from '$lib/pocketbase';

	let categories = ['personal_info', 'objective', 'education', 'employment', 'projects', 'skills'];
	let currentCategory = categories[0];
	function nextCategory() {
		let index = categories.indexOf(currentCategory);
		if (index < categories.length - 1) {
			currentCategory = categories[index + 1];
		}
	}
	function prevCategory() {
		let index = categories.indexOf(currentCategory);
		if (index > 0) {
			currentCategory = categories[index - 1];
		}
	}

	let userData = {
		personal_info: [
			{
				name: '',
				email: '',
				phone: '',
				github: '',
				linkedin: ''
			}
		],
		objective: [
			{
				objective: ''
			}
		],
		education: [
			{
				school_name: '',
				degree: '',
				gpa: '',
				school_description: '',
				school_start_date: '',
				school_end_date: ''
			}
		],
		employment: [
			{
				company_name: '',
				company_city: '',
				job_name: '',
				job_start_date: '',
				job_end_date: '',
				job_description: ''
			}
		],
		projects: [
			{
				project_name: '',
				project_start_date: '',
				project_end_date: '',
				project_description: ''
			}
		],
		skills: [
			{
				skill_name: '',
				skill_description: ''
			}
		]
	};
	function alertUserData() {
		alert(JSON.stringify(userData));
	}
	function fetchUserData() {
		const userId = pb.authStore.model?.id;
		// Ensure userId is a valid string and not undefined
		if (userId === undefined) {
			alert('You must be logged in to fetch your data.');
			return;
		}
		// TODO: Handle error
		pb.collection('users')
			.getOne(userId)
			.then((data) => {
				userData = data.userData;
			});
	}
	async function saveUserData() {
		const postingData = {
			userData: userData
		};
		console.log('Looking for this user: ' + pb.authStore.model?.id);
		const userId = pb.authStore.model?.id;
		// Ensure userId is a valid string and not undefined
		if (userId === undefined) {
			alert('You must be logged in to save your data.');
			return;
		}
		const record = await pb.collection('users').update(userId, postingData);
		console.log('Saved record!');
		console.log(record);
	}
	function signOut() {
		pb.authStore.clear();
	}
</script>

<div class="card">
	<div class="sidebar">
		<!-- Sidebar links go here -->
		<!-- For each catagory in catagories, create a button that switches currentCatagory to the buttons catagory -->
		{#each categories as category}
			<!-- Display in a list -->
			<li>
				<button on:click={() => (currentCategory = category)}>{category}</button>
			</li>
		{/each}
		<button on:click={fetchUserData}>Fetch DB Data</button>
		<button on:click={saveUserData}>Update DB Data</button>
		<button on:click={signOut}>Sign Out</button>
	</div>
	<div class="main">
		<div class="header">
			<h1>{currentCategory}</h1>
		</div>
		<!-- Main content goes here -->
		<form>
			{#each userData[currentCategory] as data}
                {#each Object.keys(data) as key}
                    <label for={key}>{key}</label>
                    <input type="text" bind:value={data[key]} />
                {/each}
            {/each}
			<!-- <button>Submit</button> -->
		</form>
		<div class="navigation">
			<button on:click={prevCategory}>Prev</button>
			<button on:click={nextCategory}>Next</button>
		</div>
	</div>
</div>

<style>
	.card {
		background-color: #fffbd2;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		width: 80%;
		margin: auto;
		padding: 20px;
		border-radius: 10px;
	}

	.sidebar {
		float: left;
		width: 20%;
		height: 100%;
		padding: 20px;
		box-sizing: border-box;
	}

	.main {
		float: left;
		width: 80%;
		padding: 20px;
		box-sizing: border-box;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.navigation {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	/* Style the links inside the sidebar */
    .sidebar button {
        margin-bottom: 10px;
    }
</style>
