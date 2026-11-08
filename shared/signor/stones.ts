import type { Localized, Market } from './store';

/**
 * Natural stones used in the shop's bracelets.
 *
 * Copy describes the stone and its traditional symbolism only. Keep it free of
 * health or healing claims.
 *
 * `match` lists word stems searched in product names and slugs (diacritics removed,
 * lowercase), so every product made with the stone appears on its page, not only the
 * zodiac bracelets.
 */
export interface Stone {
  id: string;
  slug: Localized;
  name: Localized;
  /** Instrumental/adjective form used in headings, e.g. "z onyksu". */
  fromStone: Localized;
  match: Localized<string[]>;
  intro: Localized;
  description: Localized;
}

export const STONES: Stone[] = [
  {
    id: 'turmalin',
    slug: { pl: 'turmalin', de: 'turmalin' },
    name: { pl: 'Turmalin', de: 'Turmalin' },
    fromStone: { pl: 'z turmalinem', de: 'mit Turmalin' },
    match: { pl: ['turmalin'], de: ['turmalin'] },
    intro: {
      pl: 'Czarny turmalin to jeden z najciemniejszych kamieni naturalnych. W tradycji uchodzi za kamień ochronny.',
      de: 'Schwarzer Turmalin gehört zu den dunkelsten Natursteinen. Traditionell gilt er als Schutzstein.',
    },
    description: {
      pl: 'Turmalin ma matowy lub lekko błyszczący, głęboko czarny kolor, dzięki czemu pasuje do codziennych, męskich stylizacji. W naszej ofercie to kamień przypisany Baranowi.',
      de: 'Turmalin hat eine tiefschwarze, matte bis leicht glänzende Farbe und passt zu jedem Alltagslook. In unserem Sortiment ist er dem Widder zugeordnet.',
    },
  },
  {
    id: 'lapis-lazuli',
    slug: { pl: 'lapis-lazuli', de: 'lapislazuli' },
    name: { pl: 'Lapis lazuli', de: 'Lapislazuli' },
    fromStone: { pl: 'z lapis lazuli', de: 'mit Lapislazuli' },
    match: { pl: ['lapis'], de: ['lapis'] },
    intro: {
      pl: 'Lapis lazuli to intensywnie niebieski kamień ze złotymi drobinkami pirytu, ceniony od starożytności.',
      de: 'Lapislazuli ist ein tiefblauer Stein mit goldenen Pyrit-Einschlüssen, geschätzt seit der Antike.',
    },
    description: {
      pl: 'Każdy koralik lapis lazuli ma nieco inny rysunek, więc żadna bransoletka nie jest identyczna. W naszej ofercie to kamień Byka.',
      de: 'Jede Lapislazuli-Perle hat eine etwas andere Zeichnung, daher gleicht kein Armband dem anderen. In unserem Sortiment ist er der Stein des Stiers.',
    },
  },
  {
    id: 'tygrysie-oko',
    slug: { pl: 'tygrysie-oko', de: 'tigerauge' },
    name: { pl: 'Tygrysie oko', de: 'Tigerauge' },
    fromStone: { pl: 'z tygrysim okiem', de: 'mit Tigerauge' },
    match: { pl: ['tygrys'], de: ['tigerauge'] },
    intro: {
      pl: 'Tygrysie oko to złoto-brązowy kamień o charakterystycznym, falującym połysku.',
      de: 'Tigerauge ist ein goldbrauner Stein mit seinem typischen, wandernden Lichtschimmer.',
    },
    description: {
      pl: 'Pasma światła przesuwają się po koralikach przy każdym ruchu dłoni. W naszej ofercie to kamień Bliźniąt.',
      de: 'Bei jeder Handbewegung wandern Lichtbänder über die Perlen. In unserem Sortiment ist es der Stein der Zwillinge.',
    },
  },
  {
    id: 'opal',
    slug: { pl: 'opal', de: 'opal' },
    name: { pl: 'Opal', de: 'Opal' },
    fromStone: { pl: 'z opalem', de: 'mit Opal' },
    match: { pl: ['opal'], de: ['opal'] },
    intro: {
      pl: 'Opal to kamień o mlecznej, delikatnie opalizującej barwie.',
      de: 'Opal ist ein Stein mit milchiger, zart schimmernder Farbe.',
    },
    description: {
      pl: 'Jasny opal łagodzi męską stylizację i dobrze łączy się z ciemniejszymi bransoletkami. W naszej ofercie to kamień Raka.',
      de: 'Heller Opal lockert einen maskulinen Look auf und lässt sich gut mit dunkleren Armbändern kombinieren. In unserem Sortiment ist er der Stein des Krebses.',
    },
  },
  {
    id: 'onyks',
    slug: { pl: 'onyks', de: 'onyx' },
    name: { pl: 'Onyks', de: 'Onyx' },
    fromStone: { pl: 'z onyksem', de: 'mit Onyx' },
    match: { pl: ['onyks', 'onyx'], de: ['onyx'] },
    intro: {
      pl: 'Onyks to klasyczny czarny kamień o głębokim połysku, najpopularniejszy w biżuterii męskiej.',
      de: 'Onyx ist der klassische schwarze Stein mit tiefem Glanz und ein Favorit im Herrenschmuck.',
    },
    description: {
      pl: 'Błyszczący onyks wygląda elegancko zarówno do koszuli, jak i do T-shirtu. W naszej ofercie to kamień Lwa.',
      de: 'Glänzender Onyx wirkt zum Hemd ebenso elegant wie zum T-Shirt. In unserem Sortiment ist er der Stein des Löwen.',
    },
  },
  {
    id: 'jaspis',
    slug: { pl: 'jaspis', de: 'jaspis' },
    name: { pl: 'Jaspis', de: 'Jaspis' },
    fromStone: { pl: 'z jaspisem', de: 'mit Jaspis' },
    match: { pl: ['jaspis'], de: ['jaspis'] },
    intro: {
      pl: 'Jaspis to nieprzezroczysty kamień o ziemistych barwach i naturalnych wzorach.',
      de: 'Jaspis ist ein undurchsichtiger Stein mit erdigen Farben und natürlichen Mustern.',
    },
    description: {
      pl: 'Wzór jaspisu na każdym koraliku jest inny, przez co bransoletka ma naturalny, surowy charakter. W naszej ofercie to kamień Panny.',
      de: 'Das Muster ist auf jeder Jaspis-Perle anders und verleiht dem Armband einen natürlichen, rauen Charakter. In unserem Sortiment ist er der Stein der Jungfrau.',
    },
  },
  {
    id: 'hematyt',
    slug: { pl: 'hematyt', de: 'haematit' },
    name: { pl: 'Hematyt', de: 'Hämatit' },
    fromStone: { pl: 'z hematytem', de: 'mit Hämatit' },
    match: { pl: ['hematyt'], de: ['hamatit', 'haematit', 'hematit'] },
    intro: {
      pl: 'Hematyt to ciężki, metalicznie lśniący kamień w odcieniu grafitu.',
      de: 'Hämatit ist ein schwerer, metallisch glänzender Stein in Graphit-Tönen.',
    },
    description: {
      pl: 'Metaliczny połysk hematytu przypomina stal, dlatego świetnie łączy się z zegarkiem. W naszej ofercie to kamień Skorpiona.',
      de: 'Der metallische Glanz von Hämatit erinnert an Stahl und harmoniert hervorragend mit einer Uhr. In unserem Sortiment ist er der Stein des Skorpions.',
    },
  },
];

export const findStoneBySlug = (market: Market, slug: string): Stone | undefined => STONES.find((stone) => stone.slug[market] === slug);

export const findStoneById = (id: string | null | undefined): Stone | undefined => (id ? STONES.find((stone) => stone.id === id) : undefined);
