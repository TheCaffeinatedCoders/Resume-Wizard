<script lang="ts">
    import { pb } from '$lib/pocketbase';
	function signOut() {
		pb.authStore.clear();
	}
    import logo from '$lib/images/LOGO.png';

</script>

<style>
		body {
			margin: 0;
			padding: 0;
			font-family: Arial, sans-serif;
		}
		header {
			background-color: #333;
			color: white;
			padding: 20px;
			text-align: center;
		}
		nav {
			background-color: #f1f1f1;
			height: 100%;
			width: 200px;
			position: fixed;
			top: 80px;
			left: 0;
			overflow-x: hidden;
			padding-top: 20px;
		}
		nav a {
			display: block;
			padding: 10px;
			color: #333;
			text-decoration: none;
		}
		nav a:hover {
			background-color: #ddd;
		}
		.main {
			margin-left: 200px;
			padding: 20px;
		}
</style>

<header>
	<img src={logo} alt="Logo">
	<h1>Resume Wizard</h1>
</header>
<nav>
    <a href="/home">Home</a>
	<a href="/home/collection">Collection</a>
	<a href="/home/edit">Edit</a>
	<button on:click={signOut}>Logout</button>
</nav>
<div class="main">
	<slot />
</div>






