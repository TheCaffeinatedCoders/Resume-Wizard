<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';

	import Mainpage from '$lib/components/Mainpage.svelte';
	import Login from '$lib/components/Login.svelte';

	import Profile from '$lib/components/Profile.svelte';

	async function handleGoogleSignIn() {
		// Add sign in logic here
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
	}
	
</script>

<svelte:head>
	<title>Resume Wizard</title>
	<meta name="description" content="Whip up a resume with ease" />
</svelte:head>

<div class="homecontainer">
	{#if !$currentUser}
		<Mainpage />
		<Login />
		<button class="border border-green-300 rounded-md" on:click={handleGoogleSignIn}>Google Sign In!</button>
	{:else}
	
		<!-- Dawn's code area -->
		<div class = "background">
			<div class = "alignment">
				<img src ="../src/lib/images/company motto.png" alt="companymotto">
				
			</div>
			<div class = "centerbuttons">
				<div class = "textborder">
					<span>
						New  
					</span>
	
				</div>
				<div class = "textborder">
					<span>
						Collection
					</span>
					
	
				</div>
			</div>
			
		</div>
		<!-- <Profile /> -->
	{/if}
</div>

<style>
	.homecontainer {
		/* Body stylings for background color and page size at src/routes/styles.css
			SOMEHOW NEED THIS TO MAKE <MAINPAGE> and <LOGIN> to be centered
		*/
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.background{
		margin-top: 0px;
		background-image: linear-gradient(pink, white);
		width: 100vw;
		height: 200vh;

	}
	.textborder{

		background-color: white;
		width: 200px;
		color: pink;  
		display:inline-block; 
		text-align: center; 
		text-decoration-color: black;
		font-size: 20px; 
		padding: 10px;
		margin: 20px; 
		cursor: pointer; 
		border-radius: 12px;
		transition: all 0.5s;


	}
	.textborder span{
		cursor: pointer; 
		display: inline-block;
		position: relative; 
		transition: 0.5s;
	}
	.textborder span:after{
		content: '\00bb';
		position: absolute;
		opacity: 0; 
		top: 0;
		right: -20px;
		transition: 0.5s; 
	}
	.textborder:hover span{
		padding-right: 25px; 
	}
	.textborder:hover span:after{
		opacity: 1; 
		right: 0; 
	}
	.alignment{
		float: right; 

	}
	.centerbuttons{
		display: flex;
		justify-content: center; 
	}
</style>
