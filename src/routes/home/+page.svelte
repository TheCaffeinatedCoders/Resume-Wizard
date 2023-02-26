<script lang="ts">
    import { pb } from '$lib/pocketbase';
	function signOut() {
		pb.authStore.clear();
	}
</script>
<h1>Home page</h1>
<!-- Button to navigate to edit profile page -->
<a href="/edit"> <button>Edit profile</button> </a>
<button on:click={signOut}>Logout</button>