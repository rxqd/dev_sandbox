use std::io::{self, Write};
use std::result::Result;

enum UserInput {
    Exit,
    Ok(&'a str),
    Err(io::Error),
}

fn main() -> Result<(), io::Error> {
    println!("Enter an expression to calculate or 'q' to exit");
    
    loop {
        let result = match read_line() {
            UserInput::Exit => {
                println!("Bye!");
                break;
            },
            UserInput::Err(e) => return Err(e),
            UserInput::Ok(input) => match do_calculation(input) {
                Ok(result) => result,
                Err(e) => {
                    println!("Error: {}", e);
                    continue;
                }
            },
        };
        println!("= {}", result);
        io::stdout().flush()?;
    }
    Ok(())
}

fn read_line() -> UserInput {
    let mut input = String::new();
    match io::stdin().read_line(&mut input) {
        Err(e) => UserInput::Err(e),
        Ok(_) => match input.trim() {
            "q" => UserInput::Exit,
            input => UserInput::Ok(input),
        }
    }
}

fn do_calculation(input: &str) -> Result<f64, &str> {
    if input.len() < 3 {
        return Err("Invalid input");
    }

    Ok(0.0)
}
