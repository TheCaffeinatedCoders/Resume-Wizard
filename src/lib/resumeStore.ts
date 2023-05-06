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
export const keyName = 'resumeObjects-${user_id}';
// Create a writable store that will be saved to local storage
export const resumeStore: Writable<ResumeObject[]> = localStorageStore(keyName, []);
