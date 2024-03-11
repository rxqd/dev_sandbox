use std::env;

const MOCK_ARGS: [&str; 4] = [
"app",
"3", "+","5"];

fn main() {
    let args: Vec<String> = read_args();

    do_main(&args);
}

fn read_args() -> Vec<String> {
  let args: Vec<String> = env::args().collect();

  if check_args(&args, 3) {
    return args;
  }
  
  mock_args()
}

fn mock_args() -> Vec<String> {
  return MOCK_ARGS.iter().map(|&s| s.to_string()).collect();
}

fn check_args(args: &Vec<String>, count: usize) -> bool {
  if args.len() <= count {
       return false
    }
  true
}

fn do_main(args: &Vec<String>) {
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
