import { MotionConfig } from 'framer-motion'
import Embers from './components/Embers.jsx'
import MagicalCursor from './components/MagicalCursor.jsx'
import Navbar, { ScrollProgress } from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Countdown from './components/Countdown.jsx'
import FestivalOfLights from './components/FestivalOfLights.jsx'
import PersonalLight from './components/PersonalLight.jsx'
import FiveDays from './components/FiveDays.jsx'
import DiyaExperience from './components/DiyaExperience.jsx'
import RangoliStudio from './components/RangoliStudio.jsx'
import SurpriseEnvelope from './components/SurpriseEnvelope.jsx'
import FireworksStage from './components/FireworksStage.jsx'
import Wishes from './components/Wishes.jsx'
import GrandFinale from './components/GrandFinale.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip">
        <Embers />
        <MagicalCursor />
        <div className="ambient-orbit ambient-orbit-one" aria-hidden="true" />
        <div className="ambient-orbit ambient-orbit-two" aria-hidden="true" />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Countdown />
          <FestivalOfLights />
          <PersonalLight />
          <FiveDays />
          <DiyaExperience />
          <RangoliStudio />
          <FireworksStage />
          <SurpriseEnvelope />
          <Wishes />
          <GrandFinale />
        </main>
        <Footer />
        <div className="grain" aria-hidden="true" />
      </div>
    </MotionConfig>
  )
}
