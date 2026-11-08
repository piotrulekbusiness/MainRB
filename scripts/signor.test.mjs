// Run with: npm run test:signor  (Node >= 22.18 strips TypeScript types natively)
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { resolveLegacyRedirect } from '../shared/signor/redirects.ts';
import { STONES } from '../shared/signor/stones.ts';
import { ZODIAC_SIGNS, productMatchesSign, productMatchesStems, signForDate } from '../shared/signor/zodiac.ts';

const sign = (id) => ZODIAC_SIGNS.find((s) => s.id === id);

test('signForDate covers sign boundaries, including Capricorn across new year', () => {
  assert.equal(signForDate(3, 21)?.id, 'aries');
  assert.equal(signForDate(4, 19)?.id, 'aries');
  assert.equal(signForDate(4, 20)?.id, 'taurus');
  assert.equal(signForDate(12, 22)?.id, 'capricorn');
  assert.equal(signForDate(1, 1)?.id, 'capricorn');
  assert.equal(signForDate(1, 19)?.id, 'capricorn');
  assert.equal(signForDate(1, 20)?.id, 'aquarius');
  assert.equal(signForDate(2, 29)?.id, 'pisces');
  assert.equal(signForDate(13, 1), undefined);
});

test('every day of the year maps to exactly one sign', () => {
  for (let month = 1; month <= 12; month++) {
    const days = new Date(2000, month, 0).getDate();
    for (let day = 1; day <= days; day++) {
      const matches = ZODIAC_SIGNS.filter((s) => signForDate(month, day)?.id === s.id);
      assert.equal(matches.length, 1, `${day}.${month}`);
    }
  }
});

test('every sign has the stone used in the shop', () => {
  const expected = {
    aries: 'turmalin',
    taurus: 'lapis-lazuli',
    gemini: 'tygrysie-oko',
    cancer: 'opal',
    leo: 'onyks',
    virgo: 'jaspis',
    libra: 'cytryn',
    scorpio: 'hematyt',
    sagittarius: 'ametyst',
    capricorn: 'granat',
    aquarius: 'turkus',
    pisces: 'akwamaryn',
  };
  for (const s of ZODIAC_SIGNS) assert.equal(s.stoneId, expected[s.id], s.id);
  for (const id of Object.values(expected))
    assert.ok(
      STONES.some((stone) => stone.id === id),
      id,
    );
});

test('product name matching by sign (PL/DE) without false positives', () => {
  assert.ok(productMatchesSign('pl', sign('gemini'), { name: 'Bransoletka znak zodiaku Bliźnięta z tygrysim okiem' }));
  assert.ok(productMatchesSign('pl', sign('leo'), { name: 'Bransoletka Lew onyks' }));
  assert.ok(productMatchesSign('pl', sign('cancer'), { slug: 'bransoletka-znak-zodiaku-rak-opal' }));
  assert.ok(!productMatchesSign('pl', sign('cancer'), { name: 'Bransoletka z kamieni, brak grawerunku' }));
  assert.ok(!productMatchesSign('pl', sign('leo'), { name: 'Bransoletka lewa' }));
  assert.ok(productMatchesSign('de', sign('leo'), { name: 'Sternzeichen Armband Löwe Onyx' }));
  assert.ok(productMatchesSign('de', sign('sagittarius'), { name: 'Armband Schütze' }));
  assert.ok(productMatchesStems(['turmalin'], { slug: 'bransoletka-z-turmalinem' }));
  assert.ok(productMatchesStems(['hamatit', 'haematit'], { name: 'Armband Hämatit' }));
});

test('real shop product names match their sign', () => {
  const real = {
    aries: 'BRANSOLETKA ZODIAKI: BARAN',
    gemini: 'BRANSOLETKA REGULOWANA ZODIAK: BLIŹNIĘTA',
    cancer: 'BRANSOLETKA ZODIAKI: RAK',
    leo: 'BRANSOLETKA REGULOWANA ZODIAK: LEW',
    virgo: 'BRANSOLETKA ZODIAKI: PANNA',
    libra: 'BRANSOLETKA REGULOWANA ZODIAK: WAGA',
    capricorn: 'BRANSOLETKA ZODIAKI: KOZIOROŻEC',
    pisces: 'BRANSOLETKA ZODIAKI: RYBY',
  };
  for (const [id, name] of Object.entries(real)) {
    const matches = ZODIAC_SIGNS.filter((s) => productMatchesSign('pl', s, { name }));
    assert.deepEqual(
      matches.map((s) => s.id),
      [id],
      name,
    );
  }
});

test('legacy redirects: typos, WP permalink bases, single hop', () => {
  assert.equal(resolveLegacyRedirect('/product/barnsoletka-baran-z-tumrmalinem'), '/product/bransoletka-baran-z-turmalinem');
  assert.equal(resolveLegacyRedirect('/produkt/brasnoletka-lew-onyks/'), '/product/bransoletka-lew-onyks');
  assert.equal(resolveLegacyRedirect('/kategoria-produktu/bransoletki/z-kamieni/'), '/product-category/z-kamieni');
  assert.equal(resolveLegacyRedirect('/kategoria-produktu/bransoletki/z-kamieni/page/2/'), '/product-category/z-kamieni/page/2');
  assert.equal(resolveLegacyRedirect('/sklep/'), '/products');
  assert.equal(resolveLegacyRedirect('/sklep/page/3'), '/products/page/3');
  assert.equal(resolveLegacyRedirect('/product/bransoletka-lew-onyks'), null);
  assert.equal(resolveLegacyRedirect('/product-category/z-kamieni'), null);
  assert.equal(resolveLegacyRedirect('/znaki-zodiaku/baran'), null);
  assert.equal(resolveLegacyRedirect('/produkt/brak-tytulu/'), '/product/bransoletka-regulowana-zodiak-panna');
  assert.equal(resolveLegacyRedirect('/produkt/brak-tytulu-2/'), '/product/bransoletka-regulowana-zodiak-lew');
  assert.equal(
    resolveLegacyRedirect('/produkt/regulowana-bransoletka-z-tumrmalinem-i-brylka-tygrysiego-oka/'),
    '/product/regulowana-bransoletka-z-turmalinem-i-brylka-tygrysiego-oka',
  );
  assert.equal(resolveLegacyRedirect('/'), null);
  assert.equal(resolveLegacyRedirect('/%E0%A4%A'), null);
});
