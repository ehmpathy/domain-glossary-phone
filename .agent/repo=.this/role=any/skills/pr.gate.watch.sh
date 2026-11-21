#!/usr/bin/env bash
######################################################################
# .what = block until a pr at a review gate changes, then report what changed
#
# .why  = a clone held at a human review gate must answer each review
#         comment fast and rebase on main drift. git.pull.watch does this
#         as a daemon, but needs the seaturtle github token; this polls
#         via the gh login instead, so the gate stays live without it.
#
# usage:
#   rhx pr.gate.watch --which 14
#   rhx pr.gate.watch --which 14 --interval 60 --timeout 3300
#
# options:
#   --which     pr number (required)
#   --interval  seconds between polls (default: 60)
#   --timeout   seconds before exit with no change (default: 3300)
#
# guarantee:
#   - read-only: GET requests only
#   - watches reviews, review-thread comments, conversation comments,
#     pr state, and the base branch tip
#   - exit 0 + "changed" tree the moment any of them moves
#   - exit 0 + "unchanged" tree at timeout, so the caller re-checks hourly
#   - exit 2 on bad input; exit 1 when gh fails
######################################################################
set -euo pipefail

WHICH=""
INTERVAL=60
TIMEOUT=3300

while [[ $# -gt 0 ]]; do
  case "$1" in
    --which) WHICH="$2"; shift 2 ;;
    --interval) INTERVAL="$2"; shift 2 ;;
    --timeout) TIMEOUT="$2"; shift 2 ;;
    --help|-h) sed -n '2,27p' "$0"; exit 0 ;;
    # rhx routing flags, passed to every skill
    --skill|--repo|--role) shift 2 ;;
    *) echo "✋ ConstraintError: unknown flag $1 (see --help)" >&2; exit 2 ;;
  esac
done

# reject absent pr number
if [[ ! "$WHICH" =~ ^[0-9]+$ ]]; then
  echo "✋ ConstraintError: --which <pr number> is required, e.g. --which 14" >&2
  exit 2
fi

# derive the repo slug from the origin remote
REPO="$(gh repo view --json nameWithOwner --jq .nameWithOwner)" || {
  echo "💥 MalfunctionError: gh could not read the repo; check gh auth status" >&2
  exit 1
}

# capture one fingerprint per watched surface
get_state() {
  local pr reviews threads convo base_tip
  pr="$(gh api --method GET "repos/$REPO/pulls/$WHICH" --jq '"\(.state) \(.merged) \(.head.sha[0:7]) \(.base.ref)"')"
  reviews="$(gh api --method GET "repos/$REPO/pulls/$WHICH/reviews" --paginate --jq '.[] | "\(.id) \(.user.login) \(.state)"')"
  threads="$(gh api --method GET "repos/$REPO/pulls/$WHICH/comments" --paginate --jq '.[] | "\(.id) \(.user.login) \(.updated_at) \(.path)"')"
  convo="$(gh api --method GET "repos/$REPO/issues/$WHICH/comments" --paginate --jq '.[] | "\(.id) \(.user.login) \(.updated_at)"')"
  base_tip="$(gh api --method GET "repos/$REPO/commits/$(echo "$pr" | cut -d' ' -f4)" --jq '.sha[0:7]')"
  printf 'pr: %s\nbase tip: %s\nreviews:\n%s\nthread comments:\n%s\nconversation comments:\n%s\n' \
    "$pr" "$base_tip" "$reviews" "$threads" "$convo"
}

BEFORE="$(get_state)"
ELAPSED=0

# poll until a surface moves or the timeout passes
while (( ELAPSED < TIMEOUT )); do
  sleep "$INTERVAL"
  ELAPSED=$(( ELAPSED + INTERVAL ))
  AFTER="$(get_state)"
  if [[ "$AFTER" != "$BEFORE" ]]; then
    echo "🐢 heads up, the gate moved"
    echo ""
    echo "🐚 pr.gate.watch --which $WHICH"
    echo "   ├─ repo: $REPO"
    echo "   ├─ waited: ${ELAPSED}s"
    echo "   └─ changed"
    diff <(echo "$BEFORE") <(echo "$AFTER") | sed 's/^/      │  /' || true
    exit 0
  fi
done

echo "🐢 calm waters"
echo ""
echo "🐚 pr.gate.watch --which $WHICH"
echo "   ├─ repo: $REPO"
echo "   ├─ waited: ${ELAPSED}s"
echo "   └─ unchanged"
echo "$BEFORE" | sed 's/^/      │  /'
