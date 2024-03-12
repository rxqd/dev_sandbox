class Point:
    def __init__(self, x=0, y=0):
        self._x = x
        self._y = y

    def __str__(self):
        return f"({self._x}, {self._y})"


if __name__ == "__main__":
    print("Learn classes")

    point = Point(5, 3)
    print(f"I have a point {point}")
