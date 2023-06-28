<script lang="ts">
import ResumesImg from '$lib/images/ResumesImg.png';
import LoginImg from '$lib/images/LoginImg.png';
import GptButtonImg from '$lib/images/GPTButton.png'

</script>
<div>
    <h1>About Resume Wizard</h1>
    <!-- <div class="card">
        <header class="card-header">Click "Create Resumes" to begin a resume creation journey</header>
        <section class="p-4">Login to a cloud account to save progress across multiple devices</section>
        <footer class="card-footer">Export to beautiful PDF files</footer>
    </div> -->
    <div class="columns-1">
        <div>
            <a class="block card card-hover p-4" href="/home">Click "Create Resumes" to begin a resume creation journey</a>
            <img class="block card" src={ResumesImg} alt="Resumes Example" />
        </div>
        <div>
            <a class="block card card-hover p-4" href="/login">Optionally, login to a cloud account to save progress across multiple devices</a>
            <img class="block card h-3/6 w-3/6" src={LoginImg} alt="Login Example" />
        </div>
        <div>
            <a class="block card card-hover p-4" href="/home">Use the AI Touchup Button to fix grammer, introduce action verbs, and strengthen your description to better suit a resume</a>
            <img class="block card h-3/6 w-3/6" src={GptButtonImg} alt="Login Example" />
        </div>
        <div class="block card p-4">Lastly, print your resume from the website to a PDF document! (CTRL/CMD + P)</div>
        <div class="block card p-4">This may require a page refresh to remove coloring</div>
    </div>
</div>