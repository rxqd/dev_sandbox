use std::env;

fn main() {
    // vector is a dynamic array
    // we convert args iterator to vector of strings
    let args: Vec<String> = env::args().collect();

    // check for required arguments
    if args.len() < 4 {
        println!("Please provide at least 3 arguments.");
        return;
    }

    // clone to avoid borrowing
    // parse string to float
    // unwrap from Some(float) -> float
    
    
    let first = args[1].clone().parse::<f32>().unwrap();
    let operator = args[2].clone();
    let second = args[3].clone().parse::<f32>().unwrap();

    // print statement with formatted string
    // pass operator as a pointer to string
    println!(
        "{} {} {} = {}",
        first,
        operator,
        second,
        calculate(&operator, first, second)
    );
}

/// apply operator to two numbers
fn calculate(operator: &str, f: f32, s: f32) -> f32 {
    // match operators with actions
    // implicit returns the latest value
    // _ for everything else and panic as an exception raising
    match operator {
        "+" => f + s,
        "-" => f - s,
        "*" | "x" | "X" => f * s,
        "/" => f / s,
        _ => panic!("Invalid operator"),
    }
}
