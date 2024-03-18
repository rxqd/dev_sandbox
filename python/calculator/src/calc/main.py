from dataclasses import dataclass
from typing import Optional, Tuple
from calculator import calculate_postfix


@dataclass
class UserInput:
    value: str = ""
    exit: bool = False


def main():
    print("Enter an expression to calculate or 'q' to exit")

    while True:
        match read_line():
            case UserInput(exit=True):
                print("Bye!")
                break
            case UserInput(value=expr):
                result, err = calculate(expr)

                if err:
                    print(err)
                    continue

                print(f"={result}")


def calculate(expr: str) -> Tuple[float, Optional[str]]:
    print(f"Debug input {expr}")

    if len(expr) == 0:
        return 0.0, "Expr is blank"

    return 0.0, None


def read_line() -> UserInput:
    expr: str = input().strip()

    match expr:
        case "q":
            return UserInput(exit=True)
        case _:
            return UserInput(value=expr)


if __name__ == "__main__":
    main()

