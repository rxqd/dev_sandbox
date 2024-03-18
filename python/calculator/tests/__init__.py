# assuming that the code is in test's __init__.py
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

sys.path.append(os.path.join(ROOT, 'src'))
