// Run with: node generate-resume-dotnet.mjs
// Secondary resume — C# / .NET foundations positioning.
// Honesty note: professional experience is full-stack (React/Node/SQL).
// C# & ASP.NET Core is a completed Microsoft Learn certification, not
// professional/production experience — framed as a certification plus
// transferable backend fundamentals, not overstated as job experience.
// Use for: entry-level/junior .NET roles where employers expect a
// certified foundation rather than years of production .NET experience.
// Output: Mohammed_Sohail_Resume_DotNet.docx in the project root

import { sectionTitle, para, run, bullet, leftRight, buildHeader, skillsGrid,
         educationSection, languagesSection, writeResume, DARK, ACCENT } from './resume-shared.mjs';

const header = buildHeader('Software Engineer | Full Stack Developer | C# & ASP.NET Core (Certified)');

const summarySection = [
  ...sectionTitle('Professional Summary'),
  para(run(
    'Software Engineer with 2+ years of professional full-stack experience building enterprise web applications, REST APIs, authentication workflows, and database-driven systems using React.js, Node.js, and SQL. Microsoft Learn certified in C# & ASP.NET Core, with strong transferable backend fundamentals — middleware pipelines, REST API design, JWT authentication, and relational databases — that map directly onto the .NET ecosystem. Looking to grow into a .NET-focused backend role.'
  ), 6),
];

const experience = [
  ...sectionTitle('Professional Experience'),

  leftRight('Software Engineer — Full Stack Developer', 'July 2024 – Present'),
  para(run('Atmez AI Solutions · Hyderabad, India', { color: ACCENT, size: 21 }), 4),
  bullet('Built enterprise full-stack applications with secure REST APIs, JWT authentication, role-based access control, SQL databases, and React.js frontends.'),
  bullet('Built Atruha Finance with React.js, Node.js, Redux Toolkit, MySQL, and REST APIs, including financial dashboards, stock tracking, portfolio management, and performance optimization.'),
  bullet('Contributed to StafWise and the Employee Management System, covering attendance, payroll, leave, reporting, analytics dashboards, and role-based access control.'),
  bullet('Developed Acadlync with multi-role authentication and REST APIs for enrollment, timetables, and grade management.'),
  bullet('Built an E-Commerce Platform with Razorpay, Redis caching, authentication, and order management.'),
];

const certificationHighlight = [
  ...sectionTitle('C# & .NET Foundation'),
  bullet('Completed the Microsoft Learn C# & ASP.NET Core Developer Learning Path, covering the ASP.NET Core middleware pipeline, dependency injection, Entity Framework Core, LINQ, and JWT-based authentication with [Authorize] attributes.'),
  bullet('Backend fundamentals transfer directly from professional Node.js/Express experience: REST API design, middleware-based request handling, JWT authentication, and relational database design (MySQL, PostgreSQL).'),
];

const skillsSection = [
  ...sectionTitle('Technical Expertise'),
  skillsGrid([
    { label: 'C# / .NET (Certified)', value: 'C#, ASP.NET Core, Entity Framework Core, LINQ, RESTful APIs, JWT Authentication' },
    { label: 'Professional — Frontend', value: 'React.js, TypeScript, Next.js, HTML5, CSS3, TailwindCSS, Redux Toolkit' },
    { label: 'Professional — Backend', value: 'Node.js, Express.js, RESTful APIs, JWT Authentication' },
    { label: 'Databases', value: 'MySQL, PostgreSQL, MongoDB, Firebase Firestore' },
    { label: 'Architecture', value: 'Component-Based Architecture, Performance Optimization, System Design' },
    { label: 'Cloud & DevOps', value: 'Git, GitHub, Docker, CI/CD, AWS, Vercel, Render' },
    { label: 'Testing', value: 'Playwright, Unit Testing, Debugging, API Testing' },
    { label: 'Also Familiar With', value: 'Flutter/Dart, Java, Python, Spring Boot' },
  ]),
];

const projects = [
  ...sectionTitle('Key Projects'),

  para([run('Atruha Finance', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · REST APIs  ', { color: ACCENT, italics: true }), run('atruhafinance.com', { color: ACCENT })]),
  bullet('Built secure REST API workflows, financial dashboards, stock tracking, portfolio management, and JWT-based authentication.'),
  bullet('Optimized backend APIs and frontend loading with reusable components and lazy loading.'),

  para([run('StafWise', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · JWT  ', { color: ACCENT, italics: true }), run('stafwise.com', { color: ACCENT })], 0),
  bullet('Developed HR workflows for onboarding, attendance, payroll, scheduling, reporting, and role-based access control.'),
  bullet('Implemented secure RESTful APIs and reporting dashboards.'),

  para([run('Employee Management System', { bold: true, color: DARK }), run('  React.js · TypeScript · MySQL · REST APIs  ', { color: ACCENT, italics: true }), run('ems.atmez.ai', { color: ACCENT })], 0),
  bullet('Engineered attendance, leave, department administration, analytics dashboards, and secure role-based access.'),

  para([run('E-Commerce Platform', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · Razorpay · Redis', { color: ACCENT, italics: true })], 0),
  bullet('Developed authentication, product catalog, payments, inventory, order tracking, and caching workflows.'),
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
  ...certificationHighlight,
  ...skillsSection,
  ...projects,
  ...educationSection,
  ...awards,
  ...languagesSection,
];

writeResume(children, 'Mohammed_Sohail_Resume_DotNet.docx');
