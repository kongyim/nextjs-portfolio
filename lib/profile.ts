export const linkedin = 'https://www.linkedin.com/in/kong-yim-7a986076/';

// Project descriptions grounded in the supplied résumé; no inferred results or metrics.
export const projectContext: Record<string, { description: string; technologies: string[] }> = {
  'lincoln-dealers': {
    description: 'Played a major development role in the Lincoln showroom platform deployed across 30+ dealerships and approximately 100 devices, bringing together a 3D rendering wall, a Unity interactive table, and a monitoring application connected to 16 web cameras.',
    technologies: ['Unity', '3D rendering', 'Systems integration'],
  },
  'telstra-interactive-map': {
    description: 'Developed an interactive 3D globe presenting Telstra’s global optical fibre network information, using WebGL, Node.js, and AngularJS.',
    technologies: ['WebGL', 'Node.js', 'AngularJS'],
  },
  swire: {
    description: 'Built the Pacific Place Office interactive digital directory with CMS-driven data, 3D rendering, and wayfinding. Earlier work included maintaining the Pacific Place directory built with C++, OpenGL, and OpenSceneGraph.',
    technologies: ['Angular', 'Node.js', 'WebGL', 'CMS integration'],
  },
  galaxy: {
    description: 'Built the Galaxy interactive digital directory using Angular, Node.js, and WebGL, combining CMS-driven data with 3D rendering and wayfinding.',
    technologies: ['Angular', 'Node.js', 'WebGL', 'Wayfinding'],
  },
};

export const recentWork = [
  { title: 'PolyU Souvenir', type: 'Production · E-commerce', ownership: 'Independent architecture, development & deployment', description: 'Built a complete purchasing journey with SSO, inventory, checkout and SF Express shipping integration.', outcome: 'Protected payment and inventory consistency with database transactions, locking and status validation. Added reconciliation to recover delayed or missing payment callbacks.', stack: 'Next.js / NestJS / Prisma / MySQL' },
  { title: 'ISMND 2026', type: 'Production · Conference platform', ownership: 'Independent architecture, development & deployment', description: 'Delivered attendee registration, abstract submission and review, payments, PDF documents and a separate administrative console.', outcome: 'Reduced repetitive record editing with validated Excel imports, change previews and bulk exports. Verified payment callbacks to prevent duplicate processing.', stack: 'React / Laravel / MariaDB / Docker Compose' },
  { title: 'DICOM imaging platform', type: 'Production · Medical imaging', ownership: 'Independent full-stack delivery', description: 'Connected file uploads, an external imaging service, PDF reports and interactive 3D result review in one application.', outcome: 'Engineered sequential job processing for a server limited to one task at a time, collecting and storing each result before starting the next job.', stack: 'Vue 3 / REST APIs / WebGL / File storage' },
  { title: 'AI assistant platform', type: 'Ongoing development · AI workflows', ownership: 'Technical implementation with stakeholder collaboration', description: 'Built custom frontend, backend APIs and deployment infrastructure for assistants using company knowledge and specialised workflows.', outcome: 'Integrated Dify knowledge bases and RAG, document ingestion with MarkItDown, self-hosted Whisper voice input and streaming responses.', stack: 'Dify / RAG / Whisper / MarkItDown / API integration' },
];
