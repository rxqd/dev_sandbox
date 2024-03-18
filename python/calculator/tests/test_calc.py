from calc.calc import *
import pytest

def test_calc_postfix():
    assert calc_postfix("4 4 2 * 1 5 - / +") == 2.0
    assert calc_postfix("3 4 5 * +") == 23.0
      
def test_add():
    stack = [6, 3]
    apply_operator("+",stack)
    assert stack == [9]
    
def test_minus():
    stack = [6, 3]
    apply_operator("-",stack)
    assert stack == [3]
    
def test_mul():
    stack = [6, 3]
    apply_operator("*",stack)
    assert stack == [18]
    
def test_div():
    stack = [6, 3]
    apply_operator("/",stack)
    assert stack == [2]
    
def test_div_zero():
    stack = [6, 0]
    with pytest.raises(ZeroDivisionError):
        apply_operator("/",stack)
        
def test_empty_stack():
    with pytest.raises(IndexError):
        apply_operator("+",[])    
        