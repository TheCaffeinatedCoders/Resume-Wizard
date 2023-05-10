// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

declare class PersonalInfoObject {
	name: string
	phoneNumber: string
	email: string
	address: string
	city: string
	state: string
	zipCode: string
	github: string
	linkedin: string
}

declare class EducationObject {
	school: string
	degree: string
	location: string
	startDate: Date
	endDate: Date
	currentlyAttending: boolean
	description: string
}

declare class JobObject {
	company: string
	position: string
	location: string
	startDate: Date
	endDate: Date
	currentlyWorking: boolean
	description: string
}

declare class ProjectObject {
	name: string
	startDate: Date
	endDate: Date
	inProgress: boolean	
	description: string
	technologies: string[]
}

declare class SkillsObject {
	languages: string[]
	frameworks: string[]
	tools: string[]
	libraries: string[]
}

declare class ResumeMetadataObject {
	name: string
	createdDate: Date
	updatedDate: Date
}

declare class ResumeObject {
	resumeMetadata: ResumeMetadataObject
	personalInfo: PersonalInfoObject
	education: EducationObject[]
	jobs: JobObject[]
	projects: ProjectObject[]
	skills: SkillsObject
}