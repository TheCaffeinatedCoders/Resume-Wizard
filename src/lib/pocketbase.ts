import PocketBase from 'pocketbase';
import { writable, get } from 'svelte/store';
import { resumeStore, refreshResumeStore } from './resumeStore';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

// Creating a new pocketbase instance from our Lindoe server URL
// Feel free to vist this link to see the database
// http://45.56.90.168/_/
// Ping Carson on discord if you need an account set up to view the database
// export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

// Current user variable is equal to a writable store, a svelte way of storing data
// pb.authStore.model is the default object, which is equal to NULL when the user is not logged in
// When the user logs in, pb.authStore.model is equal to the database record of the currently logged in user
export const currentUser = writable(pb.authStore.model)

// Create a callback function that will run when the authStore changes
// This will update the currentUser variable with the new authStore model
pb.authStore.onChange((auth) => {
  // console.log('authStore changed', auth);
  currentUser.set(pb.authStore.model)
  // console.log('currentUser', get(currentUser));
  // Refresh the resume store
  refreshResumeStore();
  // console.log('Refreshed resume store', get(resumeStore));
  if (get(currentUser)?.id != null) {
    fetchFromPocketbase();
  }
})

export const login = async (username_or_email: string, user_password: string) => {
  const authData = await pb.collection('users').authWithPassword(
    username_or_email,
    user_password,
  );
  console.log('Logged in data', authData);
  return authData;
}

export const logout = () => {
  console.log("Logged out");
  pb.authStore.clear();
}

export const sendVerifyEmail = async (email: string) => {
  let requestVerificationResponse = await pb.collection('users').requestVerification(email).then((response) => { return response });
}

export const confirmVerifyEmail = async (token: string) => {
  let confirmationVerificationResponse = await pb.collection('users').confirmVerification(token).then((response) => { return response });
}

export const requestPasswordReset = async (email: string) => {
  let requestChangePasswordResponse = await pb.collection('users').requestPasswordReset(email).then((response) => { return response });
}

export const confirmChangePassword = async (token: string, newPassword: string, newPasswordConfirm: string) => {
  let confirmChangePasswordResponse = await pb.collection('users').confirmPasswordReset(token, newPassword, newPasswordConfirm).then((response) => { return response });
}

// Function to sync the local storage with the database
export const saveToPocketbase = async () => {
  // Get the current user
  const user = get(currentUser);
  // If the user is not logged in, throw an error
  if (user?.id == null) {
    throw new Error('User is not logged in / No user id');
  }
  // Get the current resume store
  const resumeObjects = get(resumeStore);
  // If resumeObjects is not defined, throw an error
  if (!resumeObjects) {
    throw new Error('resumeObjects is not defined');
  }
  // Update the resumeObjects in the users database record
  let recordResonse = await pb.collection('users').update(user.id, {
    userData: JSON.stringify(resumeObjects),
  });
  // console.log('Synced userData record:', recordResonse);
}

// Fetch from the database and update the local storage
export const fetchFromPocketbase = async () => {
  const user = get(currentUser);
  if (user?.id == null) {
    throw new Error('User is not logged in / No user id');
  }
  let recordResonse = await pb.collection('users').getOne(user.id);
  if (recordResonse?.userData == null) {
    throw new Error('userData is not defined');
  }
  let userData = recordResonse.userData;
  resumeStore.set(userData);
}
