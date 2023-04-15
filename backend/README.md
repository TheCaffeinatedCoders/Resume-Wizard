
# Table of Contents

1.  [Resume Wizard Backend API](#org733a005)
    1.  [Current Routes](#org7b67222)
    2.  [Build / Deploy instructions](#org06c5aee)
    3.  [Functions](#org3f26c0e)
        1.  [User Authentication](#org4fa7067)



<a id="org733a005"></a>

# Resume Wizard Backend API


<a id="org7b67222"></a>

## Current Routes

127.0.0.1:8080/api/greet/Carson

Prints hello to the name given in path

127.0.0.1:8080/api/AItest

Prints a test poem about a resume wizard demonstrating the AI completion request works


<a id="org06c5aee"></a>

## Build / Deploy instructions

Make sure to have a .env file set with an openAI API key. Check the discord to find the key if you don&rsquo;t have one on hand

The .env file should live in backend/.env with contents

    export OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

To deploy the api, navigate to the backend directory

    cd backend/

And build / start with the cargo run command

    cargo run

Cargo is a Rust all in one tool for managing projects. Running the backend requires the Rust programming language to be installed on your computer. For instructions on installing Rust and Cargo, checkout the Rust homepage and run their install script.

[Rust Install](https://www.rust-lang.org/tools/install)

    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


<a id="org3f26c0e"></a>

## TODO Functions


<a id="org4fa7067"></a>

### User Authentication

1.  /api/auth/register

    This API endpoint will handle user registration. When the user fills out the registration form, the front-end will send a request to this endpoint. The endpoint will then use the Pocketbase SDK to create a new user in the database. If the user already exists, it will return an error message.

2.  /api/auth/login

    This API endpoint will handle user login. When the user enters their email and password on the front-end, the front-end will send a request to this endpoint. The endpoint will then use the Pocketbase SDK to check if the email and password are correct. If they are, the endpoint will generate a token and return it to the front-end.

3.  /api/auth/logout

    This API endpoint will handle user logout. When the user clicks the logout button on the front-end, the front-end will send a request to this endpoint. The endpoint will then use the Pocketbase SDK to revoke the user&rsquo;s token.

4.  /api/auth/verify

    This API endpoint will handle token verification. When the front-end sends a request to a protected endpoint, it will include the user&rsquo;s token in the request headers. The protected endpoint will then send a request to this endpoint to verify the token. If the token is valid, the protected endpoint will continue with its operation. If the token is invalid or has expired, the protected endpoint will return an error message.

