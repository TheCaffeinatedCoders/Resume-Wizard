import { get } from 'svelte/store';
import { resumeStore } from '$lib/resumeStore';
// import { goto } from '$app/navigation';
import { jsPDF } from 'jspdf';


export let generateResume = (resumeIndex: number) => {
    if (!get(resumeStore)[resumeIndex]) {
        console.log('Resume does not exist to export');
        // goto('/home');
    } else {
        let resume = get(resumeStore)[resumeIndex];
        console.log(resume);

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
        doc.text(JSON.stringify(resume.personalInfo), 10, yOffset);
        yOffset += 10;

        // Add Education section
        doc.setFontSize(12);
        doc.text('Education', 10, yOffset);
        yOffset += 10;
        resume.education.forEach((edu: EducationObject) => {
            doc.text(JSON.stringify(edu), 10, yOffset);
            yOffset += 10;
        });

        // Add Work Experience section
        doc.setFontSize(12);
        doc.text('Work Experience', 10, yOffset);
        yOffset += 10;
        resume.jobs.forEach((job: JobObject) => {
            doc.text(JSON.stringify(job), 10, yOffset);
            yOffset += 10;
        });

        // Add Projects section
        doc.setFontSize(12);
        doc.text('Projects', 10, yOffset);
        yOffset += 10;
        resume.projects.forEach((project: ProjectObject) => {
            doc.text(JSON.stringify(project), 10, yOffset);
            yOffset += 10;
        });

        // Add Skills section
        doc.setFontSize(12);
        doc.text('Skills', 10, yOffset);
        yOffset += 10;
        doc.text(JSON.stringify(resume.skills), 10, yOffset);

        // Save the generated PDF
        doc.save('resume-wizard-test.pdf');
    }
}