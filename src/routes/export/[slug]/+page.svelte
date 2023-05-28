<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { resumeStore } from '$lib/resumeStore';
	import { goto } from '$app/navigation';

	import { jsPDF } from 'jspdf';

	let exportedResumeIndex: number = +$page.params.slug;
	let data: ResumeObject;
	onMount(() => {
		if (!get(resumeStore)[exportedResumeIndex]) {
			console.log('Resume does not exist to export');
			goto('/home');
		} else {
			data = get(resumeStore)[exportedResumeIndex];
			console.log(data);

			const doc = new jsPDF();
			let yOffset = 10;

			// Add Resume title
			doc.setFontSize(16);
			doc.text('Resume Test', 10, yOffset);
			yOffset += 10;

			// Add Personal Information section
			doc.setFontSize(12);
			doc.text('Personal Information', 10, yOffset);
			yOffset += 10;
			doc.text(JSON.stringify(data.personalInfo), 10, yOffset);
			yOffset += 10;

			// Add Education section
			doc.setFontSize(12);
			doc.text('Education', 10, yOffset);
			yOffset += 10;
			data.education.forEach((edu: EducationObject) => {
				doc.text(JSON.stringify(edu), 10, yOffset);
				yOffset += 10;
			});

			// Add Work Experience section
			doc.setFontSize(12);
			doc.text('Work Experience', 10, yOffset);
			yOffset += 10;
			data.jobs.forEach((job: JobObject) => {
				doc.text(JSON.stringify(job), 10, yOffset);
				yOffset += 10;
			});

			// Add Projects section
			doc.setFontSize(12);
			doc.text('Projects', 10, yOffset);
			yOffset += 10;
			data.projects.forEach((project: ProjectObject) => {
				doc.text(JSON.stringify(project), 10, yOffset);
				yOffset += 10;
			});

			// Add Skills section
			doc.setFontSize(12);
			doc.text('Skills', 10, yOffset);
			yOffset += 10;
			doc.text(JSON.stringify(data.skills), 10, yOffset);

			// Save the generated PDF
			doc.save('resume-wizard-test.pdf');
		}
	});
</script>

<div id="html2canvas" style="display: block; width: 90%; margin: auto;">
	<h1>Resume Test</h1>
	<h2>Personal Information</h2>
	<p>{JSON.stringify(data?.personalInfo || '')}</p>
	<h2>Education</h2>
	<p>{JSON.stringify(data?.education || '')}</p>
	<h2>Work Experience</h2>
	<p>{JSON.stringify(data?.jobs || '')}</p>
	<h2>Projects</h2>
	<p>{JSON.stringify(data?.projects || '')}</p>
	<h2>Skills</h2>
	<p>{JSON.stringify(data?.skills || '')}</p>
</div>
