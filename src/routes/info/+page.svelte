<script lang='ts'>
    let completion = "";
	async function getCompletion() {
		const response = await fetch('/api/getAICompletion');
		completion = await response.json();
        console.log(completion);
	}
</script>
<h1>Info page</h1>
<button on:click={getCompletion}>Get Completion</button>
{#if completion !== ""}
	<p>{completion}</p>
{/if}
