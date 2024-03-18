from dataclasses import dataclass
from calc import calc_postfix


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

def read_line() -> UserInput:
    expr: str = input().strip()

    match expr:
        case "q":
            return UserInput(exit=True)
        case _:
            return UserInput(value=expr)


if __name__ == "__main__":
    main()

