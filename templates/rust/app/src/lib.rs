pub fn hello() -> String {
    "Hello rust from lib".to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hello() {
        assert_eq!(hello(), "Hello rust from lib");
    }
}
