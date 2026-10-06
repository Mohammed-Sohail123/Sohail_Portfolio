export type ProjectCategory = 'Professional' | 'Mobile' | 'Personal' | 'Academic'

export interface Project {
  title: string
  category: ProjectCategory
  description: string
  impact?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  storeLinks?: { label: string; url: string }[]
  featured?: boolean
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  summary: string
  highlights: string[]
  technologies: string[]
}

export const profile = {
  name: 'Mohammed Sohail',
  role: 'Software Engineer',
  location: 'Hyderabad, Telangana, India',
  experience: '2+ years',
  email: 'sohailmohammedsohail268@gmail.com',
  github: 'https://github.com/Mohammed-Sohail123',
  linkedin: 'https://www.linkedin.com/in/mohammed-sohail-34b248286/',
  siteUrl: 'https://sohail-portfolio-five.vercel.app/',
}

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Articles', href: '#articles' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { value: 2, suffix: '+', label: 'Years experience' },
  { value: 30, suffix: 'K+', label: 'App downloads' },
  { value: 40, suffix: '%', label: 'More code reuse' },
  { value: 8, suffix: '+', label: 'Products delivered' },
]

export const skillGroups = [
  { title: 'Frontend', accent: 'blue', skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Angular', 'Tailwind CSS', 'Three.js'] },
  { title: 'Backend', accent: 'purple', skills: ['Node.js', 'Express.js', 'Django', 'ASP.NET', 'Spring Boot', 'REST APIs', 'WebSocket'] },
  { title: 'Mobile', accent: 'green', skills: ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'Hive', 'FCM'] },
  { title: 'Data', accent: 'pink', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Pandas', 'TensorFlow'] },
  { title: 'Cloud & Delivery', accent: 'blue', skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Vercel', 'Render', 'Agile/Scrum'] },
  { title: 'Product Engineering', accent: 'purple', skills: ['System Design', 'Scalable Architecture', 'Razorpay', 'Playwright', 'Analytics', 'SEO'] },
]

export const experiences: Experience[] = [
  {
    role: 'Software Engineer — Full Stack Developer',
    company: 'Atmez Ai Solutions',
    location: 'Hyderabad, India',
    period: 'July 2024 — Present',
    summary: 'Delivering production full-stack products across finance, enterprise operations, education, commerce, and mobile.',
    highlights: [
      'Built financial analytics experiences with stock tracking, portfolio management, role-based access, and high-volume REST APIs.',
      'Delivered staff, academic, and employee management platforms with multi-role workflows, reporting, attendance, and analytics.',
      'Promoted component-driven frontend architecture that improved code reuse across projects.',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Flutter', 'MySQL', 'PostgreSQL'],
  },
]

export const projects: Project[] = [
  {
    title: 'Atruha Finance',
    category: 'Professional',
    description: 'Production financial analytics platform with real-time stock tracking, portfolio management, interactive charts, and role-based access.',
    impact: '35% faster page loads through code splitting and lazy loading.',
    technologies: ['React', 'Node.js', 'MySQL', 'Redux Toolkit'],
    liveUrl: 'https://atruhafinance.com',
    featured: true,
  },
  {
    title: 'StafWise',
    category: 'Professional',
    description: 'Staff management SaaS for employee onboarding, attendance, payroll, secure role-based access, and exportable reporting.',
    technologies: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
    liveUrl: 'https://stafwise.com',
    featured: true,
  },
  {
    title: 'Acadlync',
    category: 'Professional',
    description: 'Academic administration platform for enrollment, timetables, grade tracking, reporting, and multi-role workflows.',
    technologies: ['React', 'TypeScript', 'PostgreSQL', 'REST APIs'],
    liveUrl: 'https://acadlynk.atmez.ai',
  },
  {
    title: 'Employee Management System',
    category: 'Professional',
    description: 'Employee operations platform with scoped Admin, Manager, and Employee access, leave tracking, attendance, and analytics.',
    technologies: ['React', 'TypeScript', 'MySQL', 'REST APIs'],
    liveUrl: 'https://ems.atmez.ai/',
  },
  {
    title: 'Islamic Hijri Calendar',
    category: 'Mobile',
    description: 'Cross-platform Islamic calendar with Hijri conversion, events, prayer notifications, four-language localization, and offline storage.',
    impact: '30,000+ downloads across the mobile stores.',
    technologies: ['Flutter', 'Firebase', 'Riverpod', 'Hive', 'FCM'],
    storeLinks: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.atmezai.islamichijricalendar' },
      { label: 'App Store', url: 'https://apps.apple.com/us/app/islamic-hijri-calendar/id6749267607' },
    ],
    featured: true,
  },
  {
    title: 'E-Commerce Application',
    category: 'Personal',
    description: 'Full-stack storefront with catalog, dynamic cart, orders, wishlists, product filtering, admin inventory, and Razorpay payments.',
    impact: '40% faster product responses with query optimization and Redis caching.',
    technologies: ['React', 'Node.js', 'MySQL', 'Razorpay', 'Redis'],
  },
  {
    title: 'Portfolio Website',
    category: 'Personal',
    description: 'Premium developer portfolio with motion, accessible interactions, smooth scrolling, and an ATS-friendly printable resume.',
    technologies: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
    liveUrl: profile.siteUrl,
    githubUrl: profile.github,
  },
  {
    title: 'Spammer Detection & Fake User Identification',
    category: 'Academic',
    description: 'Java social-network analysis system using graph-based behavior signals to identify suspicious and fake profiles.',
    impact: '87% detection accuracy on test datasets.',
    technologies: ['Java', 'Graph Algorithms', 'Social Network Analysis'],
  },
  {
    title: 'Eye Controlled Mouse',
    category: 'Academic',
    description: 'Hands-free HCI prototype using gaze, wink, and head-tilt gestures to control cursor actions from standard webcam input.',
    impact: 'Sub-100ms response latency in the project environment.',
    technologies: ['Python', 'OpenCV', 'Dlib', 'PyAutoGUI'],
  },
]

export const articles = [
  {
    title: 'Designing reusable frontends that scale',
    category: 'Frontend architecture',
    readTime: '6 min read',
    description: 'A field note on component boundaries, shared design systems, and the decisions behind improving code reuse across products.',
    tags: ['React', 'Architecture', 'Design Systems'],
  },
  {
    title: 'Performance patterns for data-heavy dashboards',
    category: 'Performance',
    readTime: '5 min read',
    description: 'Practical patterns for code splitting, lazy loading, API orchestration, and responsive visualizations in analytics products.',
    tags: ['React', 'APIs', 'Optimization'],
  },
  {
    title: 'Building offline-friendly Flutter experiences',
    category: 'Mobile engineering',
    readTime: '7 min read',
    description: 'Notes on state management, localization, push notifications, and resilient local data with Riverpod, Firebase, and Hive.',
    tags: ['Flutter', 'Firebase', 'Mobile'],
  },
]

export const floatingTechnologies = ['React', 'Node.js', 'Flutter', 'MongoDB', 'JavaScript', 'Express', 'WordPress']

export interface ResumeVariant {
  label: string
  description: string
  file: string
}

export const resumeVariants: ResumeVariant[] = [
  {
    label: 'Full Stack / MERN',
    description: 'React.js, Next.js, Node.js, TypeScript',
    file: '/resumes/Mohammed_Sohail_Resume_FullStack.pdf',
  },
  {
    label: 'Flutter / Mobile',
    description: 'Flutter, Dart, Firebase — 30K+ downloads app',
    file: '/resumes/Mohammed_Sohail_Resume_Flutter.pdf',
  },
  {
    label: 'Python & Data Foundations',
    description: 'Full-stack experience + Python/AI academic projects',
    file: '/resumes/Mohammed_Sohail_Resume_Python.pdf',
  },
  {
    label: 'C# / .NET Foundations',
    description: 'Full-stack experience + Microsoft certified C#/.NET',
    file: '/resumes/Mohammed_Sohail_Resume_DotNet.pdf',
  },
]
