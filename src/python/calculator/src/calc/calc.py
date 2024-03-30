from typing import List, Tuple, Optional

def calculate(expr: str) -> Tuple[float, Optional[str]]:
    print(f"Debug input {expr}")

    if len(expr) == 0:
        return 0.0, "Expr is blank"

    return 0.0, None

def calc_postfix(expr: str) -> float:
    stack: List[float] = []

    for token in expr.split():
        print(f"stack contains {stack}")
        print(f"token is {token}")

        if token.isdigit():
            stack.append(float(token))
            continue
        
        apply_operator(token, stack)  
        

    return stack.pop()
    
def apply_operator(op, stack) -> None:
  digit2 = stack.pop()
  digit1 = stack.pop()

  match op:
    case "+":
      stack.append(digit1 + digit2)
    case "-":
      stack.append(digit1 - digit2)
    case "*":
      stack.append(digit1 * digit2)
    case "/":
      if digit2 == 0:
        raise ZeroDivisionError("Digit is zero")
      stack.append(digit1 / digit2)
