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
      doc.text(resume.personalInfo.name, 105, yOffset, { align: 'center' });
  
      // Add Personal Information section
      doc.setFontSize(12);
      yOffset += 20;
      doc.text(resume.personalInfo.email, 105, yOffset, { align: 'center' });
      yOffset += 10;
      doc.text(resume.personalInfo.phoneNumber, 105, yOffset, { align: 'center' });
      yOffset += 10;
      doc.text(resume.personalInfo.github, 105, yOffset, { align: 'center' });
      yOffset += 10;
      doc.text(resume.personalInfo.linkedin, 105, yOffset, { align: 'center' });
      yOffset += 10;

      // Add horizontal line as divider
      doc.setLineWidth(0.5);
      doc.line(20, yOffset, 190, yOffset);
      yOffset += 10;
  
      // Add Education section
      doc.setFontSize(12);
      doc.text('Education', 105, yOffset, { align: 'center' });
      yOffset += 10;
      resume.education.forEach((edu: EducationObject) => {
        doc.setFontSize(10);
        const educationText = `${edu.degree} in ${edu.school} (${edu.startDate} - ${edu.endDate})`;
        const splitEducationText = doc.splitTextToSize(educationText, 170);
        doc.text(splitEducationText, 20, yOffset);
        yOffset += splitEducationText.length * 5 + 10;
      });
  
      // Add Work Experience section
      doc.setFontSize(12);
      doc.text('Work Experience', 105, yOffset, { align: 'center' });
      yOffset += 10;
      resume.jobs.forEach((job: JobObject) => {
        doc.setFontSize(10);
        const jobText = `${job.position} at ${job.company} (${job.startDate} - ${job.endDate})`;
        const splitJobText = doc.splitTextToSize(jobText, 170);
        doc.text(splitJobText, 20, yOffset);
        yOffset += splitJobText.length * 5 + 10;
      });
  
      // Add Projects section
      doc.setFontSize(12);
      doc.text('Projects', 105, yOffset, { align: 'center' });
      yOffset += 10;
      resume.projects.forEach((project: ProjectObject) => {
        doc.setFontSize(10);
        const projectText = `${project.name} (${project.startDate} - ${project.endDate})`;
        const splitProjectText = doc.splitTextToSize(projectText, 170);
        doc.text(splitProjectText, 20, yOffset);
        yOffset += splitProjectText.length * 5 + 10;
      });
  
      // Add Skills section
      doc.setFontSize(12);
      doc.text('Skills', 105, yOffset, { align: 'center' });
      yOffset += 10;
      const skillsText = Object.keys(resume.skills)
        .map(category => `${category}: ${resume.skills[category].join(', ')}`)
        .join(', ');
      const splitSkillsText = doc.splitTextToSize(skillsText, 170);
      doc.text(splitSkillsText, 20, yOffset);
  
      // Save the generated PDF
      doc.save('resume-wizard-test.pdf');
    }
  }
