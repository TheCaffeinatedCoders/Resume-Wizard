
# Table of Contents

1.  [Resume Wizard Backend API](#org047a136)
    1.  [Current Routes](#orgde1fc16)
    2.  [Build / Deploy instructions](#orgee8b0a6)
    3.  [Functions](#orgf88e634)
        1.  [User Authentication](#orgb9801fd)
        2.  [Rust Pocketbse sdk crate notes](#orgf50254d)



<a id="org047a136"></a>

# Resume Wizard Backend API


<a id="orgde1fc16"></a>

## Current Routes

127.0.0.1:8080/api/greet/Carson

Prints hello to the name given in path

127.0.0.1:8080/api/AItest

Prints a test poem about a resume wizard demonstrating the AI completion request works


<a id="orgee8b0a6"></a>

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


<a id="orgf88e634"></a>

## TODO Functions


<a id="orgb9801fd"></a>

### User Authentication

1.  /api/auth/register

    This API endpoint will handle user registration. When the user fills out the registration form, the front-end will send a request to this endpoint. The endpoint will then use the Pocketbase SDK to create a new user in the database. If the user already exists, it will return an error message.

2.  /api/auth/login

    This API endpoint will handle user login. When the user enters their email and password on the front-end, the front-end will send a request to this endpoint. The endpoint will then use the Pocketbase SDK to check if the email and password are correct. If they are, the endpoint will generate a token and return it to the front-end.

3.  /api/auth/logout

    This API endpoint will handle user logout. When the user clicks the logout button on the front-end, the front-end will send a request to this endpoint. The endpoint will then use the Pocketbase SDK to revoke the user&rsquo;s token.

4.  /api/auth/verify

    This API endpoint will handle token verification. When the front-end sends a request to a protected endpoint, it will include the user&rsquo;s token in the request headers. The protected endpoint will then send a request to this endpoint to verify the token. If the token is valid, the protected endpoint will continue with its operation. If the token is invalid or has expired, the protected endpoint will return an error message.


<a id="orgf50254d"></a>

### Rust Pocketbse sdk crate notes

    
    // Models to import and use
    use pocketbase_sdk::client::Client;
    use pocketbase_sdk::user::UserTypes;
    use pocketbase_sdk::records::operations::{
      list, view, delete, create
    };
    
    
    pub struct PocketbaseClient {
        pub base_url: Url,
        pub user: Option<User>,
    }
    impl PocketbaseClient {
    
        // PocketbaseClient::new(raw_url) -> (PocketbaseClient or Error)
        pub fn new<'a>(raw_url: &'a str) -> Result<Client, Box<dyn Error>>
    
        // auth_via_email(email, password, usertype) -> (OK or Error)
            pub aync auth_via_email<'a>(
                &mut self,
                email: String,
                password: String,
                usertype: UserTypes
            ) -> Result<(), Box<dyn Error>>
    
        // PocketbaseClient::get(path, params) -> (Response or Error)
        pub async fn get(
            &self,
            path: String,
            params: Option<&[(&str, &str)]>
        ) -> Result<Response, Box<dyn Error>>
    
        pub async fn post<T: Serialize + Sized>(
            &self,
            path: String,
            body: &T
        ) -> Result<Response, Box<dyn Error>>
    
        pub async fn patch<T: Serialize + Sized>(
            &self,
            path: String,
            body: &T
        ) -> Result<Response, Box<dyn Error>>
    
        pub async fn delete(
            &self,
            path: String,
            params: Option<&[(&str, &str)]>
        ) -> Result<Response, Box<dyn Error>>
    }
    
    // Pocketbase_SDK Readme example
    
    // Post structure definition. Table dependent structure. Double check syntax for using dates as string, or if there is a date structure included
    #[derive(Serialize, Deserialize, Debug)]
    struct Post {
      id: String,
      title: String,
      content: String,
      created: String,
      updated: String,
      author: String,
    }
    
    #[tokio::main]
    async fn main() -> Result<(), Box<dyn std::error::Error>> {
        /* new client + authentication */
        let mut client = Client::new("http://localhost:8090/api/").unwrap();
        let auth = client.auth_via_email(
            // User account. Who is making the requst? Can be user account or admin account
            String::from("sreedev@icloud.com"),
            String::from("Admin@123"),
            UserTypes::User /* use UserTypes::Admin for admin Authentication */
        ).await;
        assert!(auth.is_ok())
    
        /* create record */
        // Fill out the post structure with some sample information
        let record = Post {
          title: "Sample title".to_string(),
          content: "Sample Content".to_string(),
          author: client.user.unwrap().token,
          created: "".to_string,
          updated: "".to_string
        };
    
        // Let response variable be a create record request of type Post model.
        // Takes in a collection string (table name), reference to structure, and reference to client
        // Notice the pocketbase_sdk::records::operations::create::COMPLETED_STRUCTURE_VARIABLE::<STRUCTURE_TYPE> fucntion syntax
        let repsonse = create::record::<Post>("posts", &post, &client).await.unwrap();
        // Pattern match reposne to check if Success or Failure
        match repsonse {
            create::CreateResponse::SuccessResponse(res) => {
                // Take the result from the SucessResponse and check that title is same as what was in our post structure
                assert_eq!(res.title, String::from("Sample title"))
            },
            // Panic at any FailureResponse
            create::CreateResponse::FailureResponse(_err) => panic!("Failed!")
        }
    
        /* view record */
        // Similar to posting, this will retrieive a record
        let repsonse = view::record::<Post>("posts", "9bbl183t7ioqrea", &client).await.unwrap();
        match repsonse {
            view::ViewResponse::SuccessResponse(res) => assert_eq!(res.id, "9bbl183t7ioqrea"),
            view::ViewResponse::ErrorResponse(_err) => panic!("Failed!")
        }
    
        /* list paginated records */
        let response = list::records::<Post>("posts", &client).await.unwrap();
        match response {
          list::ListResponse::SuccessResponse(paginated_record_list) => {
            assert_ne!(paginated_record_list.total_items, 0)
          },
          list::ListResponse::ErrorResponse(_e) => panic!("could not retrieve resource.")
        }
    
        /* delete a record */
        let response = delete::record("posts", "9bbl183t7ioqrea", &client).await;
        assert!(response.is_ok());
    
        Ok(())
    }

