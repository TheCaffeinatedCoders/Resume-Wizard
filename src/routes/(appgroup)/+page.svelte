<script lang="ts">
	import ResumesImg from '$lib/images/ResumesImg.png';
	import LoginImg from '$lib/images/LoginImg.png';
	import GptButtonImg from '$lib/images/GPTButton.png';
	import grandPa from '$lib/images/resumeWizard.png';

  import v1 from '$lib/images/1video.gif';
  import v2 from '$lib/images/2video.gif';
  import v3 from '$lib/images/3video.gif';
  // import v4 from '$lib/images/4video.gif';
  import v5 from '$lib/images/5video.gif';
  


    // Define the action
  function animateOnScroll(node, { animationClass }) {
    // Create the observer
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // The `isIntersecting` property is true when the element is in view
        if (entry.isIntersecting) {
          // Add the animation class
          node.classList.add(animationClass);
          // Optional: Stop observing the element after it has animated once
          observer.unobserve(node);
        }
      });
    });

    // Start observing the element
    observer.observe(node);

    // Return an object with a `destroy` method that will be called when the element is removed
    return {
      destroy() {
        // Stop observing the element
        observer.unobserve(node);
      }
    };
  }

</script>

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Shadows+Into+Light&display=swap" rel="stylesheet">
</head>


<div>
	<h1 class="titleFont bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text text-transparent">Welcome to Resume Wizard</h1>
  <br>
	<div class="flex items-center justify-between">
		<div class="flex-1 mr-5">
			<p class="text-xl font-serif tracking-widest animate-fadeIn">
				Our mission is to create exceptional, personalized resumes for everyone. We leverage the
				power of Artificial Intelligence to craft perfect narratives of your work experiences and
				projects. Our AI understands your unique career path, highlights your key achievements, and
				adapts to your individual needs. As the job market evolves, our AI learns and adjusts to the
				latest industry trends, ensuring your resume remains cutting-edge. We're not just building
				resumes; we're helping to shape confident professionals and open doors to new opportunities.
				Join us, and let's create a resume that stands out.
			</p>
		</div>
    <div class="rounded-xl">
      <img src={grandPa} class="w-96 h-96 animate-pulse rounded-2xl" alt="resume wizard grandpa" />
    </div>
	</div>

  <br>
  <br>
	<!-- <div class="card">
        <header class="card-header">Click "Create Resumes" to begin a resume creation journey</header>
        <section class="p-4">Login to a cloud account to save progress across multiple devices</section>
        <footer class="card-footer">Export to beautiful PDF files</footer>
    </div> -->
	<div class="howToColumn">

    <h1 class="titleFont bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text text-transparent">About Resume Wizard</h1>


    <div class="flex items-center justify-between animate-fadeLeft" >
      <div class="flex-1 mr-5">
        <p class="text-xl font-serif tracking-widest ">
          Click "New Resume" to begin a resume creation journey
        </p>
      </div>
      <img class="block card w-3/6" src={v1} alt="Resumes Example" />
    </div>

    <div class="flex items-center justify-between" use:animateOnScroll={{animationClass: 'animate-fadeRight'}}>
      <img class="block card w-3/6" src={v2} alt="Resumes Example" />
      <div class="flex-1 ml-7 text-right">
        <p class="text-xl font-serif tracking-widest animate-fadeRight">
          Once you reach to the point to add the description, utilize AI touch up button to brush up your descriptions to a stronger compelling sentences        </p>
      </div>
    </div>

    <div class="flex items-center justify-between" use:animateOnScroll={{ animationClass: 'animate-fadeLeft' }}>
      <div class="flex-1 mr-5">
        <p class="text-xl font-serif tracking-widest" >
          Lastly click "complete" to view the complete version of your resume
        </p>
      </div>
      <img class="block card w-3/6" src={v3} alt="Resumes Example" />
    </div>


    <div class="flex items-center justify-between" use:animateOnScroll={{ animationClass: 'animate-fadeRight' }}>
      <img class="block card w-3/6" src={v5} alt="Resumes Example" />
      <div class="flex-1 ml-5 text-right">
        <p class="text-xl font-serif tracking-widest " >
          Refresh the page to see your resume with white background, and press cmd+p or ctrl+p to save your resume as pdf version   </p>
      </div>
    </div>



	</div>




</div>

<style>

  .titleFont {
    font-size: 4rem;
    font-family: 'Cormorant Garamond', serif;
/* font-family: 'Shadows Into Light', cursive;  */
  }


  .howToColumn {
    margin-top: 50px;
  }

  .howToColumn div {
    margin-top: 50px;
  }


	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.animate-fadeIn {
		animation: fadeIn 3s ease-in-out;
	}


  @keyframes fadeInLeft {
   0% {
      opacity: 0;
      transform: translateX(-20px);
   }
   100% {
      opacity: 1;
      transform: translateX(0);
   }
}   
  .animate-fadeLeft {
    animation: fadeInLeft 3s ease-in-out;
  }


  @keyframes fadeInRight {
   0% {
      opacity: 0;
      transform: translateX(20px);
   }
   100% {
      opacity: 1;
      transform: translateX(0);
   }
}   
  .animate-fadeRight {
    animation: fadeInRight 3s ease-in-out;
  }


	.animate-pulse {
		animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) 1;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
