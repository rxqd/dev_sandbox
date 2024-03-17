from dataclasses import dataclass
    
@dataclass
class UserInput:
    value: str = None
    exit: bool = None

def main():
    print("Enter an expression to calculate or 'q' to exit")
    
    while True:
        match read_line():
            case UserInput(exit=True):
                print("Bye!")
                break
            case UserInput(value=user_input):
                result, err = calculate(input)
                
                if err:
                    print(err)
                    continue
                    
                print(f"={result}")
                
def calculate(expr: str) -> float:
    print(f"Debug input {expr}")
    
    return 0.0, None
    
def read_line() -> UserInput:
    expr = input().strip()
    
    match expr:
        case "q": return UserInput(exit=True)
        case _: return UserInput(value=expr)
        
def calculate_postfix(expr: str) -> float:
    stack = []
    
    for token in expr.split():
        print(f"stack contains {stack}")
        print(f"token is {token}")
        
        if token.isdigit():
            stack.append(float(token))
        else:
            digit2 = stack.pop()
            digit1 = stack.pop()
            
            match token:
                case "+": stack.append(digit1+digit2)
                case "-": stack.append(digit1-digit2)
                case "*": stack.append(digit1*digit2)
                case "/": stack.append(digit1/digit2)
                case "_": raise f"Invalid operator {token}"

    return stack.pop()

if __name__ == "__main__":
    expr1 = "4 4 2 * 1 5 - / +"
    expr2 = "3 4 5 * +"

    assert calculate_postfix(expr1) == 2.0
    assert calculate_postfix(expr2) == 23.0

    main()