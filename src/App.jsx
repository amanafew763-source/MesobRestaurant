import { LanguageProvider } from './i18n/LanguageContext'
import Header from './components/Header'
import { Hero, Story, Coffee, Visit, Footer } from './components/Sections'
import Menu from './components/Menu'
import Drinks from './components/Drinks'
import GuestCarousel from './components/GuestCarousel'
import { TiletBand } from './components/Illustrations'

export default function App() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <TiletBand />
        <Story />
        <Coffee />
        <Menu />
        <Drinks />
        <TiletBand />
        <GuestCarousel />
        <Visit />
      </main>
      <TiletBand />
      <Footer />
    </LanguageProvider>
  )
}
