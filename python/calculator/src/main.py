from dataclasses import dataclass

if __name__ == "__main__":
    main
    
@dataclass
class UserInput:
    value: str = None
    exit: bool = None

def main:
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
    
def read_line -> UserInput:
    expr = input().strip()
    
    match expr.t:
        case "q": UserInput(exit=True)
        _: UserInput(value=expr)
        
def calculate_postfix(expr: str) -> float:
    stack = []
    
    for token in expr.split():
        print(f"stack contains {stack}"
        print(f"token is {token}")
        
        if token.is_digit():
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

    stack.pop()
    