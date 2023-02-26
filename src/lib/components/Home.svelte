<script lang="ts">
	import logo from '$lib/images/LOGO.png';
	import homepage_art from '$lib/images/HOMEPAGE ART.png';
</script>

<div class="head_section">
	<img src={logo} alt="logo" width="203" height="105" />
</div>

<div class="main_section">
	<img src={homepage_art} alt="homepage art" width="654" height="267" />

	<h1 class="home_title" style="font-size:60px;">Resume Wizard</h1>
	<h2>Whips up a resume via magic with ease</h2>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');

	.home_title {
		font-family: 'Itim', cursive;
		/* margin-top: 40px; */
		/* margin-bottom: 40px; */
	}
	.main_section {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}
	.head_section {
		background-color: rgba(175, 174, 224, 0);
		margin-left: 16px;
		margin-top: 16px;
	}
</style>
