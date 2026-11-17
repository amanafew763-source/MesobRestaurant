# Mesob — restaurant website

A one-page bilingual website (German default, English via the DE/EN switch) for Mesob,
an Ethiopian & Eritrean restaurant. Built with React + Vite. No backend — it builds to
plain static files.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev        # opens a live-reloading preview at http://localhost:5173
```

## Build for the web

```bash
npm run build      # creates the finished site in the dist/ folder
npm run preview    # check the built version locally
```

Upload the contents of `dist/` to any static host. Free options:

- **Netlify** — drag the `dist` folder onto app.netlify.com/drop
- **Vercel** or **Cloudflare Pages** — connect the GitHub repo; build command `npm run build`, output folder `dist`
- **GitHub Pages** — push `dist` to a `gh-pages` branch (works because `base: './'` is set)

## Where to change things

| What | File |
|---|---|
| All text, both languages | `src/i18n/translations.js` |
| Menu dishes, descriptions, prices | `src/data/menu.js` |
| Customer photos for the carousel | `src/data/guests.js` + images in `public/images/guests/` |
| Colors, fonts, spacing | top of `src/styles.css` (`:root` variables) |
| Phone link, directions link, Instagram | `src/components/Sections.jsx` (look for the comments) |
| Legal pages | `public/impressum.html`, `public/datenschutz.html` |
| Default language | `DEFAULT_LANG` in `src/i18n/LanguageContext.jsx` |

### Adding customer photos

1. Put images in `public/images/guests/` (landscape, ~1600 × 900 px, JPG or WebP).
2. In `src/data/guests.js` set `src: 'images/guests/your-photo.jpg'` and write captions.
3. Add or remove entries — the carousel adapts to however many photos there are.

Only publish photos of guests who have given permission.

## Placeholders to fill in

Search the project for `[` — every `[LIKE THIS]` value is a placeholder:
prices, address, hours, phone, ceremony times, and the legal pages.

## Notes

- Fonts (Bricolage Grotesque, Inter, Noto Sans Ethiopic) are bundled locally — no calls to
  Google's servers, which matters for GDPR in Germany/Austria/Switzerland.
- The chosen language is remembered in the visitor's browser.
- The carousel autoplays every 6 s, pauses on hover/focus, has a pause button, supports
  swipe and arrow keys, and doesn't autoplay for visitors who prefer reduced motion.
