<script lang="ts">
 import { currentUser, pb, testString } from '$lib/pocketbase';

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
</script>

<div>
    <h1>
        {title}
        <br>
        {testString}
    </h1>
    <br>
    <button on:click={buttonAlert}>Test Alert</button>
    <br>
    <button on:click={isValid}>Verify Log In</button>
    <br>
    <button on:click={getToken}>Get Token</button>
    <br>
    <button on:click={getModel}>Get Model</button>
    <br>
    <p>isValid? {pb.authStore.isValid}</p>
    <p>Token: {pb.authStore.token}</p>
    <p>Model: {pb.authStore.model}</p>

</div>
