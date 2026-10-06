// Run with: node generate-resume-python.mjs
// Secondary resume — Python / Data foundations positioning.
// Honesty note: professional experience is full-stack (React/Node/SQL).
// Python, OpenCV, graph algorithms, and ML tooling are academic/self-study —
// they are labeled as such, not presented as production/professional work.
// Use for: entry-level Python roles where employers expect a learning
// foundation rather than years of production Python experience.
// Output: Mohammed_Sohail_Resume_Python.docx in the project root

import { sectionTitle, para, run, bullet, leftRight, buildHeader, skillsGrid,
         educationSection, languagesSection, writeResume, DARK, ACCENT } from './resume-shared.mjs';

const header = buildHeader('Software Engineer | Full Stack Developer | Python & Data Foundations');

const summarySection = [
  ...sectionTitle('Professional Summary'),
  para(run(
    'Software Engineer with 2+ years of professional full-stack development experience (React.js, Node.js, REST APIs, SQL databases), plus self-driven Python and data/AI foundations built through academic projects and certifications — including a computer-vision HCI system (OpenCV, Dlib) and coursework in Data Science & Artificial Intelligence. Comfortable picking up new backend ecosystems quickly and interested in growing into Python-based backend or data-oriented roles.'
  ), 6),
];

const experience = [
  ...sectionTitle('Professional Experience'),

  leftRight('Software Engineer — Full Stack Developer', 'July 2024 – Present'),
  para(run('Atmez AI Solutions · Hyderabad, India', { color: ACCENT, size: 21 }), 4),
  bullet('Built full-stack enterprise applications using React.js, Node.js, REST APIs, MySQL/PostgreSQL, and JWT authentication across finance, HR, education, and e-commerce products.'),
  bullet('Built Atruha Finance, a financial analytics platform with real-time stock tracking, portfolio management, and interactive dashboards using React.js, Node.js, and MySQL.'),
  bullet('Contributed to StafWise, an enterprise HR management SaaS automating attendance, payroll, and reporting workflows.'),
  bullet('Led development and deployment of the Islamic Hijri Calendar Flutter application, reaching 30,000+ downloads on Google Play and the Apple App Store.'),
  bullet('Built an E-Commerce Platform with Razorpay payments, inventory management, Redis caching, and database query optimization.'),
];

const academicSection = [
  ...sectionTitle('Python & Data — Academic / Independent Projects'),
  para(run('The projects below were built outside of professional work, applying Python, computer vision, and data/algorithm concepts independently.', { italics: true, color: '6B7280' }), 4),

  para([run('Human Interaction with – Eye Controlled Mouse', { bold: true, color: DARK }), run('  Python · OpenCV · Dlib · PyAutoGUI · Computer Vision', { color: ACCENT, italics: true })]),
  bullet('Developed a computer-vision HCI system enabling hands-free cursor movement using real-time eye tracking and facial landmark detection.'),
  bullet('Integrated OpenCV, Dlib, and PyAutoGUI to recognize eye movements, blinking, and head gestures.'),

  para([run('Spammer Detection & Fake User Identification', { bold: true, color: DARK }), run('  Java · Graph Algorithms · Social Network Analysis', { color: ACCENT, italics: true })], 0),
  bullet('Designed a graph-based system to identify spam accounts and fake users using follower relationships, engagement metrics, and posting patterns.'),
  bullet('Implemented graph algorithms and heuristic detection techniques, achieving 87% detection accuracy across simulated social-network datasets.'),
];

const skillsSection = [
  ...sectionTitle('Technical Expertise'),
  skillsGrid([
    { label: 'Python & Data (Self-Study)', value: 'Python, Pandas, NumPy, Scikit-learn, TensorFlow, NLP, LSTM, Time Series Analysis' },
    { label: 'Computer Vision (Academic)', value: 'OpenCV, Dlib, PyAutoGUI' },
    { label: 'Professional — Frontend', value: 'React.js, Next.js, HTML5, CSS3, TailwindCSS, Redux Toolkit' },
    { label: 'Professional — Backend', value: 'Node.js, Express.js, RESTful APIs, JWT Authentication' },
    { label: 'Databases', value: 'MySQL, PostgreSQL, MongoDB, Firebase Firestore' },
    { label: 'DevOps', value: 'Git, GitHub, Docker, CI/CD, AWS, Vercel, Render' },
    { label: 'Testing', value: 'Playwright, Unit Testing, Debugging, API Testing' },
    { label: 'Also Familiar With', value: 'Flutter/Dart, Java, C# / ASP.NET Core, Spring Boot' },
  ]),
];

const projects = [
  ...sectionTitle('Other Key Projects'),

  para([run('Atruha Finance', { bold: true, color: DARK }), run('  React.js · Node.js · MySQL · REST APIs  ', { color: ACCENT, italics: true }), run('atruhafinance.com', { color: ACCENT })]),
  bullet('Built financial dashboards, stock tracking, portfolio management, JWT authentication, and optimized REST API workflows.'),

  para([run('Islamic Hijri Calendar', { bold: true, color: DARK }), run('  Flutter · Dart · Firebase · Riverpod · Hive · FCM  ', { color: ACCENT, italics: true }), run('Google Play · Apple App Store', { color: ACCENT })], 0),
  bullet('Published the cross-platform application on Google Play and Apple App Store, reaching 30,000+ downloads.'),
  bullet('Integrated Firebase Authentication, FCM, Riverpod, Hive offline storage, and multilingual support.'),
];

const awards = [
  ...sectionTitle('Certifications'),
  bullet('Data Science & Artificial Intelligence — DataLabs'),
  bullet('Python Full Stack Developer — IHUB (Quality Thoughts)'),
  bullet('C# & ASP.NET Core Developer — Microsoft Learn Certification'),
  bullet('Training ISP First Trainings Contest — Internshala'),
];

const children = [
  ...header,
  ...summarySection,
  ...experience,
  ...academicSection,
  ...skillsSection,
  ...projects,
  ...educationSection,
  ...awards,
  ...languagesSection,
];

writeResume(children, 'Mohammed_Sohail_Resume_Python.docx');
