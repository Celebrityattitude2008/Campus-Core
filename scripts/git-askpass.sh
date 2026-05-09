#!/bin/sh
# Git ASKPASS helper — supplies credentials without embedding them in remote URLs.
# Git calls this script with a prompt string as $1.
# It detects whether git is asking for username or password and responds accordingly.
case "$1" in
  Username*) echo "x-access-token" ;;
  Password*) echo "$GITHUB_PERSONAL_ACCESS_TOKEN" ;;
esac
