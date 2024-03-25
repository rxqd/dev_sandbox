
fn main() {
    println!("Choose current project:");
    list_projects();
    let target = choose_project();
    verify_target(&target);
}

#[cfg(test)]
mod tests {
    use super::*;

}
