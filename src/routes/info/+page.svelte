<script lang='ts'>
    let completion = "";
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
