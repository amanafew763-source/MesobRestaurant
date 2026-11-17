import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts are bundled with the site (no requests to Google servers — GDPR-friendly)
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/inter'
import '@fontsource/noto-sans-ethiopic/500.css'
import '@fontsource/noto-sans-ethiopic/700.css'

import './styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
