// Run with: node generate-resume-flutter.mjs
// Secondary resume — Flutter / Mobile Developer positioning.
// Use for: Flutter Developer, Mobile Developer, Cross-Platform App Developer roles.
// Output: Mohammed_Sohail_Resume_Flutter.docx in the project root

import { sectionTitle, para, run, bullet, leftRight, buildHeader, skillsGrid,
         educationSection, languagesSection, writeResume, DARK, ACCENT } from './resume-shared.mjs';

const header = buildHeader('Software Engineer | Flutter Developer | Full Stack');

const summarySection = [
  ...sectionTitle('Professional Summary'),
  para(run(
    'Software Engineer with 2+ years of software development experience and hands-on mobile application delivery using Flutter and Dart. Led development and deployment of a cross-platform Islamic Hijri Calendar application published on Google Play and Apple App Store, reaching 30,000+ downloads. Experienced with Firebase Authentication, FCM, Riverpod, Hive, multilingual support, and offline-first mobile architecture, with additional full-stack experience in React.js, Node.js, REST APIs, SQL, and JWT.'
  ), 6),
];

const experience = [
  ...sectionTitle('Professional Experience'),

  leftRight('Software Engineer — Full Stack Developer', 'July 2024 – Present'),
  para(run('Atmez AI Solutions · Hyderabad, India', { color: ACCENT, size: 21 }), 4),
  bullet('Led development and deployment of the Islamic Hijri Calendar Flutter application for Google Play and Apple App Store, reaching 30,000+ downloads.'),
  bullet('Implemented Firebase Authentication, Firebase Cloud Messaging (FCM), Riverpod state management, Hive offline storage, push notifications, and multilingual support.'),
  bullet('Designed the mobile application for a secure, scalable, and offline-first experience across Android and iOS.'),
  bullet('Supported full-stack enterprise products using React.js, Node.js, REST APIs, SQL databases, JWT authentication, and reusable component architecture.'),
  bullet('Built an E-Commerce Platform with Razorpay payments, inventory, authentication, Redis caching, and order tracking.'),
];

const skillsSection = [
  ...sectionTitle('Technical Expertise'),
  skillsGrid([
    { label: 'Mobile', value: 'Flutter, Dart, Firebase, Riverpod, Hive, Firebase Cloud Messaging' },
    { label: 'Mobile Architecture', value: 'Offline Storage, State Management, Push Notifications, Multilingual Support' },
    { label: 'Frontend', value: 'React.js, Next.js, HTML5, CSS3, TailwindCSS, Redux Toolkit' },
    { label: 'Backend', value: 'Node.js, Express.js, RESTful APIs, JWT Authentication' },
    { label: 'Databases', value: 'MySQL, PostgreSQL, Firebase Firestore' },
    { label: 'Cloud & DevOps', value: 'Git, GitHub, Docker, CI/CD, AWS, Vercel, Render' },
    { label: 'Testing', value: 'Playwright, Unit Testing, Debugging, API Testing' },
    { label: 'Tools & Practices', value: 'Google APIs, Redis, WebSocket, Razorpay, Agile, Scrum, Performance Optimization' },
  ]),
];

const projects = [
  ...sectionTitle('Key Projects'),

  para([run('Islamic Hijri Calendar', { bold: true, color: DARK }), run('  Flutter · Dart · Firebase · Riverpod · Hive · FCM  ', { color: ACCENT, italics: true }), run('Google Play · Apple App Store', { color: ACCENT })]),
  bullet('Published a cross-platform Islamic calendar application on Google Play and Apple App Store, reaching 30,000+ downloads.'),
  bullet('Integrated Firebase Authentication, Firebase Cloud Messaging, Riverpod state management, Hive offline storage, push notifications, and multilingual support.'),

  para([run('Atruha Finance', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · Redux Toolkit  ', { color: ACCENT, italics: true }), run('atruhafinance.com', { color: ACCENT })], 0),
  bullet('Supported a production financial analytics platform with real-time stock tracking, portfolio management, dashboards, JWT authentication, and REST APIs.'),

  para([run('StafWise', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · TailwindCSS  ', { color: ACCENT, italics: true }), run('stafwise.com', { color: ACCENT })], 0),
  bullet('Contributed to HR workflows covering onboarding, attendance, payroll, scheduling, reporting, and role-based access.'),

  para([run('E-Commerce Platform', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · Razorpay · Redis', { color: ACCENT, italics: true })], 0),
  bullet('Built product, payment, inventory, authentication, order management, and caching workflows.'),
];

const awards = [
  ...sectionTitle('Certifications'),
  bullet('C# & ASP.NET Core Developer — Microsoft Learn Certification'),
  bullet('Python Full Stack Developer — IHUB (Quality Thoughts)'),
  bullet('Data Science & Artificial Intelligence — DataLabs'),
  bullet('Training ISP First Trainings Contest — Internshala'),
];

const children = [
  ...header,
  ...summarySection,
  ...experience,
  ...skillsSection,
  ...projects,
  ...educationSection,
  ...awards,
  ...languagesSection,
];

writeResume(children, 'Mohammed_Sohail_Resume_Flutter.docx');
