// Run with: node generate-resume-fullstack.mjs
// Primary resume — Full Stack / MERN positioning (single-column, ATS-friendly).
// Use for: Full Stack Developer, MERN Stack Developer, React Developer,
// Node.js Developer, Next.js Developer, Software Engineer roles.
// Output: Mohammed_Sohail_Resume_FullStack.docx in the project root

import { sectionTitle, para, run, bullet, leftRight, buildHeader, skillsList,
         educationSection, languagesSection, traineeshipExperience, writeResume, DARK, ACCENT } from './resume-shared.mjs';

const header = buildHeader('Full Stack Software Engineer | React.js, Node.js, Flutter');

const summarySection = [
  ...sectionTitle('Summary'),
  para(run(
    'Full Stack Software Engineer with nearly 2 years of experience building and deploying production web and mobile applications using React.js, Node.js, TypeScript, MySQL, PostgreSQL, and Flutter. Part of the team behind Atruha Finance, a live financial analytics platform covering 400+ Saudi Exchange (Tadawul) stocks, including TASI and Nomu, with paying premium subscribers. Experienced in REST API design, JWT authentication, role-based access control, Redis caching, and Razorpay payment integration. Published a Flutter app with 30,000+ downloads on Google Play and the App Store. Works in Agile teams with CI/CD workflows.'
  ), 6),
];

const skillsSection = [
  ...sectionTitle('Technical Skills'),
  ...skillsList([
    { label: 'Languages', value: 'JavaScript (ES6+), TypeScript, Java, Python, C#, Dart, SQL' },
    { label: 'Frontend', value: 'React.js, Next.js, Redux Toolkit, HTML5, CSS3, Tailwind CSS, Bootstrap, Framer Motion, Three.js' },
    { label: 'Backend', value: 'Node.js, Express.js, REST APIs, JWT Authentication, Role-Based Access Control (RBAC), WebSocket, Spring Boot, ASP.NET Core' },
    { label: 'Databases', value: 'MySQL, PostgreSQL, MongoDB, Firebase Firestore, Redis' },
    { label: 'Mobile', value: 'Flutter, Dart, Firebase, FCM Push Notifications, Riverpod, Hive' },
    { label: 'DevOps & Cloud', value: 'Git, GitHub, GitHub Actions, Docker, CI/CD, AWS, Vercel, Render, Hostinger' },
    { label: 'Tools & Integrations', value: 'Razorpay, MinIO, SMTP, Google APIs, Postman' },
    { label: 'Testing', value: 'Playwright, Unit Testing, API Testing, Debugging' },
    { label: 'Practices', value: 'Agile, Scrum, Responsive Design, Component Architecture, Performance Optimization, System Design' },
    { label: 'Machine Learning (foundational)', value: 'TensorFlow, Scikit-learn, Pandas, NumPy, NLP, Time Series Analysis' },
  ]),
];

const experience = [
  ...sectionTitle('Professional Experience'),

  leftRight('Software Engineer — Full Stack Developer', 'January 2025 – Present'),
  para(run('Atmez AI Solutions · Hyderabad, India', { color: ACCENT, size: 21 }), 4),
  bullet('Built Atruha Finance, a live financial analytics platform covering 400+ Tadawul stocks (TASI and Nomu) with paying premium subscribers, using React.js, Redux Toolkit, Node.js, MySQL, and REST APIs.'),
  bullet('Delivered real-time stock tracking, portfolio management, and interactive dashboards; improved dashboard load times through API optimization, lazy loading, and reusable components.'),
  bullet('Contributed to StafWise, an enterprise HR management SaaS (React.js, Node.js, MySQL, JWT), automating onboarding, attendance, payroll, and reporting with role-based access across multiple organizational roles.'),
  bullet('Developed Acadlync, an academic management platform (React.js, TypeScript, PostgreSQL) for administrators, teachers, and students, with REST APIs for enrollment, timetables, and grade tracking.'),
  bullet('Led development and release of the Islamic Hijri Calendar Flutter app on Google Play and the App Store, reaching 30,000+ downloads; integrated Firebase Authentication, FCM push notifications, Riverpod state management, Hive offline storage, and multilingual support.'),
  bullet('Built a full-stack E-Commerce Platform (React.js, Node.js, MySQL) with Razorpay payments, inventory and order management, and authentication; used Redis caching and query optimization to reduce API response times.'),

  ...traineeshipExperience,
];

const projects = [
  ...sectionTitle('Projects'),

  para([run('Atruha Finance', { bold: true, color: DARK }), run('  (React.js, Node.js, MySQL, Redux Toolkit, Tailwind CSS)  ', { color: ACCENT, italics: true }), run('atruhafinance.com', { color: ACCENT })]),
  bullet('Live Tadawul analytics platform with real-time stock tracking, portfolio management, interactive dashboards, and JWT-based authentication.'),

  para([run('StafWise', { bold: true, color: DARK }), run('  (React.js, Node.js, MySQL, Tailwind CSS)  ', { color: ACCENT, italics: true }), run('stafwise.com', { color: ACCENT })], 0),
  bullet('HR management platform covering onboarding, attendance, payroll, scheduling, and role-based access, with secure REST APIs and reporting dashboards.'),

  para([run('Acadlync', { bold: true, color: DARK }), run('  (React.js, TypeScript, PostgreSQL)  ', { color: ACCENT, italics: true }), run('acadlynk.atmez.ai', { color: ACCENT })], 0),
  bullet('Academic management platform with student enrollment, timetable scheduling, grade management, multi-role authentication, and analytics dashboards.'),

  para([run('Employee Management System', { bold: true, color: DARK }), run('  (React.js, TypeScript, MySQL, REST APIs)  ', { color: ACCENT, italics: true }), run('ems.atmez.ai', { color: ACCENT })], 0),
  bullet('Enterprise system for attendance, leave management, department administration, and analytics dashboards with role-based access; built reusable React components and optimized backend APIs.'),

  para([run('E-Commerce Platform', { bold: true, color: DARK }), run('  (React.js, Node.js, MySQL, Razorpay, Redis)', { color: ACCENT, italics: true })], 0),
  bullet('Product catalog, shopping cart, Razorpay checkout, inventory management, and order tracking; Redis caching and query optimization improved API response times.'),

  para([run('Islamic Hijri Calendar', { bold: true, color: DARK }), run('  (Flutter, Dart, Firebase, Riverpod, Hive, FCM)  ', { color: ACCENT, italics: true }), run('Google Play & Apple App Store', { color: ACCENT })], 0),
  bullet('Cross-platform Islamic calendar app with 30,000+ downloads, offline-first storage, push notifications, and multilingual support.'),

  para([run('Developer Portfolio', { bold: true, color: DARK }), run('  (React.js, Vite, Tailwind CSS, Framer Motion)  ', { color: ACCENT, italics: true }), run('sohail-portfolio-five.vercel.app', { color: ACCENT })], 0),
  bullet('Animated, responsive portfolio with SEO optimization and automated deployment using GitHub Actions and Vercel CI/CD.'),
];

const awards = [
  ...sectionTitle('Certifications'),
  bullet('C# & ASP.NET Core Developer — Microsoft Certification'),
  bullet('Python Full Stack Developer — IHUB (Quality Thoughts)'),
  bullet('Data Science & Artificial Intelligence — DataLabs'),
  bullet('Training ISP First Trainings Contest — Internshala'),
];

const children = [
  ...header,
  ...summarySection,
  ...skillsSection,
  ...experience,
  ...projects,
  ...educationSection,
  ...awards,
  ...languagesSection,
];

writeResume(children, 'Mohammed_Sohail_Resume_FullStack.docx');
