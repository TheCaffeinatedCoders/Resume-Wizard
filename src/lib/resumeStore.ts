import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';
import { get } from 'svelte/store';
import { currentUser } from './pocketbase';
import { goto } from '$app/navigation';
import { create } from 'lodash';

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
    name: '',
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
    school: '(New Education Item)',
    degree: '',
    location: '',
    startDate: new Date(),
    endDate: new Date(),
    currentlyAttending: false,
    description: '',
  };
}

export function createEmptyJobObject(): JobObject {
  return {
    company: '',
    position: '(New Job Item)',
    location: '',
    startDate: new Date(),
    endDate: new Date(),
    currentlyWorking: false,
    description: '',
  };
}

export function createEmptyProjectObject(): ProjectObject {
  return {
    name: '(New Project Item)',
    startDate: new Date(),
    endDate: new Date(),
    inProgress: true,
    description: '',
    technologies: [],
  };
}

export function createEmptySkillsObject(): SkillsObject {
  return {
    languages: [],
    frameworks: [],
    tools: [],
    libraries: [],
  };
}

export function createResumeMetadataObject(): ResumeMetadataObject {
  return {
    name: '',
    createdDate: new Date(),
    updatedDate: new Date(),
  };
}

function createEmptyEducationObjectArray(): EducationObject[] {
  let a = [];
  a.push(createEmptyEducationObject());
  return a;
}

function createEmptyJobObjectArray(): JobObject[] {
  let a = [];
  a.push(createEmptyJobObject());
  return a;
}

function createEmptyProjectObjectArray(): ProjectObject[] {
  let a = [];
  a.push(createEmptyProjectObject());
  return a;
}

export function createEmptyResumeObject(): ResumeObject {
  return {
    resumeMetadata: createResumeMetadataObject(),
    personalInfo: createEmptyPersonalInfoObject(),
    education: createEmptyEducationObjectArray(),
    jobs: createEmptyJobObjectArray(),
    projects: createEmptyProjectObjectArray(),
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
  goto('/home');
}