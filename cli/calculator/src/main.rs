use std::io::{self, Write};
use std::result::Result;

enum UserInput {
    Err(io::Error),
    Ok(String),
    Exit,
}

fn main() -> Result<(), io::Error> {
    println!("Enter an expression to calculate or 'q' to exit");

    loop {
        match read_line() {
            UserInput::Exit => {
                println!("Bye!");
                break;
            }
            UserInput::Err(e) => return Err(e),
            UserInput::Ok(input) => match calculate(&input) {
                Ok(result) => {
                    println!("= {}", result);
                    io::stdout().flush()?;
                    continue;
                }
                Err(e) => {
                    println!("Error: {}", e);
                    continue;
                }
            },
        };
    }
    Ok(())
}

pub fn calculate(input: &str) -> Result<f64, String> {
    println!("Debug input {:#?}", input);

    Ok(0.0)
}

fn read_line() -> UserInput {
    let mut input = String::new();

    match io::stdin().read_line(&mut input) {
        Err(e) => UserInput::Err(e),
        Ok(_) => match input.trim() {
            "q" => UserInput::Exit,
            _ => UserInput::Ok(String::from(input.trim())),
        },
    }
}

// TODO: https://aquarchitect.github.io/swift-algorithm-club/Shunting%20Yard/
#[allow(dead_code)]
fn calculate_postfix(expr: &str) -> f64 {
    let mut stack: Vec<f64> = Vec::new();

    for token in expr.split_whitespace() {
        println!("stack contains {:?}", stack);
        println!("token is {:?}", token);

        match token.parse::<f64>() {
            Ok(digit) => stack.push(digit),
            Err(_) => {
                let digit2 = stack.pop().unwrap();
                let digit1 = stack.pop().unwrap();

                match token {
                    "+" => stack.push(digit1 + digit2),
                    "-" => stack.push(digit1 - digit2),
                    "*" => stack.push(digit1 * digit2),
                    "/" => stack.push(digit1 / digit2),
                    _ => panic!("Invalid operator {token}"),
                }
            }
        }
    }

    stack.pop().unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[ignore = "not implemented"]
    fn test_add() -> Result<(), String> {
        assert_eq!(calculate("3+5")?, 8.0);
        assert_eq!(calculate("3 + 5")?, 8.0);
        Ok(())
    }

    #[test]
    fn test_calculate_postfix() {
        assert_eq!(calculate_postfix("3 4 5 * +"), 23.0);
        assert_eq!(calculate_postfix("4 4 2 * 1 5 - / +"), 2.0);
    }
}
