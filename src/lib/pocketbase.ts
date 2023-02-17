import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';

// Creating a new pocketbase instance from our Lindoe server URL
// Feel free to vist this link to see the database
// http://45.56.90.168/_/
// Ping Carson on discord if you need an account set up to view the database
export const pb = new PocketBase('http://45.56.90.168:80');

// Current user variable is equal to a writable store, a svelte way of storing data
// pb.authStore.model is the default object, which is equal to NULL when the user is not logged in
// When the user logs in, pb.authStore.model is equal to the database record of the currently logged in user
export const currentUser = writable(pb.authStore.model)

// Create a callback function that will run when the authStore changes
// This will update the currentUser variable with the new authStore model
pb.authStore.onChange((auth) => {
    console.log('authStore changed', auth);
    currentUser.set(pb.authStore.model)
})