use rand::Rng;
use std::cmp::Ordering;
use std::io;
use std::num::ParseIntError;

enum MyResult {
    Ok(u32),
    Err(ParseIntError),
    Exit,
}

fn main() {
    let secret_number = gen_number();

    println!("The secrect number is: {}", secret_number);

    loop {
        println!("Please input your number or q|exit|quit.");

        let guess = match read_number() {
            MyResult::Ok(num) => num,
            MyResult::Err(_) => continue,
            MyResult::Exit => {
                println!("Bye!");
                break;
            }
        };

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You have won!");
                break;
            }
        }
    }
}

fn gen_number() -> u32 {
    return rand::thread_rng().gen_range(1..=100);
}

fn read_number() -> MyResult {
    let mut result = String::new();

    io::stdin()
        .read_line(&mut result)
        .expect("Failed to read line");

    let result = result.trim();

    match result {
        "exit" | "quit" | "q" => MyResult::Exit,
        _ => match result.parse::<u32>() {
            Ok(num) => MyResult::Ok(num),
            Err(e) => MyResult::Err(e),
        },
    }
}
