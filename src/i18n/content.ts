export type Lang = 'es' | 'en';

export const site = {
  name: 'Marco Castillo',
  role: 'Software Engineer',
  email: 'macd.chicho@gmail.com',
  github: 'https://github.com/MarcoJr1312',
  linkedin: 'https://www.linkedin.com/in/marco-castillo-036b21382',
  location: 'Barrie, Ontario, Canada',
  coordinates: '44.3894° N / 79.6903° W',
  domain: 'mcastillo.dev',
} as const;

export interface Project {
  index: string;
  name: string;
  year: string;
  domain: string;
  tagline: string;
  description: string;
  tags: string[];
  status: string;
  href?: string;
  linkLabel?: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  org: string;
  location: string;
  bullets: string[];
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  header: {
    nav: { label: string; href: string }[];
    menu: string;
    menuLabel: string;
    language: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    availability: string;
    titleLines: [string, string, string];
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    cardLabel: string;
    cardVersion: string;
    rows: { label: string; value: string }[];
    cardFootnote: string;
    clockLabel: string;
  };
  ticker: string[];
  work: {
    index: string;
    label: string;
    title: string;
    note: string;
    projects: Project[];
  };
  about: {
    index: string;
    label: string;
    title: string;
    note: string;
    lead: string;
    body: string;
    quote: string;
    quoteBy: string;
    facts: { label: string; value: string }[];
    portraitCaption: string;
    portraitMeta: string;
  };
  stack: {
    index: string;
    label: string;
    title: string;
    note: string;
    groups: StackGroup[];
  };
  experience: {
    index: string;
    label: string;
    title: string;
    note: string;
    items: ExperienceItem[];
  };
  contact: {
    index: string;
    label: string;
    titleLines: [string, string];
    intro: string;
    emailLabel: string;
    socialLabel: string;
    locationLabel: string;
    timeLabel: string;
    availability: string;
  };
  footer: {
    builtBy: string;
    stack: string;
    backToTop: string;
    rights: string;
  };
}

export const content: Record<Lang, SiteContent> = {
  es: {
    meta: {
      title: 'Marco Castillo — Software Engineer',
      description:
        'Portafolio de Marco Castillo, software engineer en Barrie, Canadá. Infraestructura, APIs y productos que llegan a producción.',
    },
    header: {
      nav: [
        { label: 'Proyectos', href: '#work' },
        { label: 'Perfil', href: '#about' },
        { label: 'Stack', href: '#stack' },
        { label: 'Trayectoria', href: '#experience' },
        { label: 'Contacto', href: '#contact' },
      ],
      menu: 'Menú',
      menuLabel: 'Abrir menú de navegación',
      language: 'Cambiar idioma',
      cta: 'Hablemos',
    },
    hero: {
      eyebrow: 'Software Engineer · Barrie, ON',
      availability: 'Abierto a colaboraciones',
      titleLines: ['Sistemas que', 'llegan a', 'producción.'],
      intro:
        'Soy Marco Castillo. Construyo infraestructura, APIs y productos que se despliegan solos y se mantienen de pie.',
      primaryCta: 'Ver proyectos',
      secondaryCta: 'Hablemos',
      cardLabel: 'Actualmente',
      cardVersion: 'v.2026',
      rows: [
        { label: 'Rol', value: 'DevOps & Infrastructure Co-op' },
        { label: 'Empresa', value: 'Deskree Inc.' },
        { label: 'Base', value: 'Barrie, ON · Canadá' },
        { label: 'Estudiando', value: 'Computer Systems Technician' },
      ],
      cardFootnote: 'Construyendo mcastillo.dev y su red de subdominios.',
      clockLabel: 'Hora local',
    },
    ticker: [
      'Infrastructure',
      'APIs',
      'Cloud',
      'CI/CD',
      'QA Automation',
      'Data',
      'Python',
      'Terraform',
    ],
    work: {
      index: '01',
      label: 'Trabajo seleccionado',
      title: 'Cosas que ya están en pie.',
      note: 'Tres proyectos. Del frontend a la infraestructura.',
      projects: [
        {
          index: '01',
          name: 'Haven',
          year: '2026',
          domain: 'haven.mcastillo.dev',
          tagline: 'E-commerce full-stack sobre AWS',
          description:
            'Plataforma de microservicios con dos APIs FastAPI, frontend React y autenticación Cognito. Infraestructura completa en Terraform, contenedores Docker y CI/CD con detección de cambios por ruta.',
          tags: ['Python', 'FastAPI', 'React', 'AWS', 'Terraform'],
          status: 'Código abierto',
          href: 'https://github.com/MarcoJr1312/ecommerce-infra',
          linkLabel: 'Ver repositorio',
        },
        {
          index: '02',
          name: 'AI Business Analyst',
          year: '2026',
          domain: 'aba.mcastillo.dev',
          tagline: 'De datos sucios a decisiones',
          description:
            'Estudio de limpieza y análisis de datos con React y FastAPI. Convierte archivos desordenados en un flujo guiado de validación, perfilado y visualización.',
          tags: ['React', 'FastAPI', 'Python', 'Data'],
          status: 'Producto privado',
        },
        {
          index: '03',
          name: 'mcastillo.dev',
          year: '2026',
          domain: 'mcastillo.dev',
          tagline: 'Este sitio. Sin plantillas.',
          description:
            'Landing bilingüe construida desde cero con Astro, Tailwind CSS y TypeScript. Tipografía editorial, contenido tipado y una arquitectura pensada para alojar cada proyecto en su propio subdominio.',
          tags: ['Astro', 'Tailwind', 'TypeScript'],
          status: 'Estás aquí',
        },
      ],
    },
    about: {
      index: '02',
      label: 'Perfil',
      title: 'Curiosidad de QA, mentalidad de infraestructura.',
      note: 'Cómo pienso el software.',
      lead: 'Empecé en QA automatizando lo que nadie quería repetir. Esa costumbre me llevó a pipelines, a Terraform y a diseñar sistemas completos.',
      body: 'Hoy trabajo en Deskree construyendo CI/CD, aprovisionando infraestructura y automatizando despliegues containerizados. Estudio Computer Systems Technician – Networking en Georgian College y me interesa el punto exacto donde el software, la nube y las operaciones se tocan. Me gustan los sistemas que se explican solos: pocos pasos, buenos límites y nada de magia.',
      quote: 'La mejor infraestructura es la que no tienes que pensar.',
      quoteBy: 'Mi regla de trabajo',
      facts: [
        { label: 'Base', value: 'Barrie, Ontario' },
        { label: 'Idiomas', value: 'Español nativo · Inglés fluido' },
        { label: 'Educación', value: 'Georgian College · 2026' },
        { label: 'Certificación', value: 'Google Data Analytics · 2026' },
      ],
      portraitCaption: 'Marco Castillo / Software Engineer',
      portraitMeta: 'Barrie, ON · 44.3894° N',
    },
    stack: {
      index: '03',
      label: 'Stack',
      title: 'Herramientas, no logos.',
      note: 'Lo que uso para llevar código a producción.',
      groups: [
        { label: 'Lenguajes', items: ['Python', 'TypeScript', 'SQL'] },
        { label: 'Backend', items: ['FastAPI', 'REST APIs', 'Microservicios'] },
        {
          label: 'Cloud & DevOps',
          items: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Ansible', 'Hetzner'],
        },
        { label: 'Datos', items: ['DynamoDB', 'SQL', 'Modelado de datos'] },
        { label: 'QA & Automatización', items: ['Playwright', 'Testing E2E', 'n8n'] },
        { label: 'Entorno', items: ['Git', 'Linux', 'Jira', 'Linear'] },
      ],
    },
    experience: {
      index: '04',
      label: 'Trayectoria',
      title: 'Dónde he construido.',
      note: 'Experiencia y formación.',
      items: [
        {
          period: 'May 2026 — Presente',
          role: 'DevOps & Infrastructure Co-op',
          org: 'Deskree Inc.',
          location: 'Barrie, ON · Híbrido',
          bullets: [
            'Pipelines CI/CD en GitHub Actions para construir, publicar y desplegar contenedores con zero-downtime.',
            'Infraestructura cloud-agnostic en Hetzner con Terraform y Terraform Cloud.',
            'Playbooks Ansible modulares para configuración y post-provisioning.',
          ],
        },
        {
          period: 'Jul 2023 — Abr 2026',
          role: 'QA Engineer',
          org: 'Deskree Inc.',
          location: 'Barrie, ON · Híbrido',
          bullets: [
            'Automatización de regresión y validación con Python, reduciendo trabajo manual repetitivo.',
            'Testing E2E con Playwright MCP en flujos críticos y casos borde.',
            'Validación de integraciones MCP en Cursor, Claude Desktop, ChatGPT y agentes personalizados.',
          ],
        },
        {
          period: 'Dic 2026 (esperado)',
          role: 'Computer Systems Technician – Networking',
          org: 'Georgian College',
          location: 'Barrie, ON',
          bullets: [
            'Cloud computing, bases de datos, routing & switching, administración Linux/Windows.',
            'Google Data Analytics Professional Certificate · 2026.',
          ],
        },
      ],
    },
    contact: {
      index: '05',
      label: 'Contacto',
      titleLines: ['Hablemos de', 'lo que sigue.'],
      intro:
        'Tienes un proyecto en mente, una vacante o simplemente curiosidad por cómo trabajo. Escríbeme.',
      emailLabel: 'Envíame un correo',
      socialLabel: 'En otros lugares',
      locationLabel: 'Base',
      timeLabel: 'Hora local',
      availability: 'Abierto a colaboraciones',
    },
    footer: {
      builtBy: 'Diseñado y construido por Marco Castillo.',
      stack: 'Astro · Tailwind CSS · TypeScript',
      backToTop: 'Volver arriba',
      rights: '© 2026 Marco Castillo',
    },
  },
  en: {
    meta: {
      title: 'Marco Castillo — Software Engineer',
      description:
        'Portfolio of Marco Castillo, a software engineer based in Barrie, Canada. Infrastructure, APIs, and products that make it to production.',
    },
    header: {
      nav: [
        { label: 'Work', href: '#work' },
        { label: 'About', href: '#about' },
        { label: 'Stack', href: '#stack' },
        { label: 'Experience', href: '#experience' },
        { label: 'Contact', href: '#contact' },
      ],
      menu: 'Menu',
      menuLabel: 'Open navigation menu',
      language: 'Switch language',
      cta: "Let's talk",
    },
    hero: {
      eyebrow: 'Software Engineer · Barrie, ON',
      availability: 'Open to collaborations',
      titleLines: ['Systems that', 'make it to', 'production.'],
      intro:
        "I'm Marco Castillo. I build infrastructure, APIs, and products that deploy themselves and stay up.",
      primaryCta: 'Selected work',
      secondaryCta: "Let's talk",
      cardLabel: 'Currently',
      cardVersion: 'v.2026',
      rows: [
        { label: 'Role', value: 'DevOps & Infrastructure Co-op' },
        { label: 'Company', value: 'Deskree Inc.' },
        { label: 'Based in', value: 'Barrie, ON · Canada' },
        { label: 'Studying', value: 'Computer Systems Technician' },
      ],
      cardFootnote: 'Building mcastillo.dev and its subdomain network.',
      clockLabel: 'Local time',
    },
    ticker: [
      'Infrastructure',
      'APIs',
      'Cloud',
      'CI/CD',
      'QA Automation',
      'Data',
      'Python',
      'Terraform',
    ],
    work: {
      index: '01',
      label: 'Selected work',
      title: 'Things already standing.',
      note: 'Three projects. From frontend to infrastructure.',
      projects: [
        {
          index: '01',
          name: 'Haven',
          year: '2026',
          domain: 'haven.mcastillo.dev',
          tagline: 'Full-stack e-commerce on AWS',
          description:
            'A microservices platform with two FastAPI services, a React frontend, and Cognito authentication. Full infrastructure in Terraform, Docker containers, and CI/CD with path-based change detection.',
          tags: ['Python', 'FastAPI', 'React', 'AWS', 'Terraform'],
          status: 'Open source',
          href: 'https://github.com/MarcoJr1312/ecommerce-infra',
          linkLabel: 'View repository',
        },
        {
          index: '02',
          name: 'AI Business Analyst',
          year: '2026',
          domain: 'aba.mcastillo.dev',
          tagline: 'From messy data to decisions',
          description:
            'A data cleaning and analysis studio built with React and FastAPI. It turns messy files into a guided flow of validation, profiling, and visualization.',
          tags: ['React', 'FastAPI', 'Python', 'Data'],
          status: 'Private product',
        },
        {
          index: '03',
          name: 'mcastillo.dev',
          year: '2026',
          domain: 'mcastillo.dev',
          tagline: 'This site. No templates.',
          description:
            'A bilingual landing page built from scratch with Astro, Tailwind CSS, and TypeScript. Editorial typography, typed content, and an architecture designed to host each project on its own subdomain.',
          tags: ['Astro', 'Tailwind', 'TypeScript'],
          status: 'You are here',
        },
      ],
    },
    about: {
      index: '02',
      label: 'About',
      title: 'A QA mindset, an infrastructure habit.',
      note: 'How I think about software.',
      lead: 'I started in QA automating the work nobody wanted to repeat. That habit led me to pipelines, Terraform, and designing complete systems.',
      body: "Today I work at Deskree building CI/CD, provisioning infrastructure, and automating containerized deployments. I'm studying Computer Systems Technician – Networking at Georgian College, and I care about the exact point where software, cloud, and operations meet. I like systems that explain themselves: few steps, clear boundaries, no magic.",
      quote: "The best infrastructure is the one you don't have to think about.",
      quoteBy: 'My working rule',
      facts: [
        { label: 'Based in', value: 'Barrie, Ontario' },
        { label: 'Languages', value: 'Spanish native · English fluent' },
        { label: 'Education', value: 'Georgian College · 2026' },
        { label: 'Certification', value: 'Google Data Analytics · 2026' },
      ],
      portraitCaption: 'Marco Castillo / Software Engineer',
      portraitMeta: 'Barrie, ON · 44.3894° N',
    },
    stack: {
      index: '03',
      label: 'Stack',
      title: 'Tools, not logos.',
      note: 'What I use to get code into production.',
      groups: [
        { label: 'Languages', items: ['Python', 'TypeScript', 'SQL'] },
        { label: 'Backend', items: ['FastAPI', 'REST APIs', 'Microservices'] },
        {
          label: 'Cloud & DevOps',
          items: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Ansible', 'Hetzner'],
        },
        { label: 'Data', items: ['DynamoDB', 'SQL', 'Data modeling'] },
        { label: 'QA & Automation', items: ['Playwright', 'E2E testing', 'n8n'] },
        { label: 'Environment', items: ['Git', 'Linux', 'Jira', 'Linear'] },
      ],
    },
    experience: {
      index: '04',
      label: 'Experience',
      title: "Where I've built.",
      note: 'Experience and education.',
      items: [
        {
          period: 'May 2026 — Present',
          role: 'DevOps & Infrastructure Co-op',
          org: 'Deskree Inc.',
          location: 'Barrie, ON · Hybrid',
          bullets: [
            'CI/CD pipelines in GitHub Actions to build, push, and deploy containers with zero downtime.',
            'Cloud-agnostic infrastructure on Hetzner with Terraform and Terraform Cloud.',
            'Modular Ansible playbooks for configuration and post-provisioning.',
          ],
        },
        {
          period: 'Jul 2023 — Apr 2026',
          role: 'QA Engineer',
          org: 'Deskree Inc.',
          location: 'Barrie, ON · Hybrid',
          bullets: [
            'Regression and validation automation with Python, reducing repetitive manual effort.',
            'End-to-end testing with Playwright MCP across critical journeys and edge cases.',
            'MCP integration validation across Cursor, Claude Desktop, ChatGPT, and custom agents.',
          ],
        },
        {
          period: 'Dec 2026 (expected)',
          role: 'Computer Systems Technician – Networking',
          org: 'Georgian College',
          location: 'Barrie, ON',
          bullets: [
            'Cloud computing, databases, routing & switching, Linux/Windows administration.',
            'Google Data Analytics Professional Certificate · 2026.',
          ],
        },
      ],
    },
    contact: {
      index: '05',
      label: 'Contact',
      titleLines: ["Let's talk about", "what's next."],
      intro:
        'You have a project in mind, a role to fill, or you are simply curious about how I work. Write to me.',
      emailLabel: 'Send me an email',
      socialLabel: 'Elsewhere',
      locationLabel: 'Based in',
      timeLabel: 'Local time',
      availability: 'Open to collaborations',
    },
    footer: {
      builtBy: 'Designed and built by Marco Castillo.',
      stack: 'Astro · Tailwind CSS · TypeScript',
      backToTop: 'Back to top',
      rights: '© 2026 Marco Castillo',
    },
  },
};
