import React from 'react';
import { Download } from 'lucide-react';

// ── Print page styles ────────────────────────────────────────────
const printStyles = `
  @media print {

    @page {
      size: A4;
      margin: 15mm;
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .print-page-break {
      break-before: page;
      page-break-before: always;
    }

    .page-break {
      break-before: page;
      page-break-before: always;
    }

    .avoid-break {
      break-inside: avoid;
      page-break-inside: avoid;
    }

  }
`;

// ── Reusable sub-components ──────────────────────────────────────

const SectionTitle = ({ children }) => (
  <div className="mt-3 mb-1">
    <h2
      className="text-[15px] font-bold uppercase tracking-[0.18em]"
      style={{ color: '#17558F' }}
    >
      {children}
    </h2>
    <div className="mt-0.5 border-b-2" style={{ borderColor: '#17558F', opacity: 0.35 }} />
  </div>
);

const Bullet = ({ children }) => (
  <li className="flex items-start gap-2 text-[13px] text-[#374151] leading-snug">
    <span className="mt-0.5 flex-shrink-0 text-[11px]" style={{ color: '#17558F' }}>▸</span>
    <span>{children}</span>
  </li>
);

const JobHeader = ({ title, company, dates }) => (
  <div className="flex flex-wrap justify-between items-baseline gap-x-4 mt-2 mb-0">
    <span className="font-bold text-[14px] text-[#1A1A2E]">{title}</span>
    <span className="text-[11px] text-[#6B7280] font-mono">{dates}</span>
    <div className="w-full text-[12px] mt-0" style={{ color: '#17558F' }}>{company}</div>
  </div>
);

const ProjectItem = ({ name, stack, url, href, googlePlay, appStore, bullets }) => (
  <div className="mt-2">
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
      <span className="font-bold text-[13px] text-[#1A1A2E]">{name}</span>
      <span className="text-[11px] font-mono italic" style={{ color: '#17558F' }}>{stack}</span>
      {url && href && !googlePlay && !appStore && (
        <a href={href} target="_blank" rel="noopener noreferrer"
          className="text-[10.5px] underline" style={{ color: '#17558F' }}>{url}</a>
      )}
      {url && !href && !googlePlay && !appStore && (
        <span className="text-[10.5px] text-[#6B7280]">{url}</span>
      )}
      {googlePlay && (
        <a href={googlePlay} target="_blank" rel="noopener noreferrer"
          className="text-[10.5px] underline" style={{ color: '#17558F' }}>Google Play</a>
      )}
      {googlePlay && appStore && (
        <span className="text-[10.5px] text-[#6B7280]">·</span>
      )}
      {appStore && (
        <a href={appStore} target="_blank" rel="noopener noreferrer"
          className="text-[10.5px] underline" style={{ color: '#17558F' }}>Apple App Store</a>
      )}
    </div>
    {bullets && (
      <ul className="mt-0 space-y-0">
        {bullets.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
      </ul>
    )}
  </div>
);

const SkillRow = ({ label, value }) => (
  <p className="text-[11.5px] text-[#374151] leading-snug mt-0.5">
    <span className="font-bold text-[12px] text-[#1A1A2E]">{label}:&nbsp;</span>{value}
  </p>
);

const EduRow = ({ degree, institution, year, pct }) => (
  <div className="flex flex-wrap justify-between items-baseline mt-1">
    <div>
      <p className="font-bold text-[13px] text-[#1A1A2E]">{degree}</p>
      <p className="text-[11.5px] italic text-[#6B7280]">{institution}</p>
    </div>
    <span className="text-[11px] font-mono text-[#6B7280]">{year} &nbsp;|&nbsp; {pct}</span>
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
      <div className="px-10 py-6">

        {/* ── HEADER ── */}
        <header className="text-center mb-1">
          <h1 className="text-[26px] font-bold tracking-tight" style={{ color: '#1A1A2E' }}>
            MOHAMMED SOHAIL
          </h1>
        <p className="text-[14px] mt-0.5 font-semibold" style={{ color: '#17558F' }}>
Software Engineer | Full Stack Developer
</p>
          <p className="text-[13px] text-[#6B7280] mt-1">
            Hyderabad, Telangana, India &nbsp;|&nbsp; +91 9347587937 &nbsp;|&nbsp; sohailmohammedsohail268@gmail.com
          </p>
          <p className="text-[12px] mt-0.5" style={{ color: '#17558F' }}>
            <a href="https://www.linkedin.com/in/mohammed-sohail-34b248286/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">linkedin.com/in/mohammed-sohail-34b248286/</a>
            &nbsp;|&nbsp;
            <a href="https://github.com/Mohammed-Sohail123" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">github.com/Mohammed-Sohail123</a>
            &nbsp;|&nbsp;
            <a href="https://sohail-portfolio-five.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">sohail-portfolio-five.vercel.app</a>
          </p>
        </header>

        {/* ── PROFESSIONAL SUMMARY ── */}
   
<SectionTitle>Professional Summary</SectionTitle>

<p className="text-[13px] text-[#374151] leading-snug">
  Results-driven <strong>Software Engineer</strong> with <strong>2+ years of hands-on experience</strong> designing, developing, and deploying full-stack web and mobile applications.
  Experienced in <strong>React.js, Next.js, TypeScript, Node.js, Spring Boot, Flutter,
  MySQL, PostgreSQL, MongoDB, Firebase, REST APIs, and JWT Authentication</strong>.
  Delivered production solutions across finance, HR, education, e-commerce,
  and AI domains, including a published Flutter application with <strong>30,000+ downloads</strong>. Also skilled in
  <strong> C# and ASP.NET Core</strong>.
  Passionate about building scalable, secure, and high-performance software following Agile,
  CI/CD, and modern software engineering practices.
</p>

        {/* ── PROFESSIONAL EXPERIENCE ── */}
        <SectionTitle>Professional Experience</SectionTitle>
      <JobHeader
  title="Software Engineer — Full Stack Developer"
  company="Atmez AI Solutions · Hyderabad, India"
  dates="July 2024 – Present"
/>

<ul className="mt-1 space-y-0">

  <Bullet>
    Built <strong>Atruha Finance</strong>, a financial analytics platform using React.js, Node.js, Redux Toolkit, MySQL, and REST APIs, featuring real-time stock tracking, portfolio management, and interactive dashboards; improved dashboard load performance through API optimization, lazy loading, and reusable component architecture.
  </Bullet>

  <Bullet>
    Contributed to <strong>StafWise</strong>, an enterprise HR management SaaS using React.js, Node.js, MySQL, and JWT Authentication, automating attendance, payroll, and reporting workflows across multiple organizational roles.
  </Bullet>

  <Bullet>
    Developed <strong>Acadlync</strong>, an academic management platform supporting 3 user roles (Administrator, Teacher, Student) using React.js, TypeScript, and PostgreSQL, with REST APIs for enrollment, timetables, and grade tracking.
  </Bullet>

  <Bullet>
    Delivered an enterprise <strong>Employee Management System</strong> with attendance, leave management, department administration, and analytics dashboards, reducing manual administrative work through workflow automation and role-based access control.
  </Bullet>

  <Bullet>
    Led the development and deployment of the
    <strong> Islamic Hijri Calendar</strong> Flutter application, published on both Google Play
    and Apple App Store, reaching <strong>30,000+ downloads</strong> while integrating Firebase
    Authentication, FCM push notifications, Riverpod, Hive offline storage, and multilingual support.
  </Bullet>

  <Bullet>
    Built a full-stack <strong>E-Commerce Platform</strong> integrating Razorpay payment gateway,
    inventory management, Redis caching, authentication, and order management; used Redis caching
    and query optimization to improve API response times.
  </Bullet>

  <Bullet>
    Promoted reusable React component architecture across multiple enterprise
    products, improving maintainability and accelerating feature delivery within Agile/Scrum
    development cycles.
  </Bullet>

</ul>

<SectionTitle>Technical Expertise</SectionTitle>

<div className="skills-grid grid grid-cols-2 gap-x-8 mt-1">

  <div>

    <SkillRow
      label="Programming Languages"
      value="JavaScript (ES6+), TypeScript, Java, Python, C#"
    />

    <SkillRow
      label="Frontend"
      value="React.js, Next.js, HTML5, CSS3, TailwindCSS, Bootstrap, Redux Toolkit, Framer Motion, Three.js"
    />

    <SkillRow
      label="Backend"
      value="Node.js, Express.js, Spring Boot, ASP.NET Core, C#, RESTful APIs, JWT Authentication"
    />

    <SkillRow
      label="Databases"
      value="MySQL, PostgreSQL, MongoDB, Firebase Firestore"
    />

    <SkillRow
      label="Mobile Development"
      value="Flutter, Dart, Firebase, Riverpod, Hive"
    />
    <SkillRow
      label="Cloud & DevOps"
      value="Git, GitHub, Docker, CI/CD, AWS, Vercel, Render, Hostinger"
    />

  </div>

  <div>

    

    <SkillRow
      label="Tools & Technologies"
      value="Redis, WebSocket, Razorpay, MinIO, SMTP, Google APIs, Firebase Cloud Messaging (FCM)"
    />

    <SkillRow
      label="Testing"
      value="Playwright, Unit Testing, Debugging, API Testing"
    />

    <SkillRow
      label="Software Practices"
      value="Agile, Scrum, Responsive Design, Component-Based Architecture, Performance Optimization, System Design"
    />

    <SkillRow
      label="Machine Learning"
      value="TensorFlow, Scikit-learn, Pandas, NumPy, NLP, LSTM, Time Series Analysis"
    />

    <SkillRow
      label="Analytics & Marketing"
      value="Google Ads, Google Analytics, Conversion Tracking, SEO Basics"
    />



  </div>


        </div>

        {/* <JobHeader
          title="Full Stack Development Trainee"
          company="Atmez Ai Solutions · Hyderabad, India"
          dates="July 2024 – November 2024"
        />
        <ul className="mt-1 space-y-0">
          {[
            'Completed comprehensive full-stack training covering Python, Django, React, Angular, and MySQL; built and deployed functional web applications from scratch.',
            'Developed School Management System with student enrollment, attendance tracking, timetable management, and role-based access for admins and teachers using Angular and Django.',
            'Optimized MySQL/PL/SQL queries for high-volume data operations, reducing average retrieval time by 30%.',
            'Participated in code reviews, daily stand-ups, sprint planning, and Agile retrospectives following Scrum methodology.',
          ].map((b, i) => <Bullet key={i}>{b}</Bullet>)}
        </ul> */}

        {/* ── KEY PROJECTS ── */}
        <SectionTitle>Key Projects</SectionTitle>

        {/* Web Apps */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280] mt-1 mb-0">Web Apps</p>

        <ProjectItem
  name="Atruha Finance"
  stack="React.js · Node.js · MySQL · Redux Toolkit · TailwindCSS"
  url="atruhafinance.com"
  href="https://atruhafinance.com"
  bullets={[
    'Architected a production-grade financial analytics platform featuring real-time stock tracking, portfolio management, interactive dashboards, and secure JWT-based authentication using React.js and Node.js.',
    'Optimized REST API performance and implemented lazy loading with reusable UI components, improving dashboard load speed, scalability, and overall user experience.',
  ]}
/>
     <ProjectItem
  name="StafWise"
  stack="React.js · Node.js · MySQL · TailwindCSS"
  url="stafwise.com"
  href="https://stafwise.com"
  bullets={[
    'Developed an enterprise HR management platform supporting employee onboarding, attendance, payroll processing, scheduling, and role-based access control.',
    'Designed secure RESTful APIs with JWT authentication and streamlined reporting dashboards, streamlining HR workflows and reducing manual administrative effort.',
  ]}
/>

     <ProjectItem
  name="Acadlync"
  stack="React.js · TypeScript · PostgreSQL · REST APIs"
  url="acadlynk.atmez.ai"
  href="https://acadlynk.atmez.ai"
  bullets={[
    'Built a scalable academic management platform supporting student enrollment, timetable scheduling, grade management, and multi-role authentication for administrators, teachers, and students.',
    'Implemented secure REST APIs and analytics dashboards, improving institutional data management and reporting efficiency.',
  ]}
/>

      <ProjectItem
  name="Employee Management System"
  stack="React.js · TypeScript · MySQL · REST APIs"
  url="ems.atmez.ai"
  href="https://ems.atmez.ai/"
  bullets={[
    'Engineered an enterprise employee management system featuring attendance, leave management, department administration, analytics dashboards, and secure role-based access.',
    'Developed reusable React components and optimized backend APIs, improving maintainability and overall application performance.',
  ]}
/>
  {/* ── PAGE 2 STARTS HERE on print ── */}
  
       <ProjectItem
  name="E-Commerce Platform"
  stack="React.js · Node.js · MySQL · Razorpay · Redis"
  url={null}
  bullets={[
    'Developed a scalable e-commerce platform with product catalog, shopping cart, Razorpay payment integration, inventory management, authentication, and order tracking.',
    'Improved API response times using Redis caching, database query optimization, and efficient backend architecture.',
  ]}
/>

  <ProjectItem
  name="Developer Portfolio"
  stack="React.js · Vite · TailwindCSS · Framer Motion"
  url= "sohail-portfolio-five.vercel.app"
  bullets={[
    'Designed and developed a modern developer portfolio showcasing enterprise projects with immersive animations, responsive UI, and smooth user interactions.',
    'Implemented an ATS-friendly printable resume, optimized SEO, and automated deployment using GitHub Actions and Vercel CI/CD.',
  ]}
/>

       
        



   {/* Android / iOS Apps */}
<p className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280] mt-2 mb-0">
  Android / iOS Applications
</p>

<ProjectItem
  name="Islamic Hijri Calendar"
  stack="Flutter · Dart · Firebase · Riverpod · Hive · FCM"
  googlePlay="https://play.google.com/store/apps/details?id=com.atmezai.islamichijricalendar"
  appStore="https://apps.apple.com/us/app/islamic-hijri-calendar/id6749267607"
  bullets={[
    'Published a cross-platform Islamic calendar application on Google Play and Apple App Store, reaching 30,000+ downloads with multilingual support and strong user engagement.',
    'Integrated Firebase Authentication, Firebase Cloud Messaging (FCM), Riverpod state management, Hive offline storage, and push notifications to deliver a secure, scalable, and offline-first mobile experience.',
  ]}
/>

        
        {/* Academic Projects */}
<p className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280] mt-2 mb-0">
  Academic Projects
</p>
<ProjectItem
  name="Spammer Detection & Fake User Identification"
  stack="Java · Graph Algorithms · Social Network Analysis"
  bullets={[
    'Designed a graph-based social network analysis system to identify spam accounts and fake users by analyzing user behavior, follower relationships, engagement metrics, and posting patterns.',
    'Implemented graph algorithms and heuristic detection techniques, achieving 87% detection accuracy while improving the identification of suspicious accounts across simulated social network datasets.',
  ]}
/>

      <ProjectItem
  name="Human Interaction with - Eye Controlled Mouse"
  stack="Python · OpenCV · Dlib · PyAutoGUI · Computer Vision"
  bullets={[
    'Developed a computer vision–based Human Computer Interaction (HCI) system enabling hands-free cursor movement using real-time eye tracking and facial landmark detection. Integrated OpenCV, Dlib, and PyAutoGUI to recognize eye movements, blinking, and head gestures.',
  ]}
/>

        {/* <ProjectItem
          name="School Management System"
          stack="Angular · Django · PostgreSQL · REST Framework"
          url={null}
          bullets={[
            'Developed a comprehensive school administration platform with student enrollment, attendance tracking, grade management, and timetable scheduling.',
            'Built RESTful APIs with Django REST Framework supporting role-based access for admins, teachers, and students with JWT authentication.',
            'Designed Angular frontend with dynamic forms, data tables, and reporting modules for institutional analytics and record management.',
          ]}
        /> */}

        {/* ── TECHNICAL SKILLS ── */}
      {/* ── TECHNICAL SKILLS ── */}


    {/* ── EDUCATION ── */}
<SectionTitle>Education</SectionTitle>

<EduRow
  degree="Bachelor of Engineering (B.E.) – Computer Science & Engineering"
  institution="Holy Mary Institute of Technology & Science (JNTUH), Hyderabad"
  year="2024"
  pct="68.00%"
/>

<EduRow
  degree="Diploma in Computer Engineering"
  institution="Government Polytechnic, Kotagiri (SBTET)"
  year="2021"
  pct="78.69%"
/>

<EduRow
  degree="Secondary School Certificate (SSC)"
  institution="Vasu High School, Bodhan"
  year="2018"
  pct="88.73%"
/>

<div
  style={{
    breakInside: "avoid",
    pageBreakInside: "avoid",
  }}
>

<SectionTitle>Certifications</SectionTitle>

<ul className="mt-1 space-y-0">

  <Bullet>
    C# & ASP.NET Core Developer — Microsoft Learn Certification
  </Bullet>

  <Bullet>
    Python Full Stack Developer — IHUB (Quality Thoughts)
  </Bullet>

  <Bullet>
    Data Science & Artificial Intelligence — DataLabs
  </Bullet>

  <Bullet>
    Training ISP First Trainings Contest — Internshala
  </Bullet>

</ul>

</div>


      {/* ── LANGUAGES ── */}
<SectionTitle>Languages</SectionTitle>

<p className="text-[13px] text-[#374151] mt-1">
  English (Professional), Hindi (Professional), Urdu (Native), Telugu (Conversational)
</p>

        {/* ── CERTIFICATIONS ── */}


      </div>
    </div>
{/* <div className="hidden print:block print-page-break" /> */}
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


