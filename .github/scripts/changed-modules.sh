#!/usr/bin/env bash
# Prints the JSON array of modules whose image must be rebuilt, e.g. ["frontend","payment"].
#
#   changed-modules.sh <base-sha> [head-sha]
#
# A module is a top-level directory with a Dockerfile listed in MODULES. It is rebuilt when any file under it
# changed between <base-sha> and <head-sha>. Pass "all" as the base to force every module.
# Every module is rebuilt when the diff base is unusable: the zero SHA of a newly created branch, or a commit
# that is no longer reachable after a force-push. Changes to the image workflow also rebuild every module.

set -euo pipefail

MODULES=(frontend backend payment)
SHARED_PATHS=(.github/workflows/images.yml .github/scripts/changed-modules.sh)

base="${1:?usage: changed-modules.sh <base-sha|all> [head-sha]}"
head="${2:-HEAD}"

to_json() {
  if (($# == 0)); then
    echo '[]'
  else
    printf '%s\n' "$@" | jq -R . | jq -cs .
  fi
}

if [[ "$base" == all || "$base" =~ ^0+$ ]] || ! git cat-file -e "${base}^{commit}" 2>/dev/null; then
  to_json "${MODULES[@]}"
  exit 0
fi

# Diff from the merge-base, so a pull request only sees its own changes and not what landed on master since.
changed="$(git diff --name-only "$(git merge-base "$base" "$head")" "$head")"

for path in "${SHARED_PATHS[@]}"; do
  if grep -qxF "$path" <<<"$changed"; then
    to_json "${MODULES[@]}"
    exit 0
  fi
done

selected=()
for module in "${MODULES[@]}"; do
  if grep -q "^${module}/" <<<"$changed"; then
    selected+=("$module")
  fi
done

to_json "${selected[@]+"${selected[@]}"}"
