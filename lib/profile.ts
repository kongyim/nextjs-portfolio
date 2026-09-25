export const linkedin = 'https://www.linkedin.com/in/kong-yim-7a986076/';

// Project descriptions grounded in the supplied résumé; no inferred results or metrics.
export const projectContext: Record<string, { description: string; technologies: string[] }> = {
  'lincoln-dealers': {
    description: 'Delivered the Lincoln showroom system, bringing together a 3D rendering wall, a Unity interactive table, and a monitoring application connected to 16 web cameras.',
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
  { title: 'PolyU Souvenir', type: 'E-commerce platform', description: 'A full-stack platform spanning SSO, payments, product and stock management, admin tooling, and SF Express integration.', stack: 'Next.js / NestJS / Prisma / MySQL' },
  { title: 'Enterprise AI assistant', type: 'AI & voice interfaces', description: 'An enterprise portal combining AI-assisted workflows with voice input through a self-hosted Whisper speech-to-text service.', stack: 'PostgreSQL / Dify / Whisper' },
  { title: 'DICOM viewer', type: '3D web application', description: 'A Vue 3 application for DICOM uploads, report generation, and medical report display, including WebGL 3D model output.', stack: 'Vue 3 / REST APIs / WebGL' },
];
