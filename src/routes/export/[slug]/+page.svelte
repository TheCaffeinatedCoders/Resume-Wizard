<script lang="ts">
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	import { get } from 'svelte/store';
	import { resumeStore, createEmptyResumeObject } from '$lib/resumeStore';

	export let data;
	let resumeData: ResumeObject = createEmptyResumeObject();

	onMount(() => {
		// console.log(data);
		resumeData = get(resumeStore)[data.slug];
		// console.log(currentResumeObject);
		if (!resumeData) throw error(404);
		console.log(JSON.stringify(resumeData));
    resumeData.education.forEach(item => {
      item.startDate = new Date(item.startDate);
      item.endDate = new Date(item.endDate);
    });
    resumeData.jobs.forEach(item => {
      item.startDate = new Date(item.startDate);
      item.endDate = new Date(item.endDate);
    });
    resumeData.projects.forEach(item => {
      item.startDate = new Date(item.startDate);
      item.endDate = new Date(item.endDate);
    });
	});

  function numberToDegree(DegreeNumber: string) {
    let DegreeInt = parseInt(DegreeNumber);
    if (isNaN(DegreeInt)) {
      return DegreeNumber
    }

    switch (DegreeInt) {
      case 1:
        return 'Bachelor of Arts';
      case 2:
        return 'Bachelor of Science';
      case 3:
        return 'BBA';
      case 4:
        return 'High School Diploma';
      case 5:
        return 'GED';
      case 6:
        return 'Associate of Arts';
      case 7:
        return 'Associate of Science';
      case 8:
        return 'Associate of Applied Science';
      case 9:
        return 'Master of Arts';
      case 10:
        return 'Master of Science';
      case 11:
        return 'Master of Business Administration';
      case 12:
        return 'J.D.';
      case 13:
        return 'M.D.';
      case 14:
        return 'Ph.D.';
    }
  }




</script>

<!-- <h1>Export page</h1> -->
<!-- <p>Slug: {data.slug}</p> -->
<!-- <p>Resume Object: {JSON.stringify(currentResumeObject)}</p> -->

<!-- Generate a resume with the given information -->

<div class="resume">
	<header>
		<h1>{resumeData.personalInfo.name}</h1>
		<ul>
			<li>{resumeData.personalInfo.phoneNumber}</li>
			<li>{resumeData.personalInfo.email}</li>
			<li>{resumeData.personalInfo.github}</li>
			<li>{resumeData.personalInfo.linkedin}</li>
		</ul>
    <hr>
	</header>

	<section>
    <h2>Education</h2>
    {#each resumeData.education as educationItem}
    <div class="education">

      <div class="verticalAlign">
        <h3>{educationItem.school}</h3>
        <p>{educationItem.location}</p>
      </div>
      <div class="verticalAlign">
        <p><em>{numberToDegree(educationItem.degree)}</em></p>
        <p>
          <em>
            {#if educationItem.currentlyAttending}
              Present
            {:else}
              {educationItem.startDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })} - 
              {educationItem.endDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            {/if}
          </em>
        </p>
      </div>
     
      <!-- <p>Description: {educationItem.description}</p> -->
    </div>
    {/each}
  </section>

	<section>
    <h2>Work Experience</h2>
    {#each resumeData.jobs as job}
      <div>
        <div class="verticalAlign">
          <h3>{job.company}</h3>
          <p>{job.location}</p>
        </div>
        <div class="verticalAlign">
          <p class="tI">{job.position}</p>
          <p class="tI">
            {#if job.currentlyWorking}
              Present
            {:else}
              {job.startDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })} -
              {job.endDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            {/if}
          </p>
        </div>
        <ul>
          {#each job.description.split('. ') as sentence (sentence)}
            {#if sentence}
              <li>{sentence}.</li>
            {/if}
          {/each}
        </ul>
      </div>
    {/each}
  </section>

	<section>
		<h2>Projects</h2>
		{#each resumeData.projects as project}
			<div class="verticalAlign">
				<p><strong>{project.name}</strong> |
          {@html project.technologies.map((tech, index) => `${tech}${index < project.technologies.length - 1 ? ', ' : ''}`).join('')}
        </p>
				<p class="tI">
					{project.startDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })} - {project.inProgress ? 'Present' : project.endDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
				</p>
			</div>
        <ul>
          {#each project.description.split('. ') as sentence (sentence)}
            {#if sentence}
              <li>{sentence}.</li>
            {/if}
          {/each}
        </ul>
		{/each}
	</section>

	<section>
		<h2>Skills</h2>
		<div class="skills">
			<div>
				<h3>Languages</h3>
				<ul>
					{#each resumeData.skills.languages as lang}
						<li>{lang}</li>
					{/each}
				</ul>
			</div>
			<div>
				<h3>Frameworks</h3>
				<ul>
					{#each resumeData.skills.frameworks as framework}
						<li>{framework}</li>
					{/each}
				</ul>
			</div>
			<div>
				<h3>Tools</h3>
				<ul>
					{#each resumeData.skills.tools as tool}
						<li>{tool}</li>
					{/each}
				</ul>
			</div>
			<div>
				<h3>Libraries</h3>
				<ul>
					{#each resumeData.skills.libraries as library}
						<li>{library}</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

</div>

<style>

  * {
    margin: 0;
    padding: 0;
  }

  h2 {
    margin-bottom: 5px;
  }

  ul {
    margin-top: 5px;
    margin-left: 50px;
  }

  .verticalAlign {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-left: 20px;

  }

  .tI {
    font-style: italic;
  }


  .resume {
    font-family: Arial, sans-serif;
    padding: 20px;
  }

  .resume header {
    text-align: center;
    margin-bottom: 20px;
  }

  .resume header h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .resume header ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
  }

  .resume header li {
    display: inline-block;
  }

  .resume header li::after {
    content: "|";
    margin-left: 10px;
    margin-right: 6px;
  }

  .resume header li:last-child::after {
    content: "";
    margin-left: 10px;
    margin-right: 10px;
  }

  .resume section:not(:last-child) {
    margin-bottom: 20px;
  }

  .resume hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 20px 0;
  }

  .education {
    margin-bottom: 10px;
  }

  .education h3 {
    font-weight: bold;
  }

  .education p strong {
    font-weight: bold;
  }

  .education p em {
    font-style: italic;
  }

  .education p.right-align {
    text-align: right;
  }

  /* .job {
    margin-bottom: 20px;
  }

  .job h3 {
    font-weight: bold;
  }


  .job .date {
    text-align: right;
    font-style: italic;
  }

  .project {
  margin-bottom: 20px;
}

.project h3 {
  font-weight: bold;
}

.project p {
  margin-bottom: 10px;
}

.project .date {
  text-align: right;
  font-style: italic;
} */

.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 10px;
  margin-top: 25px;
}

.skills h3 {
  font-weight: bold;
  margin-bottom: 10px;
}

.skills ul {
  padding: 0;
  margin: 0;
}

.skills ul li {
  list-style-type: none;
}

</style>
