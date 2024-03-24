import pytest

from hello.hello import *


def test_hello():
    assert hello() == "Hello python"
