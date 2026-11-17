import React from 'react';
import { Download } from 'lucide-react';

// Database Developer variant of Resume.jsx (same layout and ATS-safe styling).
// Content is re-ordered and re-worded to put database work first. It only
// claims experience already listed in Resume.jsx.

const printStyles = `
  .resume {
    font-family: Arial, Helvetica, sans-serif;
    font-variant-ligatures: none;
    font-feature-settings: "liga" 0, "clig" 0, "calt" 0;
  }

  .resume .resume-heading {
    letter-spacing: 0 !important;
    word-spacing: normal;
  }

  @media print {

    @page {
      size: A4;
      margin: 14mm;
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .avoid-break {
      break-inside: avoid;
      page-break-inside: avoid;
    }
  }
`;

// ── Reusable sub-components (single-column, ATS-friendly) ─────────

const SectionTitle = ({ children }) => (
  <div className="mt-5 mb-2">
    <h2
      className="resume-heading text-[16px] font-bold uppercase"
      style={{ color: '#17558F', letterSpacing: 0 }}
    >
      {children}
    </h2>
    <div className="mt-1 border-b-2" style={{ borderColor: '#17558F', opacity: 0.35 }} />
  </div>
);

const Bullet = ({ children }) => (
  <li className="flex items-start gap-2 text-[13.5px] text-[#374151] leading-relaxed mt-1">
    <span className="mt-[2px] flex-shrink-0 text-[13px]" style={{ color: '#17558F' }}>•</span>
    <span>{children}</span>
  </li>
);

const JobHeader = ({ title, company, dates }) => (
  <div className="mt-3">
    <div className="flex flex-wrap justify-between items-baseline gap-x-4">
      <span className="font-bold text-[15px] text-[#1A1A2E]">{title}</span>
      <span className="text-[11.5px] text-[#6B7280] font-mono">{dates}</span>
    </div>
    <div className="text-[12.5px] mt-0.5" style={{ color: '#17558F' }}>{company}</div>
  </div>
);

const SkillRow = ({ label, value }) => (
  <p className="text-[13px] text-[#374151] leading-relaxed mt-1.5">
    <span className="font-bold text-[13px] text-[#1A1A2E]">{label}:&nbsp;</span>{value}
  </p>
);

const ProjectItem = ({ name, stack, url, href, bullets }) => (
  <div className="mt-2.5 avoid-break">
    <p className="text-[13.5px] leading-snug">
      <span className="font-bold text-[#1A1A2E]">{name}</span>
      {stack && <span className="text-[12px] text-[#6B7280]"> ({stack})</span>}
      {url && href && <> · <a href={href} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#17558F' }}>{url}</a></>}
      {url && !href && <span className="text-[#6B7280]"> · {url}</span>}
    </p>
    {bullets && (
      <ul className="mt-0.5">
        {bullets.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
      </ul>
    )}
  </div>
);

const EduRow = ({ degree, institution, year, pct }) => (
  <div className="mt-2">
    <div className="flex flex-wrap justify-between items-baseline gap-x-4">
      <span className="font-bold text-[13.5px] text-[#1A1A2E]">{degree}</span>
      <span className="text-[11.5px] font-mono text-[#6B7280]">{year} &nbsp;|&nbsp; {pct}</span>
    </div>
    <p className="text-[12px] italic text-[#6B7280]">{institution}</p>
  </div>
);

// ── Main component ───────────────────────────────────────────────

const Resume_One = () => (
  <div className="resume bg-slate-100 p-4 md:p-10 print:p-0 print:bg-white">
    <style>{printStyles}</style>

    <div
      className="max-w-[860px] mx-auto bg-white shadow-lg print:shadow-none"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      <div className="px-10 py-8">

        {/* ── HEADER ── */}
        <header className="text-center mb-1">
          <h1 className="text-[27px] font-bold tracking-tight" style={{ color: '#1A1A2E' }}>
            MOHAMMED SOHAIL
          </h1>
          <p className="text-[14.5px] mt-1 font-semibold" style={{ color: '#17558F' }}>
            Database Developer | SQL, MySQL, PostgreSQL, Query Optimization
          </p>
          <p className="text-[13px] text-[#6B7280] mt-1.5">
            Hyderabad, Telangana, India &nbsp;|&nbsp; +91 9347587937 &nbsp;|&nbsp; sohailmohammedsohail268@gmail.com
          </p>
          <p className="text-[12px] mt-1" style={{ color: '#17558F' }}>
            <a href="https://www.linkedin.com/in/mohammed-sohail-34b248286/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">linkedin.com/in/mohammed-sohail-34b248286</a>
            &nbsp;|&nbsp;
            <a href="https://github.com/Mohammed-Sohail123" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">github.com/Mohammed-Sohail123</a>
            &nbsp;|&nbsp;
            <a href="https://sohail-portfolio-five.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">sohail-portfolio-five.vercel.app</a>
          </p>
          <p className="text-[12px] mt-1 font-semibold" style={{ color: '#1A1A2E' }}>
            Open to relocation to Qatar &nbsp;·&nbsp; Valid passport
          </p>
        </header>

        {/* ── SUMMARY ── */}
        <SectionTitle>Summary</SectionTitle>
        <p className="text-[13.5px] text-[#374151] leading-relaxed">
          Software engineer with <strong> 2+ years of hands-on experience</strong> designing and working with{' '}
          <strong>relational databases (MySQL, PostgreSQL)</strong> behind live production applications in{' '}
          <strong>fintech, HR, education, and e-commerce</strong>. Built the data layer for{' '}
          <strong>Atruha Finance</strong>, a live analytics platform covering <strong>350+ Saudi Exchange (Tadawul) stocks</strong>{' '}
          with <strong>1,100+ registered users</strong> and paying subscribers. Experienced in{' '}
          <strong>relational schema design and data modeling, SQL query development and optimization, Redis caching</strong>,
          and secure data access through REST APIs with JWT authentication and role-based access control. Microsoft-certified
          in C# and ASP.NET Core. Works in Agile teams with Git-based CI/CD workflows.
        </p>

        {/* ── TECHNICAL SKILLS ── */}
        <SectionTitle>Technical Skills</SectionTitle>
        <SkillRow label="Databases" value="MySQL, PostgreSQL, Amazon RDS, MongoDB, Redis, Firebase Firestore." />
        <SkillRow label="Database Development" value="SQL, relational schema design and data modeling, normalization, joins and aggregations, query optimization, caching strategies, reporting queries for dashboards." />
        <SkillRow label="Data Access & Backend" value="Node.js, Express.js, Django ORM, ASP.NET Core, REST APIs, JWT Authentication, Role-Based Access Control (RBAC)." />
        <SkillRow label="Languages" value="SQL, JavaScript (ES6+), TypeScript, Python, C#, Java." />
        <SkillRow label="Data & Analytics (foundational)" value="Python, Pandas, NumPy, Time Series Analysis." />
        <SkillRow label="DevOps & Cloud" value="Git, GitHub, GitHub Actions, Docker, CI/CD, AWS (EC2, S3, RDS)." />
        <SkillRow label="Tools" value="Postman, MinIO." />
        <SkillRow label="Practices" value="Agile, Scrum, OOP, Data Structures, Performance Optimization, System Design." />

        {/* ── PROFESSIONAL EXPERIENCE ── */}
        <SectionTitle>Professional Experience</SectionTitle>

        <JobHeader
          title="Software Engineer — Full Stack / Database"
          company="Atmez AI Solutions · Hyderabad, India"
          dates="January 2025 – Present"
        />
        <ul className="mt-1">
          <Bullet>
            Designed and maintained the <strong>MySQL</strong> data layer for <strong>Atruha Finance</strong>, a live financial analytics platform covering <strong>350+ Tadawul stocks</strong> (TASI and Nomu) for 1,100+ registered users with monthly, quarterly, and annual subscription plans.
          </Bullet>
          <Bullet>
            Wrote and optimized SQL queries behind real-time stock tracking, portfolio management, and analytics dashboards; improved dashboard load times through query and API optimization.
          </Bullet>
          <Bullet>
            Modeled relational schemas in <strong>MySQL</strong> for <strong>StafWise</strong>, an enterprise HR SaaS covering onboarding, attendance, payroll, and reporting, with role-based data access across multiple organizational roles.
          </Bullet>
          <Bullet>
            Built the <strong>PostgreSQL</strong> database for <strong>Acadlynk</strong>, an academic management platform, covering enrollment, timetables, and grade tracking for administrators, teachers, and students.
          </Bullet>
          <Bullet>
            Built the <strong>MySQL</strong> backend for an <strong>E-Commerce Platform</strong> with inventory, order, and payment data; used <strong>Redis caching</strong> and query optimization to reduce API response times.
          </Bullet>
          <Bullet>
            Ran production MySQL databases on <strong>Amazon RDS</strong> (managed database service), with Node.js application servers on <strong>AWS EC2</strong> and file storage in <strong>Amazon S3</strong>.
          </Bullet>
          <Bullet>
            Delivered an Employee Management System (MySQL) for attendance, leave, and department data with analytics dashboards and role-based access.
          </Bullet>
        </ul>



        <JobHeader
          title="Python Full Stack Developer — Trainee"
          company="Quality Thoughts (IHUB) · Hyderabad, India"
          dates="July 2024 – December 2024"
        />
        <ul className="mt-1">
          <Bullet>
            Applied relational database modeling with <strong>Django and MySQL</strong>, including table design, relationships, and SQL queries, across hands-on projects.
          </Bullet>
          <Bullet>
            Built and deployed web applications with Python, Django, and REST APIs; strengthened fundamentals in data structures, OOP, Git, and debugging.
          </Bullet>
        </ul>

        {/* ── PROJECTS ── */}
        <SectionTitle>Database Projects</SectionTitle>

        <ProjectItem
          name="Atruha Finance"
          stack="MySQL, Node.js, React.js"
          url="atruhafinance.com"
          href="https://atruhafinance.com"
          bullets={[
            'Relational data model for 350+ listed companies, user portfolios, and subscription plans, serving 1,100+ registered users with paying premium subscribers.',
            'Wrote SQL queries for real-time stock tracking and portfolio dashboards, and secured user and subscription data with JWT-based authentication.',
          ]}
        />
        <ProjectItem
          name="StafWise"
          stack="MySQL, Node.js, React.js"
          url="stafwise.com"
          href="https://stafwise.com"
          bullets={[
            'HR database covering employees, attendance, payroll, and scheduling, with role-based access and reporting queries.',
            'Exposed HR data through secure REST APIs and built the reporting queries behind its dashboards, with access controlled per organizational role.',
          ]}
        />
        <ProjectItem
          name="Acadlynk"
          stack="PostgreSQL, TypeScript, React.js"
          url="acadlynk.com"
          href="https://acadlynk.com/"
          bullets={[
            'PostgreSQL schema for students, courses, timetables, and grades, with multi-role access and analytics dashboards.',
            'Built REST APIs over the PostgreSQL database for enrollment, timetable scheduling, and grade tracking for administrators, teachers, and students.',
          ]}
        />
        <ProjectItem
          name="E-Commerce Platform"
          stack="MySQL, Redis, Node.js"
          bullets={[
            'Product, inventory, and order schema with Redis caching and query optimization for faster API responses.',
            'Stored Razorpay payment, order tracking, and user authentication data in MySQL, keeping inventory and order records consistent through checkout.',
          ]}
        />

        {/* ── EDUCATION ── */}
        <SectionTitle>Education</SectionTitle>
        <EduRow
          degree="Bachelor of Engineering (B.E.), Computer Science & Engineering"
          institution="Holy Mary Institute of Technology & Science (JNTUH), Hyderabad"
          year="2024"
          pct="68.00%"
        />
        <EduRow
          degree="Diploma in Mechanical Engineering"
          institution="Government Polytechnic, Kotagiri (SBTET)"
          year="2021"
          pct="78.69%"
        />

        {/* ── CERTIFICATIONS ── */}
        <SectionTitle>Certifications</SectionTitle>
        <ul className="mt-1">
          <Bullet>C# &amp; ASP.NET Core Developer — Microsoft Certification</Bullet>
          <Bullet>Python Full Stack Developer — IHUB (Quality Thoughts)</Bullet>
          <Bullet>Data Science &amp; Artificial Intelligence — DataLabs</Bullet>
        </ul>

        {/* ── LANGUAGES ── */}
        <SectionTitle>Languages</SectionTitle>
        <p className="text-[13.5px] text-[#374151] mt-1">
          English (Professional), Urdu &amp; Telugu (Native), Arabic (Reading)
        </p>

      </div>
    </div>

    {/* Export button — hidden on print */}
    <div className="fixed bottom-24 right-8 print:hidden">
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 bg-[#1A1A2E] text-white px-5 py-3 rounded-full shadow-xl hover:bg-slate-700 transition-all text-sm font-bold"
      >
        <Download size={16} /> Export PDF
      </button>
    </div>
  </div>
);

export default Resume_One;
