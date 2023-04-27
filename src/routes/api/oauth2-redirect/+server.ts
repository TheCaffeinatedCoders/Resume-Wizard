// Broken google Oauth direct URL
// import { pb } from '$lib/pocketbase';

// export async function POST(request: Request): Promise<Response> {
//   try {
//     const { code, verifier } = await request.json();
//     if (!code || !verifier) {
//         console.log("Code and Verifier not found!");
//     //   return {
//     //     status: 400,
//     //     body: { success: false, error: 'Invalid request' },
//     //   };
//         return new Response("Code and Verifier not found!")
//     }
//     const authData = await pb.collection('users').authWithOAuth2(
//       'google',
//       code,
//       verifier,
//       'http://ResumeWizard.tech/api/oauth2-redirect'
//     );

//     // Set a cookie with the auth token or store it in the session
//     // Return a success response with the auth data
//     // return {
//     // //   status: 200,
//     // //   body: JSON.stringify({ success: true, data: authData }),
//     // //   headers: { 'Content-Type': 'application/json' },
//     //     response()
//     // };
//     return new Response(String(authData))

//   } catch (error) {
//     // Return an error response
//     // return {
//     //   status: 400,
//     //   body: JSON.stringify({ success: false, error: error.message }),
//     //   headers: { 'Content-Type': 'application/json' },
//     // };
//     return new Response(String(error))
//   }
// }
