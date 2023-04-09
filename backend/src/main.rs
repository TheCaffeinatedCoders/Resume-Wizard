use actix_web::{get, web, App, HttpServer, Responder};
use async_openai::{types::CreateCompletionRequestArgs, Client};
use dotenv::dotenv;
use std::env;

#[get("/api/greet/{name}")] // <- define path parameters
async fn greet(name: web::Path<String>) -> impl Responder {
    format!("Hello {name}!")
}

#[get("api/AItest")]
async fn ai_test() -> impl Responder {
    // Grab openai api key secret
    let openai_secret_key = env::var("OPENAI_API_KEY").unwrap_or_else(|_| {
        panic!("OPENAI_SECRET_KEY not set in enviroment");
    });
    let openai_client = Client::new().with_api_key(openai_secret_key);
    let request = CreateCompletionRequestArgs::default()
        .model("text-davinci-003") // Model argument
        .prompt("Write me a poem about a wizard giving resume advice to a student unicorn") // Prompt argument
        .max_tokens(40_u16) // max_tokens argument
        .build()
        .unwrap();
    let response = openai_client
        .completions() // Get the API "group" (completions, images, etc.) from the client
        .create(request) // Make the API call in that "group"
        .await
        .unwrap();
    // format!("{:?}", response)
    format!("{}", response.choices[0].text)
}

#[actix_web::main] // or #[tokio::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    HttpServer::new(|| App::new().service(greet).service(ai_test))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
