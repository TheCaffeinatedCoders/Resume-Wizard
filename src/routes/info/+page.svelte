<script lang='ts'>
    let completion = "";
	let imageURL = "";

	let completion_loading = false;
	let error = false;


	async function getCompletion() {
		completion_loading = true;
		const response = await fetch('/api/getAICompletion');
		if (!response.ok) {
			error = true;
		} else {
			completion = await response.json();
			console.log(completion);
			error = false;
		}
		completion_loading = false;
	}

	async function getImage() {
		completion_loading = true;
		const response = await fetch('/api/getImage');
		if (!response.ok) {
			error = true;
		} else {
			imageURL = await response.json();
			error = false;
		}
		completion_loading = false;
	}



</script>

<h1>Info page</h1>

<button on:click={getCompletion}>Get Completion</button>
{#if completion_loading}
	<p>Loading...</p>
{:else}
	{#if error}
		<p>An error has occurred. Make sure you have set your API key with `export OPENAI_API_KEY='key'`</p>
	{/if}
	{#if completion !== ""}
		<p>{JSON.stringify(completion)}</p>
	{/if}
{/if}

<button on:click={getImage}>Get Image</button>
{#if completion_loading}
	<p>Loading...</p>
{:else}
	{#if error}
		<p>An error has occurred. Make sure you have set your API key with `export OPENAI_API_KEY='key'`</p>
	{/if}
	{#if imageURL !== ""}
		<img src={imageURL} alt="random image display" />
	{/if}
{/if}
