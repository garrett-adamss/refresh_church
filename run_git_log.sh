#!/bin/sh
cd /Users/gar/source/refresh_church
git log --oneline -10
echo "---"
git rev-list --count HEAD
