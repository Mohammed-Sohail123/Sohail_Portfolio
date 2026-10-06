// Run with: node generate-resume.mjs
// Original general-purpose resume — broad positioning across the full stack.
// Output: Mohammed_Sohail_Resume.docx in the project root

import { sectionTitle, para, run, bullet, leftRight, buildHeader, skillsGrid,
         educationSection, languagesSection, writeResume, DARK, ACCENT } from './resume-shared.mjs';

const header = buildHeader('Software Engineer | Full Stack Developer');

const summarySection = [
  ...sectionTitle('Professional Summary'),
  para(run(
    'Results-driven Software Engineer with 2+ years of hands-on experience designing, developing, and deploying full-stack web and mobile applications. Experienced in React.js, Next.js, TypeScript, Node.js, Spring Boot, Flutter, MySQL, PostgreSQL, MongoDB, Firebase, REST APIs, and JWT Authentication. Delivered production solutions across finance, HR, education, e-commerce, and AI domains, including a published Flutter application with 30,000+ downloads. Also skilled in C# and ASP.NET Core.'
  ), 6),
];

const experience = [
  ...sectionTitle('Professional Experience'),

  leftRight('Software Engineer — Full Stack Developer', 'July 2024 – Present'),
  para(run('Atmez AI Solutions · Hyderabad, India', { color: ACCENT, size: 21 }), 4),
  bullet('Built Atruha Finance (atruhafinance.com) — a financial analytics platform with real-time stock tracking, portfolio management, and interactive dashboards using React.js, Node.js, Redux Toolkit, and MySQL.'),
  bullet('Contributed to StafWise (stafwise.com) — an enterprise HR management SaaS automating attendance, payroll, and reporting workflows using React.js, Node.js, MySQL, and JWT Authentication.'),
  bullet('Developed Acadlync (acadlynk.atmez.ai) — an academic management platform supporting Administrator, Teacher, and Student roles using React.js, TypeScript, PostgreSQL, and REST APIs.'),
  bullet('Delivered an Employee Management System (ems.atmez.ai) with attendance, leave management, department administration, and analytics dashboards using React.js, TypeScript, and MySQL.'),
  bullet('Led development and deployment of the Islamic Hijri Calendar Flutter application, published on Google Play and the Apple App Store, reaching 30,000+ downloads with Firebase Authentication, FCM push notifications, Riverpod, and Hive offline storage.'),
  bullet('Built a full-stack E-Commerce Platform integrating Razorpay payment gateway, inventory management, Redis caching, authentication, and order management.'),
  bullet('Promoted reusable React component architecture across multiple enterprise products, improving maintainability and accelerating feature delivery within Agile/Scrum development cycles.'),
];

const skillsSection = [
  ...sectionTitle('Technical Expertise'),
  skillsGrid([
    { label: 'Languages', value: 'JavaScript (ES6+), TypeScript, Java, Python, C#' },
    { label: 'Frontend', value: 'React.js, Next.js, HTML5/CSS3, TailwindCSS, Bootstrap, Redux Toolkit, Framer Motion' },
    { label: 'Backend', value: 'Node.js, Express.js, Spring Boot, ASP.NET Core, RESTful APIs, JWT Authentication' },
    { label: 'Databases', value: 'MySQL, PostgreSQL, MongoDB, Firebase Firestore' },
    { label: 'Mobile', value: 'Flutter, Dart, Firebase, Riverpod, Hive' },
    { label: 'Cloud & DevOps', value: 'Git, GitHub, Docker, CI/CD, AWS, Vercel, Render, Hostinger' },
    { label: 'Tools', value: 'Redis, WebSocket, Razorpay, Google APIs, Firebase Cloud Messaging (FCM)' },
    { label: 'Testing', value: 'Playwright, Unit Testing, Debugging, API Testing' },
  ]),
];

const projects = [
  ...sectionTitle('Key Projects'),

  para([run('Atruha Finance', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · Redux Toolkit · TailwindCSS  ', { color: ACCENT, italics: true }), run('atruhafinance.com', { color: ACCENT })]),
  bullet('Financial analytics platform with real-time stock tracking, portfolio management, interactive dashboards, and secure JWT-based authentication.'),
  bullet('Optimized REST APIs and implemented lazy loading and reusable UI components to improve dashboard performance.'),

  para([run('StafWise', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · TailwindCSS  ', { color: ACCENT, italics: true }), run('stafwise.com', { color: ACCENT })], 0),
  bullet('Enterprise HR management platform supporting employee onboarding, attendance, payroll processing, scheduling, and role-based access control with secure REST APIs and reporting dashboards.'),

  para([run('Acadlync', { bold: true, color: DARK }), run('  React.js · TypeScript · PostgreSQL · REST APIs  ', { color: ACCENT, italics: true }), run('acadlynk.atmez.ai', { color: ACCENT })], 0),
  bullet('Academic management platform supporting student enrollment, timetable scheduling, grade management, and multi-role authentication for administrators, teachers, and students.'),

  para([run('Employee Management System', { bold: true, color: DARK }), run('  React.js · TypeScript · MySQL · REST APIs  ', { color: ACCENT, italics: true }), run('ems.atmez.ai', { color: ACCENT })], 0),
  bullet('Enterprise employee management system featuring attendance, leave management, department administration, analytics dashboards, and secure role-based access.'),

  para([run('E-Commerce Platform', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · Razorpay · Redis', { color: ACCENT, italics: true })], 0),
  bullet('Scalable e-commerce platform with product catalog, shopping cart, Razorpay payment integration, inventory management, authentication, and order tracking.'),
  bullet('Used Redis caching and query optimization to improve API response times.'),

  para([run('Islamic Hijri Calendar', { bold: true, color: DARK }), run('  Flutter · Dart · Firebase · Riverpod · Hive · FCM  ', { color: ACCENT, italics: true }), run('Google Play & App Store', { color: ACCENT })], 0),
  bullet('Cross-platform Islamic calendar application published on Google Play and Apple App Store, reaching 30,000+ downloads with multilingual support, Firebase Authentication, FCM push notifications, Riverpod state management, and Hive offline storage.'),

  para([run('Spammer Detection & Fake User Identification', { bold: true, color: DARK }), run('  Java · Graph Algorithms · Social Network Analysis', { color: ACCENT, italics: true })], 0),
  bullet('Graph-based social network analysis system to identify spam accounts and fake users by analyzing behavior, follower relationships, and engagement metrics, achieving 87% detection accuracy on simulated datasets.'),

  para([run('Eye Controlled Mouse', { bold: true, color: DARK }), run('  Python · OpenCV · Dlib · PyAutoGUI', { color: ACCENT, italics: true })], 0),
  bullet('Computer vision-based HCI system enabling hands-free cursor movement using real-time eye tracking and facial landmark detection.'),
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

writeResume(children, 'Mohammed_Sohail_Resume.docx');
