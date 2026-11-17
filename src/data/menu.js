// Menu dishes. Names and Ge'ez script stay the same in both languages;
// descriptions are per language. Replace "price" with your real prices, e.g. "14,50 €".
// tag = key in translations.menu.tags, heat = key in translations.menu.heat

export const menu = {
  veggie: [
    {
      name: 'Misir Wot', geez: 'ምስር ወጥ', tag: 'vegan', heat: 'hot', price: '[€]',
      desc: {
        de: 'Rote Linsen, mit Zwiebeln, Knoblauch und Berbere sämig geschmort.',
        en: 'Red lentils simmered with onion, garlic and berbere until thick and silky.',
      },
    },
    {
      name: 'Kik Alicha', geez: 'ክክ አልጫ', tag: 'vegan', heat: 'mild', price: '[€]',
      desc: {
        de: 'Gelbe Schälerbsen, sanft gegart mit Kurkuma, Ingwer und Knoblauch.',
        en: 'Yellow split peas cooked gently with turmeric, ginger and garlic.',
      },
    },
    {
      name: 'Shiro', geez: 'ሽሮ', tag: 'vegan', heat: 'medium', price: '[€]',
      desc: {
        de: 'Cremiger, herzhafter Eintopf aus gewürztem Kichererbsenmehl – auf beiden Seiten der Grenze beliebt.',
        en: 'Smooth, savory stew of seasoned chickpea flour, loved on both sides of the border.',
      },
    },
    {
      name: 'Gomen', geez: 'ጎመን', tag: 'vegan', heat: 'mild', price: '[€]',
      desc: {
        de: 'Blattkohl, geschmort mit Knoblauch, Ingwer und grüner Chili.',
        en: 'Collard greens braised with garlic, ginger and green chili.',
      },
    },
    {
      name: 'Atakilt Wot', geez: 'አትክልት ወጥ', tag: 'vegan', heat: 'mild', price: '[€]',
      desc: {
        de: 'Weißkohl, Karotten und Kartoffeln, langsam mit Kurkuma gegart.',
        en: 'Cabbage, carrots and potatoes slow-cooked with turmeric.',
      },
    },
    {
      name: 'Fosolia', geez: 'ፎሶሊያ', tag: 'vegan', heat: 'mild', price: '[€]',
      desc: {
        de: 'Grüne Bohnen und Karotten, mit Zwiebeln und Knoblauch angebraten.',
        en: 'Green beans and carrots sautéed with onion and garlic.',
      },
    },
  ],
  meat: [
    {
      name: 'Doro Wot', geez: 'ዶሮ ወጥ', tag: 'chicken', heat: 'hot', price: '[€]',
      desc: {
        de: 'Hähnchen, in Berbere und gewürzter Butter geschmort, serviert mit einem hartgekochten Ei.',
        en: 'Chicken slow-stewed in berbere and spiced butter, served with a hard-boiled egg.',
      },
    },
    {
      name: 'Zigni', geez: 'ዝግኒ', tag: 'beef', heat: 'hot', price: '[€]',
      desc: {
        de: 'Rindfleischeintopf nach eritreischer Art, kräftig mit Berbere, Tomate und Zwiebel.',
        en: 'Eritrean-style beef stew, rich with berbere, tomato and onion.',
      },
    },
    {
      name: 'Tibs', geez: 'ጥብስ', tag: 'beefLamb', heat: 'medium', price: '[€]',
      desc: {
        de: 'Rind- oder Lammwürfel, scharf angebraten mit Zwiebeln, Rosmarin und Jalapeño.',
        en: 'Cubes of beef or lamb sizzled with onion, rosemary and jalapeño.',
      },
    },
    {
      name: 'Kitfo', geez: 'ክትፎ', tag: 'beef', heat: 'hot', price: '[€]',
      desc: {
        de: 'Gehacktes Rindfleisch mit Mitmita und gewürzter Butter – roh, halb durch oder durchgegart.',
        en: 'Minced beef with mitmita and spiced butter, served raw, rare or cooked through.',
      },
    },
    {
      name: 'Key Wot', geez: 'ቀይ ወጥ', tag: 'beef', heat: 'hot', price: '[€]',
      desc: {
        de: 'Zartes Rindfleisch, in tiefroter Berbere-Sauce geschmort.',
        en: 'Tender beef simmered in a deep red berbere sauce.',
      },
    },
    {
      name: 'Alicha Sega Wot', geez: 'አልጫ ስጋ ወጥ', tag: 'lamb', heat: 'mild', price: '[€]',
      desc: {
        de: 'Lamm, mild geschmort mit Kurkuma, Ingwer und Knoblauch.',
        en: 'Lamb stewed mildly with turmeric, ginger and garlic.',
      },
    },
  ],
  combo: { price: '[€]' },
}
