import type { Handle } from '@sveltejs/kit';
import { currentUser, pb } from '$lib/pocketbase';

export const handle: Handle = async ({ event, resolve }) => {

  // If the user is not authenticated, redirect them to the login page
  if (!currentUser && event.url.pathname !== '/') {
    return new Response(null, {
      status: 302,
      headers: {
        location: '/'
      }
    });
  }

  // Continue with the normal route resolution
  const response = await resolve(event);
  return response;
};
