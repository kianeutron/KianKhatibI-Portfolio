import type { CaseStudy } from '@/types';

const caseStudy01: CaseStudy = {
  id: 'CASE 01',
  slug: 'case-01',
  fileName: '01_AI_REPORTING_PLATFORM.case',
  windowTitle: 'Case 01 - AI Reporting Platform',
  title: 'AI-NATIVE REPORTING PLATFORM',
  sections: [
    {
      label: 'OVERVIEW',
      paragraphs: [
        'An internal reporting platform that uses AI where it actually saves work: translating user intent into structured, validated application data.',
        'I owned the product end to end: system design, data model, backend, React interface, AI flows, orchestration, UX, and data-access rules.',
      ],
      bullets: [
        'Role: End-to-end product and software engineering',
        'Stack: ASP.NET Core 10 / React / Vite / Microsoft SQL Server',
        'Sanitized case study: no customer data, credentials, schemas, or proprietary names',
      ],
    },
    {
      label: 'PROBLEM',
      title: 'THE FRICTION',
      paragraphs: [
        'Serious report creation depended on SQL, stored procedures, data bindings, component configuration, and legacy report definitions.',
        'The platform also had to work across customer databases whose names, relationships, and languages were not identical.',
      ],
      bullets: [
        'Find the right customer database',
        'Understand a changing schema',
        'Create data sources and bind fields',
        'Configure tables, text, scripts, and report settings',
        'Give non-technical employees a useful workflow',
      ],
    },
    {
      label: 'ARCHITECTURE',
      title: 'AI INTERPRETS. THE APP CONTROLS.',
      paragraphs: [
        'AI can interpret and generate, but model output is never trusted executable logic.',
        'The model returns structured instructions. The backend validates them, checks authorization, routes them to an approved data source, and decides what is persisted.',
      ],
      bullets: [],
      visual: 'architecture',
    },
    {
      label: 'DATA SOURCES',
      title: 'PROMPT TO REUSABLE DATA SOURCE',
      paragraphs: [
        'The Data Source Creator lets a user describe the information they need without knowing which tables or columns are behind it.',
        'The target is not prompt-to-SQL. It is an authorized, valid, reusable report data source.',
      ],
      bullets: [
        'Select the correct customer database',
        'Provide relevant schema context',
        'Generate a known data-source structure',
        'Fail safely when output is invalid',
        'Keep customer boundaries intact',
      ],
    },
    {
      label: 'COMPONENTS',
      title: 'STRUCTURE THE MODEL ALREADY UNDERSTANDS',
      paragraphs: [
        'Tables, text, and other report elements already have known structures and rules. The model generates the component JSON the backend understands instead of inventing a parallel representation.',
        'The user describes the desired result while the application remains deterministic about what a valid component is.',
      ],
      bullets: [
        'Natural language request',
        'Structured component output',
        'Backend validation',
        'Report-ready component',
      ],
    },
    {
      label: 'REPORT REBUILD',
      title: 'LEGACY FILE TO BUILD NOTES',
      paragraphs: [
        'Existing report-definition files contain data sources, fields, bindings, component structure, styling, ordering, and relationships.',
        'The backend parses that structure, then AI turns it into human-readable build notes that can also guide a rebuild in the new system.',
      ],
      bullets: [],
      visual: 'reconstruction',
    },
    {
      label: 'AGENT MODE',
      title: 'A WORKFLOW, NOT A CHATBOT',
      paragraphs: [
        'Agent Mode takes generated instructions and runs the sequence for the user. The system handles repetitive execution while the user retains control of the final result.',
        'It becomes agentic because model output is connected to application capabilities and coordinated toward a result.',
      ],
      bullets: [
        'Choose the correct operation',
        'Respect dependencies and ordering',
        'Handle timing, debounce, and rate limits',
        'Retry failed operations',
        'Prepare the report canvas',
      ],
    },
    {
      label: 'SECURITY',
      title: 'SECURITY BY DESIGN',
      paragraphs: [
        'The platform works with enterprise customer data, so security is part of the architecture rather than a finishing step.',
        'AI can make the interface smarter, but it cannot weaken the application trust boundaries.',
      ],
      bullets: [
        'Customer-aware data routing',
        'Authorization before data access',
        'Read-oriented reporting access',
        'Structured model outputs',
        'Backend validation and controlled execution',
        'Explicit failure paths and cross-customer isolation',
      ],
    },
    {
      label: 'UX',
      title: 'MAKE REPORTING FEEL LESS TECHNICAL',
      paragraphs: [
        'The workflow is organized around what a person is trying to do, not the implementation detail behind it.',
        'AI is only useful when the surrounding product is understandable and pleasant to use.',
      ],
      bullets: [
        'What information do I need?',
        'What should this table show?',
        'Can I rebuild this existing report?',
        'Can the system create the repetitive parts for me?',
      ],
    },
    {
      label: 'OUTCOME',
      title: 'A REUSABLE AI LAYER',
      paragraphs: [
        'The working platform makes report creation less dependent on technical staff without replacing the application’s security and business rules.',
        'I am intentionally not using invented percentages or performance metrics. This case describes what the internal system actually does.',
      ],
      bullets: [
        'Faster data-source creation',
        'Easier component creation',
        'Existing definitions become reconstruction instructions',
        'Repetitive steps can be orchestrated automatically',
        'Non-technical users can participate in report building',
      ],
    },
    {
      label: 'LESSONS',
      title: 'THE MODEL IS THE EASY PART',
      paragraphs: [
        'The difficult engineering work sits around the model: context, allowed output, machine-readable structure, validation, boundaries, failure recovery, sequencing, and understandable UX.',
        'I want AI inside a properly engineered system where it has a clear job and clear limits.',
      ],
      bullets: [
        'Design the context',
        'Constrain the output',
        'Validate every handoff',
        'Protect customer boundaries',
        'Recover and sequence deliberately',
      ],
    },
    {
      label: 'STACK',
      title: 'ENGINEERING FOCUS',
      paragraphs: [
        'Frontend: React and Vite. Backend: ASP.NET Core 10. Database: Microsoft SQL Server.',
        'AI patterns include structured model output, natural-language data-source creation, component generation, report-definition analysis, and multi-step agent orchestration.',
      ],
      bullets: [
        'Architecture',
        'Authorization',
        'Customer isolation',
        'Reporting UX',
        'Safe execution around probabilistic model output',
      ],
    },
  ],
};

const caseStudy02: CaseStudy = {
  id: 'CASE 02',
  slug: 'case-02',
  fileName: '02_SECURITY_HARDENING.case',
  windowTitle: 'Case 02 - Security Hardening',
  title: 'SECURITY HARDENING OF AN ENTERPRISE WEB APPLICATION',
  sections: [
    {
      label: 'OVERVIEW',
      paragraphs: [
        'I carried out a security assessment on an enterprise web application in a controlled acceptance environment.',
        'I was already involved with the software from the development side, so I approached the assessment from both directions: as someone who understands how the application is built and as someone trying to understand what an external attacker could actually reach.',
        'The goal was not to run a scanner and produce a long list of warnings. I wanted to identify issues that had real impact, reproduce them carefully, report them clearly, and help turn the findings into engineering changes.',
        'The assessment led to work across application code, exposed attack surface, transport security, availability controls, and broader defensive infrastructure.',
      ],
      bullets: [
        'Role: Software engineer / security assessment',
        'Environment: Authorized acceptance environment',
        'Focus: Attack surface, availability, application hardening, TLS, defensive controls',
        'Sanitized case study: no customer data, credentials, or exploitable details',
      ],
    },
    {
      label: 'WHY I DID THE ASSESSMENT',
      title: 'LOOK AT THE SYSTEM FROM THE OUTSIDE',
      paragraphs: [
        'I work on enterprise software that eventually reaches real users and customer environments.',
        'I wanted to look at the software differently from how I normally do during feature development. When you build an application every day, it is easy to see the system through the intended workflow: login here, call this API, open this page, submit this form.',
        'Security testing forces a different question: What can someone reach if they ignore the intended workflow completely? That was the mindset behind the assessment.',
      ],
      bullets: [
        'Understand the public-facing boundary',
        'Challenge assumptions in the intended workflow',
        'Turn observations into practical engineering changes',
      ],
    },
    {
      label: 'MY APPROACH',
      title: 'OUTSIDE-IN, THEN BACK INTO THE CODE',
      paragraphs: [
        'I worked from a dedicated Kali Linux environment and assessed the application from the outside in, following the same boundary an external user or attacker would encounter.',
        'The toolset included Burp Suite, Nmap, OpenSSL, curl, browser developer tools, DNS and HTTP tooling, and targeted scripting.',
        'Automated output was treated as a starting point, not a confirmed vulnerability. A finding became useful when I could understand it, reproduce it, explain its boundary, and connect it to a remediation path.',
      ],
      bullets: [
        'Kali Linux',
        'Burp Suite',
        'Nmap',
        'OpenSSL and curl',
        'Browser developer tools',
        'DNS / HTTP tooling',
        'Targeted scripts',
      ],
    },
    {
      label: 'PRE-AUTH EXPOSURE',
      title: 'THE FIRST BOUNDARY MATTERS',
      paragraphs: [
        'A major focus was the amount of application functionality and information exposed before authentication. Public endpoints, metadata, error behavior, and service responses all contribute to an application’s attack surface.',
        'The goal was not to hide the existence of a product. It was to make sure every pre-auth surface was intentional, minimized, and protected by the correct server-side boundary.',
      ],
      bullets: [
        'Reduce unnecessary pre-auth surface',
        'Treat client-visible information as discoverable',
        'Enforce authorization on the server',
        'Keep error and metadata responses deliberate',
      ],
    },
    {
      label: 'AVAILABILITY',
      title: 'SECURITY INCLUDES HOW THE SYSTEM FAILS',
      paragraphs: [
        'I also tested how the application behaved under abusive or unusually expensive traffic in an authorized non-production environment.',
        'This raised questions beyond a single endpoint: where should throttling happen, which requests are expensive, what does the application do when limits are reached, and which protections belong upstream?',
      ],
      bullets: [
        'Application throttling',
        'Rate limiting and request cost',
        'Upstream filtering',
        'Monitoring and alerting',
        'Predictable failure behavior',
      ],
    },
    {
      label: 'TLS / TRANSPORT',
      title: 'THE DEPLOYMENT BOUNDARY IS PART OF THE PRODUCT',
      paragraphs: [
        'Transport security was reviewed as part of the complete public boundary: protocol support, certificates, external service posture, deployment configuration, and the behavior of proxies and network controls.',
        'This connected application-level findings with the infrastructure decisions that determine how the application is actually reached.',
      ],
      bullets: [
        'Protocol support',
        'Certificates',
        'External service posture',
        'Deployment configuration',
        'Proxy and network behavior',
      ],
    },
    {
      label: 'REPORTING',
      title: 'FINDING TO FIX TO VERIFICATION',
      paragraphs: [
        'I reported the results to the CTO and approached the work from an engineering perspective. Each finding needed enough evidence to make the risk understandable, a clear boundary, a remediation direction, and a way to verify the change.',
        'The useful part of the assessment was the ability to move from finding, to code or configuration, to implementation, and then back to verification.',
      ],
      bullets: [
        'What was observed',
        'Why it mattered',
        'How it could be reproduced safely',
        'Which layer owned the fix',
        'How remediation would be verified',
      ],
    },
    {
      label: 'FROM FIXES TO DEFAULTS',
      title: 'MAKE THE SECURE PATH THE NORMAL PATH',
      paragraphs: [
        'The assessment was not treated as a collection of isolated symptoms. Where a finding revealed a broader weakness, I looked for shared protections and safer defaults that could prevent the same class of issue elsewhere.',
        'That included discussions around WAF coverage, common defensive controls, and moving security improvements into the platform rather than leaving them as one-off patches.',
      ],
      bullets: ['Shared protections', 'Safer defaults', 'Reusable defensive controls', 'Platform-level remediation'],
    },
    {
      label: 'DEVELOPMENT-SIDE HARDENING',
      title: 'SECURITY BECOMES ENGINEERING WORK',
      paragraphs: [
        'The findings fed back into development work across authorization boundaries, exposure reduction, input handling, safe defaults, abnormal traffic behavior, server-side enforcement, and deployment or header hygiene.',
        'This is where security testing became most valuable: it produced changes that could live in the application and its delivery environment.',
      ],
      bullets: [
        'Authorization boundaries',
        'Input handling',
        'Safe defaults',
        'Server-side enforcement',
        'Abnormal traffic behavior',
        'Deployment and header hygiene',
      ],
    },
    {
      label: 'OUTCOME',
      title: 'DEFENSE IN DEPTH',
      paragraphs: [
        'The assessment reinforced that application security is a system property. A weakness may sit in code, authentication, authorization, APIs, deployment, TLS, infrastructure, or monitoring, and the right response often crosses several of those layers.',
        'The availability work also created a wider conversation about architecture and organization-wide controls instead of treating resilience as an isolated endpoint concern.',
      ],
      bullets: ['Defense in depth', 'Controlled assessment', 'Engineering remediation', 'Security-aware architecture'],
    },
  ],
};

const caseStudy03: CaseStudy = {
  id: 'CASE 03',
  slug: 'case-03',
  fileName: '03_FIELD_OPERATIONS_PWA.case',
  windowTitle: 'Case 03 - Field Operations PWA',
  title: 'REAL-TIME FIELD OPERATIONS PWA',
  sections: [
    {
      label: 'OVERVIEW',
      paragraphs: [
        'I work on a progressive web application used around field inspection workflows as part of a larger enterprise solution.',
        'Inspectors can see assigned work, open case information, create timesheets, record declarations and work orders, and work with calendar and location context. Administrators review, approve, and export the resulting operational data.',
        'My work spans the full connection between the enterprise system, the application database, the backend services, and the user interface. The user should not have to care that several systems are involved; the application needs to synchronize and present the correct state.',
      ],
      bullets: [
        'Frontend: Angular / PWA',
        'Backend: ASP.NET / C#',
        'Database: Microsoft SQL Server',
        'Real-time: SignalR',
      ],
    },
    {
      label: 'THE PRODUCT',
      title: 'DESIGNED AROUND THE WORKING DAY',
      paragraphs: [
        'The product is designed around what people actually need during field work rather than around the structure of the underlying enterprise systems.',
        'The field side supports day-to-day inspection work, while the administrative side supports reviewing, approving, managing, and exporting the information created during that work.',
      ],
      bullets: [
        'Assigned jobs and cases',
        'Locations and contacts',
        'Timesheets',
        'Work orders',
        'Declarations and expenses',
        'Tools and materials',
        'Calendar and map context',
        'Administrative review and approval',
      ],
    },
    {
      label: 'MY ROLE',
      title: 'FULL-STACK WORK IN A LIVING SYSTEM',
      paragraphs: [
        'I work across Angular, ASP.NET and C#, SQL Server, stored procedures, synchronization logic, business rules, SignalR updates, UI implementation, and debugging differences between systems.',
        'I did not create the entire surrounding solution from scratch. My role has been to own and improve the parts of the product that support these workflows, while working with the existing enterprise architecture and operational constraints.',
      ],
      bullets: [
        'Angular PWA interfaces',
        'ASP.NET / C# APIs',
        'SQL Server queries and procedures',
        'Database synchronization',
        'Business rules and validation',
        'SignalR events and live updates',
        'UI/UX for field workflows',
      ],
    },
    {
      label: 'MAIN CHALLENGE',
      title: 'TWO KINDS OF SYNCHRONIZATION',
      paragraphs: [
        'The source data belongs to another enterprise system, while the PWA needs its own application-ready representation. That creates two separate synchronization problems.',
        'The first is data synchronization: moving, transforming, and reconciling information between systems. The second is user-interface synchronization: making sure a connected user sees the new state without having to guess, refresh, or navigate away.',
      ],
      bullets: [
        'Keep source and application data aligned',
        'Translate enterprise data into usable application state',
        'Refresh connected interfaces when state changes',
      ],
    },
    {
      label: 'DATABASE SYNCHRONIZATION',
      title: 'THE DATA LAYER DOES REAL WORK',
      paragraphs: [
        'The application relies on Microsoft SQL Server and a set of stored procedures to detect changes, transform data, apply business rules, and keep the application database aligned with the surrounding enterprise system.',
        'This work involves handling mismatches between systems, understanding expected structures, and changing procedures safely as the product evolves.',
      ],
      bullets: [
        'Create and alter stored procedures',
        'Transform data between systems',
        'Apply business rules during synchronization',
        'Keep application databases aligned',
        'Investigate mismatches',
        'Preserve expected data structures',
      ],
    },
    {
      label: 'REAL-TIME UPDATES WITH SIGNALR',
      title: 'KEEP THE SCREEN CURRENT',
      paragraphs: [
        'Database synchronization solves one part of the problem. The interface also needs to know when the relevant state has changed.',
        'SignalR connects backend events to the Angular application so that the UI can refresh or update when synchronization completes. The user sees a current application state instead of a stale screen that quietly waits for a manual refresh.',
      ],
      bullets: ['Data changes', 'Synchronization completes', 'SignalR event', 'Angular state refresh'],
    },
    {
      label: 'BUSINESS LOGIC',
      title: 'MODEL THE OPERATIONAL PROCESS',
      paragraphs: [
        'The application contains customer-specific operational logic rather than only generic CRUD screens. Rules, states, dependencies, approvals, and administrative steps all need to be represented consistently across the backend and the interface.',
        'That means the backend must understand the process the user is carrying out, not just the shape of an individual request.',
      ],
      bullets: ['Timesheets', 'Declarations', 'Work orders', 'Approvals', 'Planning', 'Administrative review'],
    },
    {
      label: 'MOBILE-FIRST UI',
      title: 'THE FIELD IS NOT A DESKTOP',
      paragraphs: [
        'Inspectors often use the product away from a desk, on phones or tablets, while moving between real-world tasks. The interface therefore cannot simply be a desktop admin panel squeezed into a smaller viewport.',
        'The most important information and actions need to remain easy to reach, readable, and usable in the context where the work actually happens.',
      ],
      bullets: [
        'Touch-friendly targets',
        'Shallow navigation depth',
        'Important information first',
        'Practical field forms',
        'Fast access to common actions',
      ],
    },
    {
      label: 'WHY STORED PROCEDURES MATTER',
      title: 'EXPLICIT DATA MOVEMENT',
      paragraphs: [
        'Stored procedures make important parts of the synchronization flow explicit: what data moves, when it moves, how it is transformed, and which rules apply at the data layer.',
        'They also make schema changes and synchronization behavior something the team can reason about, test, and alter carefully rather than leaving it hidden inside an opaque integration.',
      ],
      bullets: [
        'Data movement',
        'Timing and change detection',
        'Transformations',
        'Data-layer rules',
        'Schema evolution',
        'Safe procedure changes',
      ],
    },
    {
      label: 'KEY DECISIONS',
      title: 'INTEGRATE, SYNCHRONIZE, REFRESH',
      paragraphs: [
        'Database synchronization and UI synchronization are separate concerns, so they are handled separately. The application integrates with the enterprise system instead of duplicating it, and the experience is designed for field work first.',
        'The product works with the existing system while adding an application layer that makes the operational workflow more usable, current, and maintainable.',
      ],
      bullets: [
        'Separate database sync from UI sync',
        'Integrate instead of duplicate',
        'Design for the field first',
        'Work with the existing enterprise system',
      ],
    },
    {
      label: 'OUTCOME',
      title: 'OPERATIONAL DATA THAT STAYS CURRENT',
      paragraphs: [
        'The result is a field-oriented application that keeps operational data synchronized across systems while giving connected users timely updates in the interface.',
        'It combines enterprise integration, explicit data-layer work, real-time communication, and a mobile-first workflow into one usable product surface.',
      ],
      bullets: ['Operational consistency', 'Real-time freshness', 'Mobile-first workflows', 'Enterprise integration'],
    },
  ],
};

export const caseStudies: readonly CaseStudy[] = [caseStudy01, caseStudy02, caseStudy03];
