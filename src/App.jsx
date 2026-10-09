import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { initSmoothScroll, lockScroll } from './lib/scroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Work from './components/Work'
import About from './components/About'
import Process from './components/Process'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => initSmoothScroll(), [])
  useEffect(() => lockScroll(loading), [loading])

  const done = useCallback(() => setLoading(false), [])
  const openProject = useCallback((i) => i >= 0 && setActiveProject(i), [])
  const closeProject = useCallback(() => setActiveProject(null), [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="preloader" onDone={done} />}</AnimatePresence>

      <Cursor />
      <ScrollProgress />
      <Navbar ready={!loading} />

      <main>
        <Hero ready={!loading} onOpenProject={openProject} />
        <Marquee />
        <Work onOpen={openProject} />
        <About />
        <Process />
        <Experience />
        <Contact />
      </main>
      <Footer />

      <div aria-hidden className="noise pointer-events-none fixed inset-0 z-[60] opacity-[0.035]" />

      <AnimatePresence>
        {activeProject !== null && (
          <ProjectModal
            key="project-modal"
            index={activeProject}
            onClose={closeProject}
            onNavigate={setActiveProject}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
