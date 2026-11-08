# Signor Store: headless frontend (WooNuxt)

Nowy frontend dla signorstore.pl i signorstore.de. Działa na [WooNuxt](https://github.com/scottyzen/woonuxt) v4.31.0 (Nuxt 4) z WooCommerce jako backendem przez WPGraphQL. Koszyk działa we frontendzie, zamówienie i płatności obsługuje WooCommerce.

## Struktura

| Ścieżka                                 | Co zawiera                                                                                                            |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `woonuxt_base/`                         | Upstream WooNuxt, **bez zmian**. Aktualizacja: `npm run update:woonuxt`.                                              |
| `shared/signor/`                        | Dane: znaki zodiaku, kamienie, FAQ, rynki PL/DE, przekierowania 301. Używane przez app i serwer.                      |
| `app/pages/index.vue`                   | Strona główna: wyszukiwarka znaku po dacie urodzenia, 12 znaków, bransoletki, przewodnik po kamieniach, FAQ, JSON-LD. |
| `app/signor-pages/`                     | Strony SEO: lista znaków, strona znaku, lista kamieni, strona kamienia.                                               |
| `modules/signor.ts`                     | Rejestruje trasy tych stron, osobno dla PL i DE.                                                                      |
| `app/components/signor/`                | ZodiacFinder, ZodiacGrid, StoneGuide, SignorFaq.                                                                      |
| `app/components/overrides/`             | Nadpisania komponentów WooNuxt: menu, stopka (poprawny Instagram), przełącznik języka.                                |
| `server/middleware/signor-redirects.ts` | Przekierowania 301 ze starych adresów WordPressa.                                                                     |
| `i18n/locales/pl-PL.json`               | Polskie tłumaczenie interfejsu WooNuxt (niemieckie jest w WooNuxt).                                                   |
| `scripts/wp/fix-typo-slugs.sh`          | WP-CLI: poprawia literówki w slugach produktów i kategorii.                                                           |

## Rynki PL i DE

PL i DE to osobne sklepy WooCommerce z własnymi cenami i walutą, więc każdy rynek to osobne wdrożenie tego samego kodu:

|                       | PL                                       | DE                                      |
| --------------------- | ---------------------------------------- | --------------------------------------- |
| `STORE_LOCALE`        | `pl`                                     | `de`                                    |
| `GQL_HOST`            | `https://signorstore.pl/graphql`         | `https://signorstore.de/graphql`        |
| Znaki zodiaku         | `/znaki-zodiaku`, `/znaki-zodiaku/baran` | `/sternzeichen`, `/sternzeichen/widder` |
| Kamienie              | `/kamienie`, `/kamienie/onyks`           | `/steine`, `/steine/onyx`               |
| Kategoria WooCommerce | `znaki-zodiaku`                          | `sternzeichen`                          |

Odpowiadające sobie strony obu sklepów linkują do siebie przez `hreflang`. Przełącznik języka w stopce prowadzi do drugiej domeny.

Jeżeli frontend ma działać pod główną domeną, WordPress musi przejść na subdomenę (np. `wp.signorstore.pl`). Wtedy `GQL_HOST=https://wp.signorstore.pl/graphql`, a `SIGNOR_ORIGIN` zostaje `https://signorstore.pl`.

## Zmienne środowiskowe

```bash
STORE_LOCALE=pl
GQL_HOST=https://wp.signorstore.pl/graphql
NUXT_IMAGE_DOMAINS=wp.signorstore.pl,signorstore.pl
SIGNOR_ORIGIN=https://signorstore.pl   # opcjonalne, domyślnie wynika ze STORE_LOCALE
```

## Kroki w WordPressie

1. **Wtyczki:** zainstaluj „Settings for WooNuxt” i w Ustawienia → WooNuxt doinstaluj WPGraphQL, WPGraphQL WooCommerce (wp-graphql-woocommerce) oraz WPGraphQL CORS. W ustawieniach CORS dopuść domenę frontendu.
2. **Kategoria „Znaki zodiaku”:** Produkty → Kategorie → dodaj „Znaki zodiaku” ze slugiem `znaki-zodiaku` (w DE: „Sternzeichen”, `sternzeichen`). Przypisz do niej wszystkie bransoletki zodiakalne. Mogą zostać także w „Bransoletki > Z kamieni”. Strony znaków pokazują produkty z tej kategorii jako pierwsze.
3. **Opis kategorii:** usuń zdublowany opis z „Z kamieni” (ten sam tekst jest teraz w kategorii nadrzędnej i podrzędnej).
4. **Literówki w slugach:** `bash scripts/wp/fix-typo-slugs.sh` (podgląd), potem `--apply`. Rób to razem z wdrożeniem frontendu, bo dopiero frontend przekierowuje stare adresy.
5. **Meta description produktów:** jeśli produkt nie ma opisu w Yoast, frontend bierze krótki opis produktu. Uzupełnij krótkie opisy (~150 znaków) lub opisy w Yoast.
6. **Instagram:** w ustawieniach WooNuxt (SEO / social) i w Yoast ustaw `https://www.instagram.com/signor_store/` zamiast `singor_store`. Stopka frontendu ma już poprawny link.
7. **Warianty i dodatki:** rozmiar S/M/L powinien być atrybutem wariantu („Rozmiar”). WooNuxt wyświetla go w karcie produktu bez dodatkowej pracy. Grawer, gwarancja i kartka to dodatki. Zobacz „Otwarte kwestie”.

## Przekierowania 301

`shared/signor/redirects.ts` przekierowuje w jednym kroku (bez łańcuchów):

- stare bazy WordPressa → trasy WooNuxt: `/produkt/x` → `/product/x`, `/kategoria-produktu/a/b` → `/product-category/b`, `/sklep` → `/products` (paginacja `/page/N` zostaje),
- literówki w dowolnym segmencie adresu: `barnsoletka`/`brasnoletka` → `bransoletka`, `tumrmalinem` → `turmalinem`,
- pojedyncze adresy w `EXACT_REDIRECTS`. Uzupełnij je z eksportu adresów albo z Search Console.

Middleware działa tylko na serwerze (Vercel albo Node). **Zalecane wdrożenie to Vercel** (ISR i przekierowania działają). Przy statycznym hostingu (Netlify `generate`) te reguły trzeba przepisać do `_redirects`.

## Uruchomienie

```bash
npm ci
cp .env.example .env    # uzupełnij STORE_LOCALE, GQL_HOST, NUXT_IMAGE_DOMAINS
npm run dev             # codegen pobiera schemat GraphQL z GQL_HOST
npm run test:signor     # testy logiki znaków, dopasowania produktów i przekierowań
```

## Zdjęcia

Używamy wyłącznie zdjęć ze sklepu (`wp-content/uploads`), pobieranych przez GraphQL. Hero na stronie głównej, miniatury w wyszukiwarce znaku i obrazy OG pochodzą ze zdjęć produktów. W kodzie nie ma zdjęć stockowych. Przykładowe grafiki WooNuxt w `woonuxt_base/public/images` nie są używane przez nadpisaną stronę główną.

## Otwarte kwestie

- **Kamienie dla Wagi, Strzelca, Koziorożca, Wodnika i Ryb:** brak danych. Uzupełnij `stoneId` w `shared/signor/zodiac.ts` (i ewentualnie nowy kamień w `stones.ts`). Do tego czasu te strony pokazują produkty pasujące nazwą do znaku, bez kamienia.
- **Przypisanie produktu do znaku:** dziś odbywa się po nazwie lub slugu produktu (np. „Bliźnięta”, „Lew”). Po uporządkowaniu slugów najlepiej wpisać dokładny `productSlug` dla każdego znaku.
- **Grawer (do 10 znaków), gwarancja +19,90 zł, kartka +8,90 zł:** WooNuxt nie obsługuje dodatków produktowych. Zależy to od wtyczki dodatków w sklepie (np. WooCommerce Product Add-Ons, YITH, TM Extra Product Options). Każda z nich wymaga rozszerzenia schematu WPGraphQL i pola w karcie produktu. Najprostsza alternatywa: gwarancja i kartka jako osobne, tanie produkty dodawane z koszyka, a grawer jako wariant z polem tekstowym.
- **Ceny dodatków w DE:** nieznane, dlatego niemieckie FAQ ich nie podaje.
- **Prototyp `index.html`:** nie było go w repozytorium. Strona główna została odtworzona na podstawie opisu funkcji (wyszukiwarka znaku, siatka 12 znaków, przewodnik po kamieniach, FAQ, JSON-LD). Sortowanie i filtry daje WooNuxt na `/products` i stronach kategorii.
