#!/usr/bin/env bash
# Fixes misspelled product slugs in WordPress (run on the WP server, in the WP root).
#
#   bash fix-typo-slugs.sh            # dry run: prints what would change
#   bash fix-typo-slugs.sh --apply    # renames the slugs
#
# The frontend 301-redirects the old misspelled URLs (shared/signor/redirects.ts),
# so rename the slugs only together with deploying the frontend.
# Also add the same old -> new pairs to the WP "Redirection" plugin for as long as
# WordPress itself still serves public pages.
set -euo pipefail

APPLY="${1:-}"

fix() {
  sed -e 's/barnsoletk/bransoletk/g' -e 's/brasnoletk/bransoletk/g' -e 's/tumrmalin/turmalin/g'
}

for type in product product_cat; do
  if [ "$type" = product ]; then
    rows=$(wp post list --post_type=product --post_status=any --fields=ID,post_name --format=csv | tail -n +2)
  else
    rows=$(wp term list product_cat --fields=term_id,slug --format=csv | tail -n +2)
  fi
  while IFS=, read -r id slug; do
    [ -z "$id" ] && continue
    new=$(printf '%s' "$slug" | fix)
    [ "$new" = "$slug" ] && continue
    echo "$type $id: $slug -> $new"
    if [ "$APPLY" = "--apply" ]; then
      if [ "$type" = product ]; then
        wp post update "$id" --post_name="$new" >/dev/null
      else
        wp term update product_cat "$id" --slug="$new" >/dev/null
      fi
    fi
  done <<< "$rows"
done

[ "$APPLY" = "--apply" ] || echo "Dry run. Re-run with --apply to rename."
