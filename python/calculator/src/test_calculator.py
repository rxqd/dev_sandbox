from calculator import calculate_postfix


def test_calculate_postfix():
    assert calculate_postfix("4 4 2 * 1 5 - / +") == 2.0
    assert calculate_postfix("3 4 5 * +") == 23.0
