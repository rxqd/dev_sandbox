use sandbox::hello;

fn main() {
    hello();
}

#[cfg(test)]
mod tests {
    use super::*;
}
