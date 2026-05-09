#!/bin/bash
set -e

npm install --legacy-peer-deps

sh scripts/install-hooks.sh
