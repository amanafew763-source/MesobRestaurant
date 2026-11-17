// Drinks menu, grouped by category. Replace "[€]" with real prices and
// "[…]" with the brands you actually serve.

export const drinks = [
  {
    id: 'coffee',
    title: { de: 'Kaffee & Tee', en: 'Coffee & tea' },
    items: [
      {
        name: 'Bunna',
        geez: 'ቡና',
        desc: { de: 'Äthiopischer Kaffee, frisch geröstet und in der Jebena gebrüht.', en: 'Ethiopian coffee, freshly roasted and brewed in the jebena.' },
        price: '[€]',
      },
      {
        name: 'Macchiato',
        desc: { de: 'Kräftiger Espresso mit aufgeschäumter Milch – wie in Addis und Asmara.', en: 'Strong espresso with foamed milk, the way it’s served in Addis and Asmara.' },
        price: '[€]',
      },
      {
        name: 'Shai',
        geez: 'ሻይ',
        desc: { de: 'Schwarzer Tee mit Zimt, Nelken und Kardamom.', en: 'Black tea spiced with cinnamon, cloves and cardamom.' },
        price: '[€]',
      },
      {
        name: { de: 'Kaffeezeremonie', en: 'Coffee ceremony' },
        desc: { de: 'Drei Runden für den ganzen Tisch, mit Popcorn und Weihrauch.', en: 'Three rounds for the whole table, with popcorn and frankincense.' },
        price: '[€ / Tisch]',
      },
    ],
  },
  {
    id: 'traditional',
    title: { de: 'Traditionell', en: 'Traditional' },
    items: [
      {
        name: 'Tej',
        geez: 'ጠጅ',
        desc: { de: 'Goldener Honigwein, mit Gesho-Blättern vergoren, im Berele serviert.', en: 'Golden honey wine fermented with gesho leaves, served in a berele flask.' },
        price: '[€]',
      },
      {
        name: 'Tej',
        tag: { de: 'alkoholfrei', en: 'alcohol-free' },
        desc: { de: 'Süßer Honigtrank nach Tej-Art, ohne Alkohol.', en: 'Sweet tej-style honey drink without alcohol.' },
        price: '[€]',
      },
      {
        name: 'Tella',
        geez: 'ጠላ',
        desc: { de: 'Hausgebrautes Bier aus Gerste und Gesho, leicht rauchig.', en: 'Home-style beer brewed from barley and gesho, lightly smoky.' },
        price: '[€]',
      },
    ],
  },
  {
    id: 'beer-wine',
    title: { de: 'Bier & Wein', en: 'Beer & wine' },
    items: [
      {
        name: { de: 'Äthiopisches Bier', en: 'Ethiopian beer' },
        desc: { de: '[MARKEN, z. B. 0,33 l Flasche]', en: '[BRANDS, e.g. 330 ml bottle]' },
        price: '[€]',
      },
      {
        name: { de: 'Eritreisches Bier', en: 'Eritrean beer' },
        desc: { de: '[MARKE, 0,33 l Flasche]', en: '[BRAND, 330 ml bottle]' },
        price: '[€]',
      },
      {
        name: { de: 'Bier vom Fass', en: 'Draught beer' },
        desc: { de: '[MARKE · 0,3 l / 0,5 l]', en: '[BRAND · 0.3 l / 0.5 l]' },
        price: '[€]',
      },
      {
        name: { de: 'Hauswein', en: 'House wine' },
        desc: { de: '[ROT / WEISS · 0,2 l]', en: '[RED / WHITE · 0.2 l]' },
        price: '[€]',
      },
    ],
  },
  {
    id: 'soft',
    title: { de: 'Alkoholfrei', en: 'Soft drinks' },
    items: [
      {
        name: 'Spris',
        desc: { de: 'Geschichteter Frucht-Smoothie aus Avocado, Mango und Papaya.', en: 'Layered fruit smoothie of avocado, mango and papaya.' },
        price: '[€]',
      },
      {
        name: { de: 'Frische Säfte', en: 'Fresh juices' },
        desc: { de: 'Mango, Avocado oder Orange.', en: 'Mango, avocado or orange.' },
        price: '[€]',
      },
      {
        name: { de: 'Mineralwasser', en: 'Mineral water' },
        desc: { de: 'Still oder sprudelnd · [0,25 l / 0,75 l]', en: 'Still or sparkling · [0.25 l / 0.75 l]' },
        price: '[€]',
      },
      {
        name: { de: 'Softdrinks', en: 'Soft drinks' },
        desc: { de: '[AUSWAHL]', en: '[SELECTION]' },
        price: '[€]',
      },
    ],
  },
]
