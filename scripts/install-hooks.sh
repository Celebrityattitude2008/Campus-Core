#!/bin/sh
# Install git hooks from the scripts/ directory into .git/hooks/
# Run this after cloning: sh scripts/install-hooks.sh

HOOKS_DIR=".git/hooks"
SCRIPTS_DIR="scripts"

if [ ! -d "$HOOKS_DIR" ]; then
  echo "No .git/hooks directory found. Are you in the project root?"
  exit 1
fi

cp "$SCRIPTS_DIR/post-commit" "$HOOKS_DIR/post-commit"
chmod +x "$HOOKS_DIR/post-commit"
chmod +x "$SCRIPTS_DIR/git-askpass.sh"

echo "Git hooks installed successfully."
echo "Every commit will now automatically push to GitHub."
echo "Requires: GITHUB_PERSONAL_ACCESS_TOKEN environment variable."
