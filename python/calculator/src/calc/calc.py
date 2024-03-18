from typing import List


def calc_postfix(expr: str) -> float:
    stack: List[float] = []

    for token in expr.split():
        print(f"stack contains {stack}")
        print(f"token is {token}")

        if token.isdigit():
            stack.append(float(token))
        else:
            digit2 = stack.pop()
            digit1 = stack.pop()

            match token:
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
                case "_":
                    raise ValueError(f"Invalid operator {token}")

    return stack.pop()
