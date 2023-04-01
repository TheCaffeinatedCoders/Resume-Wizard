<script lang="ts">
	import logo from '$lib/images/LOGO.png';
</script>

<div>
	<header class="header">
		<div class="logo">
			<img src={logo} alt="LOGO" width="203" height="105" />
		</div>
		<nav class="site-links">
			<a href="/">Home</a>
			<a href="/">About</a>
			<a href="/">Contact</a>
		</nav>
	</header>
</div>

<style>
	/* CSS styles */
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #d2ffcb;
		/* color: #fff; */
		height: 80px;
		/* padding: 0 20px; */
	}

	/* .logo { */
	/* 	font-size: 30px; */
	/* 	font-weight: bold; */
	/* 	text-transform: uppercase; */
	/* } */

	.site-links {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.site-links a {
		color: #462e2e;
		text-decoration: none;
		margin-right: 20px;
		font-size: 18px;
		font-weight: bold;
		text-transform: uppercase;
	}
</style>
