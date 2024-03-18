from calc.calc import calc_postfix


def test_calc_postfix():
    assert calc_postfix("4 4 2 * 1 5 - / +") == 2.0
    assert calc_postfix("3 4 5 * +") == 23.0
