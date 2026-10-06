// Run with: node generate-resume-fullstack.mjs
// Primary resume — Full Stack / MERN positioning.
// Use for: Full Stack Developer, MERN Stack Developer, React Developer,
// Node.js Developer, Next.js Developer, Software Engineer roles.
// Output: Mohammed_Sohail_Resume_FullStack.docx in the project root

import { sectionTitle, para, run, bullet, leftRight, buildHeader, skillsGrid,
         educationSection, languagesSection, writeResume, DARK, ACCENT } from './resume-shared.mjs';

const header = buildHeader('Software Engineer | Full Stack Developer | React.js | Node.js | TypeScript');

const summarySection = [
  ...sectionTitle('Professional Summary'),
  para(run(
    'Results-driven Software Engineer with 2+ years of hands-on experience designing, developing, and deploying full-stack web and mobile applications. Strong experience with React.js, Next.js, TypeScript, Node.js, REST APIs, JWT Authentication, MySQL, PostgreSQL, MongoDB, and Firebase. Delivered production solutions across finance, HR, education, e-commerce, and mobile applications, including a Flutter app with 30,000+ downloads. Focused on scalable architecture, performance optimization, secure APIs, and Agile delivery.'
  ), 6),
];

const experience = [
  ...sectionTitle('Professional Experience'),

  leftRight('Software Engineer — Full Stack Developer', 'July 2024 – Present'),
  para(run('Atmez AI Solutions · Hyderabad, India', { color: ACCENT, size: 21 }), 4),
  bullet('Built Atruha Finance, a financial analytics platform using React.js, Node.js, Redux Toolkit, MySQL, and REST APIs, with real-time stock tracking, portfolio management, and interactive dashboards.'),
  bullet('Optimized application performance through REST API optimization, lazy loading, reusable React components, and efficient backend architecture.'),
  bullet('Contributed to StafWise, an enterprise HR management SaaS using React.js, Node.js, MySQL, and JWT Authentication for attendance, payroll, and reporting workflows.'),
  bullet('Developed Acadlync, an academic management platform supporting Administrator, Teacher, and Student roles using PostgreSQL and REST APIs for enrollment, timetables, and grade tracking.'),
  bullet('Delivered an enterprise Employee Management System covering attendance, leave management, department administration, analytics dashboards, and role-based access control.'),
  bullet('Built and deployed the Islamic Hijri Calendar Flutter application on Google Play and Apple App Store, reaching 30,000+ downloads with Firebase Authentication, FCM, Riverpod, Hive, and multilingual support.'),
  bullet('Built a full-stack E-Commerce Platform with Razorpay, inventory management, Redis caching, authentication, and order management; improved API response times through caching and query optimization.'),
  bullet('Promoted reusable React component architecture across enterprise products, improving maintainability and accelerating feature delivery within Agile/Scrum cycles.'),
];

const skillsSection = [
  ...sectionTitle('Technical Expertise'),
  skillsGrid([
    { label: 'Frontend', value: 'React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, TailwindCSS, Redux Toolkit' },
    { label: 'Backend', value: 'Node.js, Express.js, RESTful APIs, JWT Authentication' },
    { label: 'Databases', value: 'MySQL, PostgreSQL, MongoDB, Firebase Firestore' },
    { label: 'Cloud & DevOps', value: 'Git, GitHub, Docker, CI/CD, AWS, Vercel, Render, Hostinger' },
    { label: 'Tools & Technologies', value: 'Redis, WebSocket, Razorpay, Postman, Google APIs, FCM' },
    { label: 'Testing', value: 'Playwright, Unit Testing, Debugging, API Testing' },
    { label: 'Software Practices', value: 'Agile, Scrum, Component-Based Architecture, Performance Optimization, System Design' },
    { label: 'Also Familiar With', value: 'Flutter/Dart, Java, Python, C# / ASP.NET Core, Spring Boot' },
  ]),
];

const projects = [
  ...sectionTitle('Key Projects'),

  para([run('Atruha Finance', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · Redux Toolkit · TailwindCSS  ', { color: ACCENT, italics: true }), run('atruhafinance.com', { color: ACCENT })]),
  bullet('Architected a production-grade financial analytics platform with real-time stock tracking, portfolio management, interactive dashboards, and secure JWT-based authentication.'),
  bullet('Optimized REST API performance and implemented lazy loading with reusable UI components to improve dashboard speed and scalability.'),

  para([run('StafWise', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · TailwindCSS  ', { color: ACCENT, italics: true }), run('stafwise.com', { color: ACCENT })], 0),
  bullet('Developed an enterprise HR platform supporting onboarding, attendance, payroll, scheduling, reporting, and role-based access control.'),
  bullet('Designed secure RESTful APIs with JWT authentication and streamlined reporting dashboards.'),

  para([run('Acadlync', { bold: true, color: DARK }), run('  React.js · TypeScript · PostgreSQL · REST APIs  ', { color: ACCENT, italics: true }), run('acadlynk.atmez.ai', { color: ACCENT })], 0),
  bullet('Built a scalable academic platform supporting enrollment, timetable scheduling, grade management, and multi-role authentication.'),
  bullet('Implemented REST APIs and analytics dashboards for institutional data management.'),

  para([run('Employee Management System', { bold: true, color: DARK }), run('  React.js · TypeScript · MySQL · REST APIs  ', { color: ACCENT, italics: true }), run('ems.atmez.ai', { color: ACCENT })], 0),
  bullet('Engineered attendance, leave, department administration, analytics dashboards, and secure role-based access.'),
  bullet('Developed reusable React components and optimized backend APIs.'),

  para([run('E-Commerce Platform', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · Razorpay · Redis', { color: ACCENT, italics: true })], 0),
  bullet('Developed product catalog, shopping cart, Razorpay payment integration, inventory, authentication, and order tracking.'),
  bullet('Improved API response times using Redis caching and database query optimization.'),
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

writeResume(children, 'Mohammed_Sohail_Resume_FullStack.docx');
