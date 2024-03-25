use std::{env, process, fs, io::{self, Write}};
use std::path::Path;

fn list_projects() {
    let mut num = 1;

    for entry in fs::read_dir(".").unwrap() {
        let dir = entry.unwrap().path();
        if dir.is_dir() 
           && dir.file_name().unwrap() != "current" 
           && dir.file_name().unwrap() != "templates" 
        {
            let project = fs::read_dir(&dir)
                .unwrap()
                .into_iter()
                .filter(|e| e.as_ref().unwrap().path().is_dir())
                .map(|e| e.unwrap().path().to_str().unwrap().to_string())
                .next();

            if let Some(project_path) = project {
                println!("{}. {} -> {}", num, dir.display(), project_path);
            } else {
                println!("{}. {}", num, dir.display());
            } 

            num += 1;
        }
    }
}

fn choose_project() -> String {
    println!("Choose current project:");
    list_projects();

    let mut choice = String::new();
    io::stdin().read_line(&mut choice).unwrap();

    let choice_num: usize = match choice.trim().parse() {
        Ok(num) if num > 0 => num - 1, // Adjust for zero-based indexing
        _ => {
            println!("Invalid choice.");
            process::exit(1);
        }
    };

    let target = fs::read_dir(".")
        .unwrap()
        .map(|e| e.unwrap().path())
        .filter(|p| p.is_dir())
        .nth(choice_num)
        .unwrap()
        .to_str()
        .unwrap()
        .to_string(); 

    println!("Chosen target is: {}", target);
    target
}

fn main() {
    let target = choose_project();

    // Remove trailing slash, if any
    let target = Path::new(&target).parent().unwrap().to_str().unwrap().to_string(); 

    // Check if selected folder exists 
    if !Path::new(&target).is_dir() {
        println!("{} is invalid", target);
        process::exit(1);
    }

    // Check .replit and run.sh exist (similar logic as Bash, assuming you'd use Rust's 'fs' crate to check)

    // ... Your symlinking logic (OS-specific in Rust, consider crates like 'symlink')
}
