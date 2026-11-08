#!/usr/bin/env bash
# Fixes misspelled product slugs and titles, and placeholder slugs, in WordPress (run on the WP server, in the WP root).
#
#   bash fix-typo-slugs.sh            # dry run: prints what would change
#   bash fix-typo-slugs.sh --apply    # renames slugs and titles
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
    # Products saved without a title got placeholder slugs.
    case "$slug" in
      brak-tytulu) new=bransoletka-regulowana-zodiak-panna ;;
      brak-tytulu-2) new=bransoletka-regulowana-zodiak-lew ;;
    esac
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

# Misspelled product titles (e.g. "BRASNOLETKA Z ONYKSU PATYCZKI", "BARNSOLETKA MĘSKA LAPIS LAZULI").
rows=$(wp post list --post_type=product --post_status=any --fields=ID,post_title --format=csv | tail -n +2)
while IFS=, read -r id title; do
  [ -z "$id" ] && continue
  title=${title#\"}; title=${title%\"}
  new=$(printf '%s' "$title" | sed -e 's/BARNSOLETK/BRANSOLETK/g' -e 's/BRASNOLETK/BRANSOLETK/g' -e 's/TUMRMALIN/TURMALIN/g' -e 's/[Bb]arnsoletk/bransoletk/g' -e 's/[Bb]rasnoletk/bransoletk/g' -e 's/tumrmalin/turmalin/g')
  [ "$new" = "$title" ] && continue
  echo "title $id: $title -> $new"
  if [ "$APPLY" = "--apply" ]; then wp post update "$id" --post_title="$new" >/dev/null; fi
done <<< "$rows"

[ "$APPLY" = "--apply" ] || echo "Dry run. Re-run with --apply to rename."
