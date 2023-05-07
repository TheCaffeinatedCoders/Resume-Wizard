import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';
import { get } from 'svelte/store';
import { currentUser } from './pocketbase';

if (!currentUser) {
  throw new Error('currentUser is not defined');
}

let user_id = get(currentUser)?.id;

if (!user_id) {
  user_id = 'INVALID_USER_ID';
}

// Define a key name for the store that includes the user ID
export const keyName = 'resumeObjects-' + user_id;
// Create a writable store that will be saved to local storage
export const resumeStore: Writable<ResumeObject[]> = localStorageStore(keyName, []);

// Define a key name for the store that includes the user ID
export const selectedResumeObjectIndexKeyName = 'selectedResumeObjectIndex-' + user_id;
export const selectedResumeObjectIndex = localStorageStore(selectedResumeObjectIndexKeyName, 0);

export function createEmptyPersonalInfoObject(): PersonalInfoObject {
  return {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    github: '',
    linkedin: '',
  };
}

export function createEmptyEducationObject(): EducationObject {
  return {
    school: '',
    degree: '',
    startDate: new Date(),
    endDate: new Date(),
    currentlyAttending: false,
    description: '',
  };
}

export function createEmptyJobObject(): JobObject {
  return {
    company: '',
    position: '',
    startDate: new Date(),
    endDate: new Date(),
    currentlyWorking: false,
    description: '',
  };
}

export function createEmptyProjectObject(): ProjectObject {
  return {
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    technologies: [],
  };
}

export function createEmptySkillsObject(): SkillsObject {
  return {
    languages: [],
    frameworks: [],
    tools: [],
    libaries: [],
  };
}

export function createEmptyResumeObject(): ResumeObject {
  return {
    personalInfo: createEmptyPersonalInfoObject(),
    education: [],
    jobs: [],
    projects: [],
    skills: createEmptySkillsObject(),
  };
}

export function addEmptyResumeObject(): void {
  const resumeObject = createEmptyResumeObject();
  resumeStore.update((resumeObjects) => [...resumeObjects, resumeObject]);
}

export function removeResumeObject(index: number): void {
  resumeStore.update((resumeObjects) => {
    resumeObjects.splice(index, 1);
    return resumeObjects;
  });
}

export function updateResumeObject(index: number, newResumeObject: ResumeObject): void {
  resumeStore.update((resumeObjects) => {
    resumeObjects[index] = newResumeObject;
    return resumeObjects;
  });
}

export function DEBUG_resetResumeStore(): void {
  selectedResumeObjectIndex.set(-1);
  resumeStore.set([]);
}