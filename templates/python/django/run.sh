#!/usr/bin/env bash

current_dir=$(dirname "$(readlink -f "$0")")
PYTHONPATH=$current_dir python manage.py runserver 0.0.0.0:3000
