use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use sandbox::hello;

#[get("/")]
async fn hello_handler() -> impl Responder {
    HttpResponse::Ok().body(hello() + "\nhello from api")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(hello_handler))
        .bind(("127.0.0.1", 3000))?
        .run()
        .await
}
