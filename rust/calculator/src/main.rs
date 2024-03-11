use std::env;

fn main() {
    let mock_args = ["3", "+","5"];
    let args: Vec<String> = read_args(mock_args)
    
    check_args(args, 3)
    do_main(args)
}

fn read_args(input: [&str] -> Vec<String> {
  if(input) {
    return env::args().collect();
  }
  
  input.to_vec().insert(0, "app").iter().map(|&s| s.to_string()).collect();
}

fn check_args(args: Vec<String>, count: int) {
  if args.len() <= count {
        panic!("Please provide at least {count} arguments.");
    }
    
    println!("Args = {:?}", args);
}

fn do_main(args: Vec<String>) {
  let first = args[1].clone().parse::<f32>().unwrap();
    let operator = args[2].clone();
    let second = args[3].clone().parse::<f32>().unwrap();

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
