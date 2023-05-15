<script lang="ts">
	import { goto } from '$app/navigation';

	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import Mainpage from '$lib/components/Mainpage.svelte';
	import Login from '$lib/components/Login.svelte';

	import Profile from '$lib/components/Profile.svelte';
</script>

<svelte:head>
	<title>Resume Wizard</title>
	<meta name="description" content="Whip up a resume with ease" />
</svelte:head>

<div class="homecontainer">
	<div class="background overflow-auto">
		<div class="FirstImage">
			<img src="../src/lib/images/company motto.png" alt="companymotto" />
		</div>
		<div class="centerbuttons">
			<div class="textborder">
				<a href="/login">
					<span class="text-pink-400"> Get your new Resume </span>
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.background {
		background-image: linear-gradient(pink, white);
		width: 100vw;
		height: 100vh;
	}
	.textborder {
		background-color: white;

		width: 300px;
		color: pink;
		display: inline-block;
		text-align: center;
		text-decoration-color: black;
		font-size: 20px;
		padding: 10px;
		margin: 20px;
		cursor: pointer;
		border-radius: 12px;
		transition: all 0.5s;
	}
	.textborder span {
		cursor: pointer;
		display: inline-block;
		position: relative;
		transition: 0.5s;
	}
	.textborder span:after {
		content: '\00bb';
		position: absolute;
		opacity: 0;
		top: 0;
		right: -20px;
		transition: 0.5s;
	}
	.textborder:hover span {
		padding-right: 25px;
	}
	.textborder:hover span:after {
		opacity: 1;
		right: 0;
	}
	.FirstImage {
		display: block;
	}
	.centerbuttons {
		display: flex;
		justify-content: center;
	}
</style>
