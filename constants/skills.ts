import type { SkillCategory, SkillCategoryId, SkillPanel } from '@/types';

export const skillCategories: readonly SkillCategory[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI Systems' },
  { id: 'databases', label: 'Databases' },
  { id: 'security', label: 'Security' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'tooling', label: 'Tooling' },
];

export const skillPanels: Record<SkillCategoryId, SkillPanel> = {
  frontend: {
    title: 'FRONTEND ENGINEERING',
    items: [
      { name: 'React', status: 'CORE', detail: 'Frontend framework' },
      { name: 'Next.js', status: 'CORE', detail: 'Application framework' },
      { name: 'Angular', status: 'CORE', detail: 'Frontend framework' },
      { name: 'TypeScript', status: 'CORE', detail: 'Typed language' },
      { name: 'React Native', status: 'PROFICIENT', detail: 'Cross-platform UI' },
      { name: 'Angular Capacitor', status: 'PROFICIENT', detail: 'Mobile runtime' },
      { name: 'Zustand', status: 'ACTIVE', detail: 'State management' },
      { name: 'JavaScript', status: 'WORKING', detail: 'Language runtime' },
    ],
    capabilities: [
      'Component architecture',
      'Responsive interfaces',
      'Progressive web apps',
      'Cross-platform development',
    ],
  },
  backend: {
    title: 'BACKEND SERVICES',
    items: [
      { name: 'C# / ASP.NET', status: 'CORE', detail: 'Application services' },
      { name: 'Node.js', status: 'PROFICIENT', detail: 'Runtime services' },
      { name: 'Python', status: 'ACTIVE', detail: 'Automation and AI' },
      { name: 'REST APIs', status: 'CORE', detail: 'Service interfaces' },
      { name: 'SignalR', status: 'ACTIVE', detail: 'Real-time transport' },
      { name: 'OData', status: 'WORKING', detail: 'Data services' },
    ],
    capabilities: ['API design', 'Business logic', 'Real-time systems', 'Enterprise integrations'],
  },
  ai: {
    title: 'AI SUBSYSTEM',
    items: [
      { name: 'LLM Integration', status: 'ACTIVE', detail: 'Model connectivity' },
      { name: 'Agentic Workflows', status: 'ACTIVE', detail: 'Task orchestration' },
      { name: 'MCP', status: 'ACTIVE', detail: 'Tool communication' },
      { name: 'Microsoft Foundry', status: 'ACTIVE', detail: 'Agent runtime' },
      { name: 'Structured Outputs', status: 'ACTIVE', detail: 'Reliable generation' },
      { name: 'LangChain', status: 'INSTALLED', detail: 'AI application tooling' },
      { name: 'Vector Databases', status: 'INSTALLED', detail: 'Semantic retrieval' },
      { name: 'RAG', status: 'INSTALLED', detail: 'Retrieval pipelines' },
    ],
    capabilities: [
      'Model orchestration',
      'Tool execution',
      'Structured generation',
      'Retrieval pipelines',
      'Agent communication',
    ],
    runtimeNote: 'agent_runtime: operational',
  },
  databases: {
    title: 'STORAGE / DATA SYSTEMS',
    items: [
      { name: 'SQL Server', status: 'ACTIVE', detail: 'Relational' },
      { name: 'PostgreSQL', status: 'ACTIVE', detail: 'Relational' },
      { name: 'MongoDB', status: 'READY', detail: 'Document' },
      { name: 'Supabase', status: 'READY', detail: 'Platform' },
      { name: 'Entity Framework', status: 'CORE', detail: 'Data access' },
      { name: 'Stored Procedures', status: 'WORKING', detail: 'Database logic' },
    ],
    capabilities: ['Data modeling', 'Synchronization', 'Query optimization', 'Enterprise data flows'],
  },
  security: {
    title: 'SECURITY_DIAGNOSTICS',
    items: [
      { name: 'Web Application Security', status: 'ENABLED', detail: 'Authorized testing' },
      { name: 'Secure Development', status: 'ENABLED', detail: 'Defensive engineering' },
      { name: 'Attack Surface Analysis', status: 'ENABLED', detail: 'Exposure review' },
      { name: 'TLS / HTTP Analysis', status: 'ENABLED', detail: 'Transport diagnostics' },
      { name: 'Remediation & Hardening', status: 'ENABLED', detail: 'Risk reduction' },
      { name: 'Kali Linux', status: 'TOOLKIT', detail: 'Security environment' },
      { name: 'Burp Suite', status: 'TOOLKIT', detail: 'Web assessment' },
      { name: 'Nmap', status: 'TOOLKIT', detail: 'Network discovery' },
    ],
    capabilities: ['Authentication review', 'Configuration analysis', 'Defensive tooling', 'Defense-in-depth'],
    runtimeNote: 'defensive tooling loaded',
  },
  architecture: {
    title: 'SYSTEM ARCHITECTURE',
    items: [
      { name: 'REST / SignalR', status: 'CORE', detail: 'Application transport' },
      { name: 'ASP.NET Services', status: 'CORE', detail: 'Service layer' },
      { name: 'AI Agents', status: 'ACTIVE', detail: 'Intelligent workflows' },
      { name: 'Microservices', status: 'WORKING', detail: 'Distributed systems' },
      { name: 'Event-driven Systems', status: 'WORKING', detail: 'Async coordination' },
      { name: 'Enterprise Integrations', status: 'CORE', detail: 'Connected systems' },
    ],
    capabilities: ['System design', 'Integration boundaries', 'Service orchestration', 'Operational reliability'],
  },
  tooling: {
    title: 'ENGINEERING TOOLKIT',
    items: [
      { name: 'Git', status: 'CORE', detail: 'Version control' },
      { name: 'Docker', status: 'ACTIVE', detail: 'Container tooling' },
      { name: 'Linux', status: 'ACTIVE', detail: 'Development environment' },
      { name: 'Nginx', status: 'WORKING', detail: 'Web infrastructure' },
      { name: 'CI / CD', status: 'ACTIVE', detail: 'Delivery automation' },
      { name: 'Figma', status: 'PROFICIENT', detail: 'Product design' },
      { name: 'Agile', status: 'WORKING', detail: 'Team delivery' },
    ],
    capabilities: ['Development workflows', 'Infrastructure literacy', 'Design collaboration', 'Continuous delivery'],
  },
};
