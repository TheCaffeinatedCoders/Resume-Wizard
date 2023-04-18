<script lang="ts">
 import { currentUser, pb, testString, testFunction, login, logout } from '$lib/pocketbase';

 const title = "Auth Tests";

 function buttonAlert() {
     alert("Button clicked!");
 }
 function isValid() {
     alert(pb.authStore.isValid);
 }
 function getToken() {
     alert(pb.authStore.token);
 }
 function getModel() {
     alert(pb.authStore.model);
 }

 let returnData: string = "";

 async function getDataIfLoggedIn() {
     if (pb.authStore.isValid) {
         alert("Logged in!");
         let userid = pb.authStore.model.id;
         console.log('userid', userid);
         const userData = await pb.collection('users').getOne(userid);
         console.log('userData', userData);
         console.log(returnData);
         returnData = userData.userData;
     } else {
         alert("Not logged in!");
     }
 }

 let username = "carson"
 let password = "carsoncarson"
</script>

<div>
    <h1>
        {title}
        <br>
        {testString}
    </h1>
    <br>
    <!-- <button on:click={buttonAlert}>Test Alert</button>
         <br>
         <button on:click={isValid}>Verify Log In</button>
         <br>
         <button on:click={getToken}>Get Token</button>
         <br>
         <button on:click={getModel}>Get Model</button>
         <br> -->
    <button on:click={testFunction}>Test Function</button>
    <br>
    <p>isValid? {pb.authStore.isValid}</p>
    <p>Token: {pb.authStore.token}</p>
    <p>Model: {pb.authStore.model}</p>
    <p>Model.id: {pb.authStore.model?.id}</p>
    <br>
    <button on:click={() => login(username, password)}>Log In with user: {username} password: {password}</button>
    <br>
    <button on:click={logout()}>Log out of account</button>
    <br>
    <button on:click={() => getDataIfLoggedIn()}>Get Data if Logged In</button>
    <br>
    <p>Return Data: {returnData}</p>

</div>
