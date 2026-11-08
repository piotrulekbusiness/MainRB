import type { Localized } from './store';

/**
 * FAQ shown on the homepage and emitted as FAQPage JSON-LD.
 * Only facts confirmed for the shop. Do not add delivery times or materials here until
 * they are confirmed. DE prices for extras are not confirmed, so the DE copy omits them.
 */
export const FAQ: Array<{ question: Localized; answer: Localized }> = [
  {
    question: {
      pl: 'Jak dobrać rozmiar bransoletki?',
      de: 'Wie finde ich die richtige Armbandgröße?',
    },
    answer: {
      pl: 'Zmierz obwód nadgarstka centymetrem krawieckim. Rozmiar S pasuje na 16–17 cm, M na 18–19 cm, a L na 20–21 cm.',
      de: 'Messen Sie Ihren Handgelenkumfang mit einem Maßband. Größe S passt bei 16–17 cm, M bei 18–19 cm und L bei 20–21 cm.',
    },
  },
  {
    question: {
      pl: 'Jak sprawdzić swój znak zodiaku i kamień?',
      de: 'Wie finde ich mein Sternzeichen und meinen Stein?',
    },
    answer: {
      pl: 'Wpisz datę urodzenia w wyszukiwarce na stronie głównej. Pokażemy Twój znak, przypisany mu kamień i pasującą bransoletkę.',
      de: 'Geben Sie Ihr Geburtsdatum in die Suche auf der Startseite ein. Wir zeigen Ihr Sternzeichen, den zugeordneten Stein und das passende Armband.',
    },
  },
  {
    question: {
      pl: 'Czy mogę dodać grawer?',
      de: 'Kann ich eine Gravur hinzufügen?',
    },
    answer: {
      pl: 'Tak. Grawer może mieć do 10 znaków, np. imię lub datę.',
      de: 'Ja. Die Gravur kann bis zu 10 Zeichen lang sein, z. B. ein Name oder ein Datum.',
    },
  },
  {
    question: {
      pl: 'Czy bransoletkę można kupić na prezent?',
      de: 'Kann ich das Armband als Geschenk kaufen?',
    },
    answer: {
      pl: 'Tak. Do zamówienia możesz dodać kartkę z życzeniami (+8,90 zł) oraz rozszerzoną gwarancję (+19,90 zł).',
      de: 'Ja. Sie können Ihrer Bestellung eine Grußkarte und eine erweiterte Garantie hinzufügen.',
    },
  },
  {
    question: {
      pl: 'Gdzie powstaje biżuteria Signor?',
      de: 'Wo wird der Signor-Schmuck hergestellt?',
    },
    answer: {
      pl: 'Każdą bransoletkę wykonujemy ręcznie w naszym warsztacie w Warszawie.',
      de: 'Jedes Armband wird von Hand in unserer Werkstatt in Warschau gefertigt.',
    },
  },
];
