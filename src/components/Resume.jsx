import React from 'react';
import { Download } from 'lucide-react';

// ── Print page styles ────────────────────────────────────────────
const printStyles = `
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
      className="text-[16px] font-bold uppercase tracking-[0.16em]"
      style={{ color: '#17558F' }}
    >
      {children}
    </h2>
    <div className="mt-1 border-b-2" style={{ borderColor: '#17558F', opacity: 0.35 }} />
  </div>
);

const Bullet = ({ children }) => (
  <li className="flex items-start gap-2 text-[13.5px] text-[#374151] leading-relaxed mt-1">
    <span className="mt-[3px] flex-shrink-0 text-[11px]" style={{ color: '#17558F' }}>▸</span>
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

// Single-column skill row: bold label, value on the same line.
const SkillRow = ({ label, value }) => (
  <p className="text-[13px] text-[#374151] leading-relaxed mt-1.5">
    <span className="font-bold text-[13px] text-[#1A1A2E]">{label}:&nbsp;</span>{value}
  </p>
);

// Single-column project item.
const ProjectItem = ({ name, stack, url, href, googlePlay, appStore, bullets }) => (
  <div className="mt-2.5 avoid-break">
    <p className="text-[13.5px] leading-snug">
      <span className="font-bold text-[#1A1A2E]">{name}</span>
      {stack && <span className="text-[12px] text-[#6B7280]"> ({stack})</span>}
      {url && href && <> · <a href={href} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#17558F' }}>{url}</a></>}
      {url && !href && <span className="text-[#6B7280]"> · {url}</span>}
      {googlePlay && <> · <a href={googlePlay} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#17558F' }}>Google Play</a></>}
      {appStore && <> · <a href={appStore} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#17558F' }}>Apple App Store</a></>}
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

const Resume = () => (
  <div className="bg-slate-100 p-4 md:p-10 print:p-0 print:bg-white font-[Calibri,sans-serif]">
    <style>{printStyles}</style>

    <div
      className="max-w-[860px] mx-auto bg-white shadow-lg print:shadow-none"
      style={{ fontFamily: 'Calibri, Carlito, Arial, sans-serif' }}
    >
      <div className="px-10 py-8">

        {/* ── HEADER ── */}
        <header className="text-center mb-1">
          <h1 className="text-[27px] font-bold tracking-tight" style={{ color: '#1A1A2E' }}>
            MOHAMMED SOHAIL
          </h1>
          <p className="text-[14.5px] mt-1 font-semibold" style={{ color: '#17558F' }}>
            Full Stack Software Engineer | React.js, Node.js, Flutter
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
            Open to relocation &nbsp;·&nbsp; Valid passport
          </p>
        </header>

        {/* ── SUMMARY ── */}
        <SectionTitle>Summary</SectionTitle>
        <p className="text-[13.5px] text-[#374151] leading-relaxed">
          <strong>Full Stack Software Engineer</strong> with nearly <strong>2 years of experience</strong> building and
          deploying production web and mobile applications using <strong>React.js, Node.js, TypeScript, MySQL,
          PostgreSQL, and Flutter</strong>. Part of the team behind <strong>Atruha Finance</strong>, a live financial
          analytics platform covering <strong>400+ Saudi Exchange (Tadawul) stocks</strong>, including TASI and Nomu,
          with paying premium subscribers. Experienced in <strong>REST API design, JWT authentication, role-based
          access control, Redis caching, and Razorpay payment integration</strong>. Published a Flutter app with
          <strong> 30,000+ downloads</strong> on Google Play and the App Store. Works in Agile teams with CI/CD workflows.
        </p>

        {/* ── TECHNICAL SKILLS ── */}
        <SectionTitle>Technical Skills</SectionTitle>
        <SkillRow label="Languages" value="JavaScript (ES6+), TypeScript, Java, Python, C#, Dart, SQL" />
        <SkillRow label="Frontend" value="React.js, Next.js, Redux Toolkit, HTML5, CSS3, Tailwind CSS, Bootstrap, Framer Motion, Three.js" />
        <SkillRow label="Backend" value="Node.js, Express.js, REST APIs, JWT Authentication, Role-Based Access Control (RBAC), WebSocket, Spring Boot, ASP.NET Core" />
        <SkillRow label="Databases" value="MySQL, PostgreSQL, MongoDB, Firebase Firestore, Redis" />
        <SkillRow label="Mobile" value="Flutter, Dart, Firebase, FCM Push Notifications, Riverpod, Hive" />
        <SkillRow label="DevOps & Cloud" value="Git, GitHub, GitHub Actions, Docker, CI/CD, AWS, Vercel, Render, Hostinger" />
        <SkillRow label="Tools & Integrations" value="Razorpay, MinIO, SMTP, Google APIs, Postman" />
        <SkillRow label="Testing" value="Playwright, Unit Testing, API Testing, Debugging" />
        <SkillRow label="Practices" value="Agile, Scrum, Responsive Design, Component Architecture, Performance Optimization, System Design" />
        <SkillRow label="Machine Learning (foundational)" value="TensorFlow, Scikit-learn, Pandas, NumPy, NLP, Time Series Analysis" />

        {/* ── PROFESSIONAL EXPERIENCE ── */}
        <SectionTitle>Professional Experience</SectionTitle>

        <JobHeader
          title="Software Engineer — Full Stack Developer"
          company="Atmez AI Solutions · Hyderabad, India"
          dates="January 2025 – Present"
        />
        <ul className="mt-1">
          <Bullet>
            Built <strong>Atruha Finance</strong>, a live financial analytics platform covering <strong>400+ Tadawul stocks</strong> (TASI and Nomu) with paying premium subscribers, using React.js, Redux Toolkit, Node.js, MySQL, and REST APIs.
          </Bullet>
          <Bullet>
            Delivered real-time stock tracking, portfolio management, and interactive dashboards; improved dashboard load times through API optimization, lazy loading, and reusable components.
          </Bullet>
          <Bullet>
            Contributed to <strong>StafWise</strong>, an enterprise HR management SaaS (React.js, Node.js, MySQL, JWT), automating onboarding, attendance, payroll, and reporting with role-based access across multiple organizational roles.
          </Bullet>
          <Bullet>
            Developed <strong>Acadlync</strong>, an academic management platform (React.js, TypeScript, PostgreSQL) for administrators, teachers, and students, with REST APIs for enrollment, timetables, and grade tracking.
          </Bullet>
          <Bullet>
            Led development and release of the <strong>Islamic Hijri Calendar</strong> Flutter app on Google Play and the App Store, reaching <strong>30,000+ downloads</strong>; integrated Firebase Authentication, FCM push notifications, Riverpod state management, Hive offline storage, and multilingual support.
          </Bullet>
          <Bullet>
            Built a full-stack <strong>E-Commerce Platform</strong> (React.js, Node.js, MySQL) with Razorpay payments, inventory and order management, and authentication; used Redis caching and query optimization to reduce API response times.
          </Bullet>
        </ul>

        <JobHeader
          title="Python Full Stack Developer — Trainee"
          company="Quality Thoughts (iHub) · Hyderabad, India"
          dates="July 2024 – December 2024"
        />
        <ul className="mt-1">
          <Bullet>
            Completed an intensive Python Full Stack training program covering Python, Django, HTML5, CSS3, JavaScript, and MySQL, building and deploying functional web applications from the ground up.
          </Bullet>
          <Bullet>
            Applied the MVT architecture, REST API design, authentication, and relational database modeling with Django and MySQL across hands-on projects.
          </Bullet>
          <Bullet>
            Strengthened core software engineering fundamentals — data structures, OOP, Git version control, and debugging — through guided labs and project reviews.
          </Bullet>
        </ul>

        {/* ── PROJECTS ── */}
        <SectionTitle>Projects</SectionTitle>

        <ProjectItem
          name="Atruha Finance"
          stack="React.js, Node.js, MySQL, Redux Toolkit, Tailwind CSS"
          url="atruhafinance.com"
          href="https://atruhafinance.com"
          bullets={[
            'Live Tadawul analytics platform with real-time stock tracking, portfolio management, interactive dashboards, and JWT-based authentication.',
          ]}
        />
        <ProjectItem
          name="StafWise"
          stack="React.js, Node.js, MySQL, Tailwind CSS"
          url="stafwise.com"
          href="https://stafwise.com"
          bullets={[
            'HR management platform covering onboarding, attendance, payroll, scheduling, and role-based access, with secure REST APIs and reporting dashboards.',
          ]}
        />
        <ProjectItem
          name="Acadlync"
          stack="React.js, TypeScript, PostgreSQL"
          url="acadlynk.atmez.ai"
          href="https://acadlynk.atmez.ai"
          bullets={[
            'Academic management platform with student enrollment, timetable scheduling, grade management, multi-role authentication, and analytics dashboards.',
          ]}
        />
        <ProjectItem
          name="Employee Management System"
          stack="React.js, TypeScript, MySQL, REST APIs"
          url="ems.atmez.ai"
          href="https://ems.atmez.ai/"
          bullets={[
            'Enterprise system for attendance, leave management, department administration, and analytics dashboards with role-based access; built reusable React components and optimized backend APIs.',
          ]}
        />
        <ProjectItem
          name="E-Commerce Platform"
          stack="React.js, Node.js, MySQL, Razorpay, Redis"
          bullets={[
            'Product catalog, shopping cart, Razorpay checkout, inventory management, and order tracking; Redis caching and query optimization improved API response times.',
          ]}
        />
        <ProjectItem
          name="Islamic Hijri Calendar"
          stack="Flutter, Dart, Firebase, Riverpod, Hive, FCM"
          googlePlay="https://play.google.com/store/apps/details?id=com.atmezai.islamichijricalendar"
          appStore="https://apps.apple.com/us/app/islamic-hijri-calendar/id6749267607"
          bullets={[
            'Cross-platform Islamic calendar app with 30,000+ downloads, offline-first storage, push notifications, and multilingual support.',
          ]}
        />
        <ProjectItem
          name="Developer Portfolio"
          stack="React.js, Vite, Tailwind CSS, Framer Motion"
          url="sohail-portfolio-five.vercel.app"
          href="https://sohail-portfolio-five.vercel.app/"
          bullets={[
            'Animated, responsive portfolio with SEO optimization and automated deployment using GitHub Actions and Vercel CI/CD.',
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
        {/* <EduRow
          degree="Secondary School Certificate (SSC)"
          institution="Vasu High School, Bodhan"
          year="2018"
          pct="88.73%"
        /> */}

        {/* ── CERTIFICATIONS ── */}
        <SectionTitle>Certifications</SectionTitle>
        <ul className="mt-1">
          <Bullet>C# &amp; ASP.NET Core Developer — Microsoft Certification</Bullet>
          <Bullet>Python Full Stack Developer — IHUB (Quality Thoughts)</Bullet>
          <Bullet>Data Science &amp; Artificial Intelligence — DataLabs</Bullet>
          <Bullet>Training ISP First Trainings Contest — Internshala</Bullet>
        </ul>

        {/* ── LANGUAGES ── */}
        <SectionTitle>Languages</SectionTitle>
        <p className="text-[13.5px] text-[#374151] mt-1">
          English (Professional), Hindi (Professional), Urdu (Native), Telugu (Conversational)
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

export default Resume;
