// Run with: node generate-resume-dotnet-angular.mjs
// Secondary resume — C# / .NET foundations + Angular exposure.
// Honesty note: professional experience is full-stack (React/Node/SQL).
// C# & ASP.NET Core is a completed Microsoft Learn certification, not
// professional/production experience. Angular exposure is from a full-stack
// training program (School Management System project), not professional
// production experience — both are labeled precisely, not overstated.
// Use for: .NET/Angular roles where the employer wants to see certified
// .NET foundations and any Angular exposure, without misrepresenting either
// as years of production experience.
// Output: Mohammed_Sohail_Resume_DotNet_Angular.docx in the project root

import { sectionTitle, para, run, bullet, leftRight, buildHeader, skillsGrid,
         educationSection, languagesSection, writeResume, DARK, ACCENT } from './resume-shared.mjs';

const header = buildHeader('Software Engineer | Full Stack Developer | .NET & Angular Foundations');

const summarySection = [
  ...sectionTitle('Professional Summary'),
  para(run(
    'Software Engineer with 2+ years of professional full-stack experience building enterprise web applications, REST APIs, authentication workflows, and database-driven systems using React.js, Node.js, and SQL. Microsoft Learn certified in C# & ASP.NET Core, with strong transferable backend fundamentals — middleware pipelines, REST API design, JWT authentication, and relational databases — that map directly onto the .NET ecosystem. Also completed full-stack training covering Angular and Django, including building a school administration platform with Angular on the frontend. Looking to grow into a .NET/Angular-focused role.'
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
  ...sectionTitle('.NET & Angular Foundation'),
  bullet('Completed the Microsoft Learn C# & ASP.NET Core Developer Learning Path, covering the ASP.NET Core middleware pipeline, dependency injection, Entity Framework Core, LINQ, and JWT-based authentication with [Authorize] attributes.'),
  bullet('Completed full-stack training covering Angular, Django, React, and MySQL; built and deployed a School Management System using Angular for the frontend and Django REST Framework for the backend, with role-based access for admins and teachers.'),
  bullet('Backend fundamentals transfer directly from professional Node.js/Express experience: REST API design, middleware-based request handling, JWT authentication, and relational database design (MySQL, PostgreSQL).'),
  bullet('Angular fundamentals — components, services, routing, and forms — transfer directly from professional React.js/TypeScript experience with component-based architecture and state management.'),
];

const skillsSection = [
  ...sectionTitle('Technical Expertise'),
  skillsGrid([
    { label: 'C# / .NET (Certified)', value: 'C#, ASP.NET Core, Entity Framework Core, LINQ, RESTful APIs, JWT Authentication' },
    { label: 'Angular (Training Project)', value: 'Angular, Angular CLI, TypeScript, Components, Services, Routing' },
    { label: 'Professional — Frontend', value: 'React.js, TypeScript, Next.js, HTML5, CSS3, TailwindCSS, Redux Toolkit' },
    { label: 'Professional — Backend', value: 'Node.js, Express.js, RESTful APIs, JWT Authentication' },
    { label: 'Databases', value: 'MySQL, PostgreSQL, MongoDB, Firebase Firestore' },
    { label: 'Architecture', value: 'Component-Based Architecture, Performance Optimization, System Design' },
    { label: 'Cloud & DevOps', value: 'Git, GitHub, Docker, CI/CD, AWS, Vercel, Render' },
    { label: 'Also Familiar With', value: 'Flutter/Dart, Java, Python, Spring Boot' },
  ]),
];

const projects = [
  ...sectionTitle('Key Projects'),

  para([run('School Management System', { bold: true, color: DARK }), run('  Angular · Django · MySQL · REST Framework  ', { color: ACCENT, italics: true }), run('(Training Project)', { color: ACCENT })]),
  bullet('Built a school administration platform with student enrollment, attendance tracking, timetable management, and role-based access for admins and teachers.'),
  bullet('Developed the frontend in Angular with dynamic forms and data tables, backed by Django REST Framework APIs.'),

  para([run('Atruha Finance', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · REST APIs  ', { color: ACCENT, italics: true }), run('atruhafinance.com', { color: ACCENT })], 0),
  bullet('Built secure REST API workflows, financial dashboards, stock tracking, portfolio management, and JWT-based authentication.'),
  bullet('Optimized backend APIs and frontend loading with reusable components and lazy loading.'),

  para([run('StafWise', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · JWT  ', { color: ACCENT, italics: true }), run('stafwise.com', { color: ACCENT })], 0),
  bullet('Developed HR workflows for onboarding, attendance, payroll, scheduling, reporting, and role-based access control.'),

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

writeResume(children, 'Mohammed_Sohail_Resume_DotNet_Angular.docx');
