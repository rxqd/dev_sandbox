fn main() {
    println!("{}", hello());
}

pub fn hello() -> String {
    "Hello rust".to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hello() {
        assert_eq!(hello(), "Hello rust");
    }
}
