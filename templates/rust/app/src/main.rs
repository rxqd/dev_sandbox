
fn main() {
    println!(hello());
}

pub fn hello() -> 'static &str {
  "Hello rust"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hello() {
        assert_eq!(hello(), "Hello rust");
    }
}
