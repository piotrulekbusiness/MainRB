/**
 * Signor Store app configuration. Deep-merged over woonuxt_base/app/app.config.ts.
 * Market-specific copy (PL/DE) lives in shared/signor/*.
 */
export default defineAppConfig({
  siteName: 'Signor Store',
  shortDescription: 'Męska biżuteria z kamieni naturalnych i znaków zodiaku, ręcznie robiona w Warszawie.',
  description: 'Męskie bransoletki z kamieni naturalnych dobranych do znaku zodiaku. Rozmiary S, M, L, grawer do 10 znaków, warsztat w Warszawie.',
  baseUrl: 'https://signorstore.pl',
  // Empty: OG images come from product photos (wp-content/uploads), never from stock images.
  siteImage: '',
  storeSettings: {
    showSKU: false,
  },
});
