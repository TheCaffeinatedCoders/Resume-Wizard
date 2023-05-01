import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';

// Creating a new pocketbase instance from our Lindoe server URL
// Feel free to vist this link to see the database
// http://45.56.90.168/_/
// Ping Carson on discord if you need an account set up to view the database
export const pb = new PocketBase('https://ResumeWizard.tech');

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

export const testString = "Hello from Pocketbase.ts!"

export const testFunction = () => {
  console.log("This is a test function");
  alert("This is a test function");
}

export const login = async (username_or_email: string, user_password: string) => {
  const authData = await pb.collection('users').authWithPassword(
    username_or_email,
    user_password,
  );
  console.log('authData', authData);
  return authData;
}

export const logout = () => {
  pb.authStore.clear();
}

// Broken google Oauth direct URL

// export const OauthSignIn = async () => {
//   console.log('OauthSignIn...')
//   const authData = await pb.collection('users').authWithOAuth2(
//     'google',
//     'CODE',
//     'VERIFIER',
//     'http://ResumeWizard.tech/api/oauth2-redirect',
//     // optional data that will be used for the new account on OAuth2 sign-up
//     // {
//     //   'name': 'test',
//     // },
//   );
//   console.log('authData', authData);

//   // after the above you can also access the auth data from the authStore
//   console.log(pb.authStore.isValid);
//   console.log(pb.authStore.token);
//   console.log(pb.authStore.model?.id);
// }