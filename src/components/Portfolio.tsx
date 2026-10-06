import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import {
  ArrowUp, ArrowUpRight, BriefcaseBusiness, ChevronDown, ChevronRight,
  Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, Search, Sparkles, X,
} from 'lucide-react'
import {
  articles, experiences, floatingTechnologies, navItems, profile, projects,
  resumeVariants, skillGroups, stats, type ProjectCategory,
} from '../data/portfolio'
import { ContactForm } from './portfolio/ContactForm'
import { SectionHeading } from './portfolio/SectionHeading'

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface PortfolioProps {
  onOpenResume?: () => void
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function ResumeDownloadMenu() {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        className="group flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
      >
        <Download size={18} />
        Download Resume
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl border border-white/10 bg-[#0a0a1a] shadow-2xl overflow-hidden z-50"
          >
            {resumeVariants.map((variant) => (
              <a
                key={variant.file}
                href={variant.file}
                download
                onClick={() => setOpen(false)}
                className="block px-5 py-3 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
              >
                <div className="text-sm font-semibold text-white">{variant.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{variant.description}</div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.7 })
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    if (reducedMotion) { setCount(value); return }
    let start = 0
    const duration = 1500
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [visible, value, reducedMotion])

  return <span ref={ref}>{count}{suffix}</span>
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOADING SCREEN
// ═══════════════════════════════════════════════════════════════════════════════

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-purple-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.h1
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {profile.name}
        </motion.h1>
      </motion.div>
    </motion.div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// FLOATING ICONS
// ═══════════════════════════════════════════════════════════════════════════════

function FloatingIcons() {
  const icons = floatingTechnologies
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((tech, i) => (
        <motion.div
          key={tech}
          className="absolute text-white/10 text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            y: [0, -100],
            x: [0, Math.sin(i) * 50],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'linear',
          }}
          style={{
            left: `${10 + (i * 12) % 80}%`,
            top: `${70 + (i * 7) % 20}%`,
          }}
        >
          {tech}
        </motion.div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED BACKGROUND
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#030014]" />
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
          top: '-20%',
          left: '-10%',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
          bottom: '10%',
          right: '-5%',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)',
          top: '40%',
          left: '50%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════════

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          {profile.name.split(' ')[0]}
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-gray-400 hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={`mailto:${profile.email}`}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          <Mail size={16} />
          Hire Me
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-400"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium mt-2"
              >
                <Mail size={16} />
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <FloatingIcons />
      
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <Reveal>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles size={16} className="text-purple-400" />
            <span className="text-sm text-gray-300">Available for new opportunities</span>
          </motion.div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
              <img
                src="/sohail2.png"
                alt={profile.name}
                className="w-full h-full rounded-full object-cover border-4 border-[#030014]"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl md:text-2xl text-gray-400 mb-4 font-light">
            {profile.role} crafting{' '}
            <span className="text-purple-400">scalable web</span> &{' '}
            <span className="text-pink-400">mobile</span> experiences
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10">
            {profile.experience} of experience building production products at Atmez Ai Solutions.
            Specialized in React, Node.js, Flutter, and creating delightful user experiences.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#projects"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all"
            >
              View My Work
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
            >
              <Mail size={18} />
              Get In Touch
            </a>
            <ResumeDownloadMenu />
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="flex items-center justify-center gap-6 text-gray-400">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Github size={22} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Linkedin size={22} />
            </a>
            <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Mail size={22} />
            </a>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.6}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function AboutSection() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            eyebrow="About Me"
            title="Passionate about building impactful products"
            description="Full-stack engineer with a drive for clean code, great UX, and scalable architecture."
          />
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          <Reveal delay={0.1}>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                Hi! I'm Mohammed Sohail, a Software Engineer based in{' '}
                <span className="text-white">Hyderabad, India</span>. I graduated with a B.E. in
                Computer Science from Holy Mary Institute of Technology & Science (JNTU Hyderabad).
              </p>
              <p>
                Currently at <span className="text-purple-400 font-semibold">Atmez Ai Solutions</span>,
                I've built and shipped multiple production-grade applications — from financial analytics
                dashboards to cross-platform mobile apps with 30,000+ downloads.
              </p>
              <p>
                I'm driven by the challenge of turning complex problems into elegant digital solutions.
                Outside of work, I enjoy exploring new technologies, contributing to side projects, and
                staying updated on trends in web development and AI.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                {['React', 'TypeScript', 'Node.js', 'Flutter', 'PostgreSQL', 'REST APIs'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <BriefcaseBusiness className="text-purple-400 mb-3" size={28} />
                <div className="text-2xl font-bold text-white mb-1">{profile.experience}</div>
                <div className="text-sm text-gray-500">Professional experience</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Sparkles className="text-pink-400 mb-3" size={28} />
                <div className="text-2xl font-bold text-white mb-1">8+</div>
                <div className="text-sm text-gray-500">Products shipped</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm col-span-2">
                <MapPin className="text-cyan-400 mb-3" size={28} />
                <div className="text-lg font-bold text-white mb-1">{profile.location}</div>
                <div className="text-sm text-gray-500">Open to remote opportunities worldwide</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// SKILLS SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const accentColors: Record<string, string> = {
  blue: 'from-blue-500 to-cyan-500',
  purple: 'from-purple-500 to-pink-500',
  green: 'from-green-500 to-emerald-500',
  pink: 'from-pink-500 to-rose-500',
}

const borderColors: Record<string, string> = {
  blue: 'border-blue-500/20 hover:border-blue-500/40',
  purple: 'border-purple-500/20 hover:border-purple-500/40',
  green: 'border-green-500/20 hover:border-green-500/40',
  pink: 'border-pink-500/20 hover:border-pink-500/40',
}

function SkillsSection() {
  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="Technologies I work with"
            description="From frontend to backend, mobile to cloud — the tools I use to build great products."
            align="center"
          />
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-6 rounded-2xl bg-white/5 border backdrop-blur-sm transition-all duration-300 ${borderColors[group.accent]}`}
              >
                <h3 className={`text-lg font-bold mb-4 bg-gradient-to-r ${accentColors[group.accent]} bg-clip-text text-transparent`}>
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm rounded-full bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// EXPERIENCE SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function ExperienceSection() {
  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="My professional journey"
            align="center"
          />
        </Reveal>

        <div className="mt-16 relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 transform md:-translate-x-1/2" />

          {experiences.map((exp, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className={`relative flex flex-col md:flex-row gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-x-1/2 md:-translate-x-1/2 mt-6 z-10 shadow-lg shadow-purple-500/50" />

                {/* Content */}
                <div className={`flex-1 ml-8 md:ml-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-sm text-purple-400 font-mono">{exp.period}</span>
                      <span className="text-xs text-gray-500">{exp.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <p className="text-purple-400 font-medium mb-3">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-4">{exp.summary}</p>
                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                          <ChevronRight size={14} className="text-purple-400 mt-1 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// PROJECTS SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const categoryFilters: { label: string; value: ProjectCategory | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Professional', value: 'Professional' },
  { label: 'Mobile', value: 'Mobile' },
  { label: 'Personal', value: 'Personal' },
  { label: 'Academic', value: 'Academic' },
]

function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All')
  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Featured work"
            description="A selection of products I've built and shipped."
            align="center"
          />
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mt-12 mb-12">
            {categoryFilters.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Project grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`h-full p-6 rounded-2xl bg-white/5 border backdrop-blur-sm transition-all duration-300 flex flex-col ${
                    project.featured ? 'border-purple-500/30 shadow-lg shadow-purple-500/10' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 text-xs text-purple-400 mb-3">
                      <Sparkles size={12} />
                      Featured
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-400 mb-3 flex-grow">{project.description}</p>
                  {project.impact && (
                    <p className="text-xs text-green-400 mb-3 bg-green-500/10 px-3 py-1.5 rounded-full inline-block">
                      {project.impact}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs rounded-full bg-white/5 text-gray-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}
                    {project.storeLinks?.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <ArrowUpRight size={14} />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// ARTICLES SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function ArticlesSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <section id="articles" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Articles"
            title="Thoughts & learnings"
            description="Notes from the field on engineering, architecture, and building products."
            align="center"
          />
        </Reveal>

        {/* Search */}
        <Reveal delay={0.1}>
          <div className="max-w-md mx-auto mt-12 mb-12">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>
        </Reveal>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, i) => (
            <Reveal key={article.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-all cursor-pointer group"
              >
                <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2 group-hover:text-purple-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{article.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs rounded-full bg-white/5 text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No articles found matching "{searchQuery}"</p>
        )}
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function ContactSection() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let's work together"
            description="Have a project in mind? I'd love to hear about it. Let's create something amazing."
            align="center"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={18} className="text-purple-400" />
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={18} className="text-purple-400" />
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github size={18} className="text-purple-400" />
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#home" className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {profile.name}
            </a>
            <p className="text-sm text-gray-500 mt-1">
              Building digital experiences that matter.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {navItems.slice(0, 5).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${profile.email}`} className="text-gray-500 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} {profile.name}. Crafted with ❤️ using React & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// BACK TO TOP BUTTON
// ═══════════════════════════════════════════════════════════════════════════════

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PORTFOLIO COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function Portfolio(_props: PortfolioProps) {
  const [loading, setLoading] = useState(true)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen text-white">
          <AnimatedBackground />
          <Navigation />
          
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ArticlesSection />
            <ContactSection />
          </main>

          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  )
}
