<script>
	import logo from '$lib/images/LOGO.png'
	import homepage_art from '$lib/images/HOMEPAGE ART.png'
</script>

<svelte:head>
	<title>Resume Wizard</title>
	<meta name="description" content="Whip up a resume with ease" />
</svelte:head>

<h10> </h10>  
<div class="head_section"><img src={logo} alt="logo" width="203" height="105"></div>

<div class="main_section">	
<p class="homepage_logo"><img src={homepage_art} alt="homepage art"width="654" height="267"></p>  

<h1 style="font-size:60px;">Resume Wizard</h1>
<!-- <h2>Whips up a resume via magic with ease</h2> -->
<!-- <button class="button button1" on:click={() => push('/info')}>Start</button> -->
<!-- <a href="/info"><button>Start</button></a> -->
</div>

<!-- <section>
	<h1>Resume Wizard!</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>
</section> -->

<style>
	/* TEMPLATE DEFAULT CSS */
	/* section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	} */
	@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
	div {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
		bottom: 0;

        background-color: rgba(175, 174, 224, 0.5);
    }

	h1 {
		font-family: 'Itim', cursive;
        margin-top: 40px;
        margin-bottom: 40px;

	}
	.homepage_logo{
		padding-top: 100px;
		padding-left: 100px;
		margin-top: 100px;

	}
	.main_section{
		display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
	}
	.head_section{
		background-color: rgba(175, 174, 224, 0.0);
		margin-left: 16px;
		margin-top: 16px;
		
	}
</style>
