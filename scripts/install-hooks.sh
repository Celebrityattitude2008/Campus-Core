#!/bin/sh
# Install git hooks from the scripts/ directory into .git/hooks/
# Run this after cloning: sh scripts/install-hooks.sh

HOOKS_DIR=".git/hooks"
SCRIPTS_DIR="scripts"

if [ ! -d "$HOOKS_DIR" ]; then
  echo "[github-sync] No .git/hooks directory found — skipping hook install (not a git worktree)."
  exit 0
fi

EXISTING_HOOK="$HOOKS_DIR/post-commit"

if [ -f "$EXISTING_HOOK" ]; then
  if grep -q "github-sync" "$EXISTING_HOOK"; then
    cp "$SCRIPTS_DIR/post-commit" "$EXISTING_HOOK"
    chmod +x "$EXISTING_HOOK"
    echo "[github-sync] Updated existing github-sync post-commit hook."
  else
    echo "[github-sync] WARNING: A custom post-commit hook already exists at $EXISTING_HOOK."
    echo "[github-sync] To enable GitHub auto-sync, append the contents of scripts/post-commit manually."
    exit 0
  fi
else
  cp "$SCRIPTS_DIR/post-commit" "$EXISTING_HOOK"
  chmod +x "$EXISTING_HOOK"
  echo "[github-sync] Git hooks installed successfully."
fi

chmod +x "$SCRIPTS_DIR/git-askpass.sh"
echo "[github-sync] Auto-sync active: every commit will push to GitHub automatically."
echo "[github-sync] Requires: GITHUB_PERSONAL_ACCESS_TOKEN environment variable."
