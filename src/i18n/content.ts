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

export interface PhilosophyPrinciple {
  title: string;
  description: string;
}

export interface Philosophy {
  index: string;
  label: string;
  meta: string;
  readingTime: string;
  title: string;
  deck: string;
  authorLabel: string;
  author: string;
  role: string;
  dateLabel: string;
  date: string;
  tagsLabel: string;
  tags: string[];
  paragraphs: string[];
  quote: string;
  quoteBy: string;
  closing: string;
  principlesLabel: string;
  principles: PhilosophyPrinciple[];
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
  philosophy: Philosophy;
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
    nowLabel: string;
    nowMeta: string;
    nowTitle: string;
    nowDescription: string;
    nowHref: string;
    nowLinkLabel: string;
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
        'Portafolio y manifiesto de Marco Castillo, software engineer en Barrie, Canadá. Sistemas, APIs e infraestructura en la era de la IA.',
    },
    header: {
      nav: [
        { label: 'Filosofía', href: '#philosophy' },
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
      primaryCta: 'Leer el manifiesto',
      secondaryCta: 'Ver proyectos',
      cardLabel: 'Actualmente',
      cardVersion: 'v.2026',
      rows: [
        { label: 'Rol', value: 'Software Engineer' },
        { label: 'Producto', value: 'Woky · implementación de pilotos' },
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
    philosophy: {
      index: '01',
      label: 'Filosofía',
      meta: 'Notas de ingeniería · Manifiesto v1',
      readingTime: '4 min de lectura',
      title: 'El código nunca fue el trabajo.',
      deck: 'Estudiar software hoy es fácil y difícil al mismo tiempo. La IA escribe cada vez mejor; eso no vuelve menos importante el criterio de quien diseña el sistema.',
      authorLabel: 'Escrito por',
      author: 'Marco Castillo',
      role: 'Software Engineer',
      dateLabel: 'Publicado',
      date: 'Nov 2026',
      tagsLabel: 'Temas',
      tags: ['IA', 'Sistemas', 'Arquitectura', 'Criterio'],
      paragraphs: [
        'Me dijeron que no iba a conseguir trabajo. Que aprender un lenguaje nuevo no servía. Que la IA ya hace todo. Y es difícil negar una parte: la IA escribe código mejor cada día.',
        'Pero mi experiencia en QA y DevOps me enseñó otra cosa. La parte crítica del software nunca fue teclear. Fue diseñar sistemas, APIs y arquitecturas que resuelven problemas reales. El código es una consecuencia de esas decisiones, no el punto de partida.',
        'La diferencia entre una demo y un sistema seguro en producción está entre la pantalla y la IA: tú. Elegir Python o TypeScript. Express, Hono o Next. Node o Bun. REST o GraphQL. Decidir cómo modelar los datos, dónde poner los límites y qué no construir. Esas preguntas son el trabajo.',
        'Por eso uso IA para construir, pero el diseño y las decisiones son míos. Soy el diseñador. Soy el arquitecto. Aprender a planear una feature, entender su ciclo de vida y dirigir la IA hacia un objetivo es la habilidad de mi generación. No se trata de delegar el criterio; se trata de amplificarlo.',
      ],
      quote: 'La IA puede escribir el código. No puede decidir por qué existe.',
      quoteBy: 'Marco Castillo',
      closing: 'Esa es mi ventaja: no escribir más código, sino diseñar mejores sistemas.',
      principlesLabel: 'Cómo trabajo',
      principles: [
        {
          title: 'Diseñar antes de generar',
          description: 'Problema, límites y modelo primero. La IA viene después.',
        },
        {
          title: 'Elegir con contexto',
          description: 'No hay balas de plata: hay trade-offs, restricciones y consecuencias.',
        },
        {
          title: 'Entender cada línea',
          description: 'Si no puedo explicar por qué está ahí, no está terminado.',
        },
        {
          title: 'Guiar, no delegar',
          description: 'La IA acelera la ejecución; el criterio sigue siendo humano.',
        },
      ],
    },
    work: {
      index: '02',
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
      index: '03',
      label: 'Perfil',
      title: 'Curiosidad de QA, mentalidad de infraestructura.',
      note: 'Cómo pienso el software.',
      lead: 'Empecé en QA automatizando lo que nadie quería repetir. Esa costumbre me llevó a pipelines, a Terraform y a diseñar sistemas completos.',
      body: 'Mi último rol fue en Deskree, donde construí CI/CD, aprovisioné infraestructura y automaticé despliegues containerizados hasta agosto de 2026. Hoy formo parte de la implementación de Woky, un producto de ingeniería asistida por IA, donde instalo y preparo el software en los entornos de desarrollo de clientes para sus pilotos. Estudio Computer Systems Technician – Networking en Georgian College y me interesa el punto exacto donde el software, la nube y las operaciones se tocan. Me gustan los sistemas que se explican solos: pocos pasos, buenos límites y nada de magia.',
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
      index: '04',
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
      index: '05',
      label: 'Trayectoria',
      title: 'Dónde he construido.',
      note: 'Experiencia y formación.',
      nowLabel: 'Ahora',
      nowMeta: 'Woky × OrkAI',
      nowTitle: 'Implementación de Woky',
      nowDescription:
        'Instalo y preparo Woky en los sistemas de desarrollo de clientes para sus pilotos: servidor, integraciones y proveedores de IA listos para evaluar.',
      nowHref: 'https://woky.dev/es/',
      nowLinkLabel: 'Conocer Woky',
      items: [
        {
          period: 'Mayo 2026 — 28 Ago 2026',
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
      index: '06',
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
        'Portfolio and manifesto of Marco Castillo, a software engineer based in Barrie, Canada. Systems, APIs, and infrastructure in the age of AI.',
    },
    header: {
      nav: [
        { label: 'Philosophy', href: '#philosophy' },
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
      primaryCta: 'Read the manifesto',
      secondaryCta: 'See selected work',
      cardLabel: 'Currently',
      cardVersion: 'v.2026',
      rows: [
        { label: 'Role', value: 'Software Engineer' },
        { label: 'Product', value: 'Woky · pilot implementation' },
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
    philosophy: {
      index: '01',
      label: 'Philosophy',
      meta: 'Engineering notes · Manifesto v1',
      readingTime: '4 min read',
      title: 'The code was never the job.',
      deck: 'Learning software today is easy and hard at the same time. AI writes better code every day; that does not make the judgment of the person designing the system less important.',
      authorLabel: 'Written by',
      author: 'Marco Castillo',
      role: 'Software Engineer',
      dateLabel: 'Published',
      date: 'Nov 2026',
      tagsLabel: 'Topics',
      tags: ['AI', 'Systems', 'Architecture', 'Judgment'],
      paragraphs: [
        "People told me I wouldn't get the job. That learning a new language was useless. That AI does everything now. And part of that is hard to deny: AI writes better code every day.",
        'But my experience in QA and DevOps taught me something else. The critical part of software was never typing. It was designing systems, APIs, and architectures that solve real problems. Code is a consequence of those decisions, not the starting point.',
        'The difference between a demo and a secure production system sits between the screen and the AI: you. Choosing Python or TypeScript. Express, Hono, or Next. Node or Bun. REST or GraphQL. Deciding how to model data, where to draw boundaries, and what not to build. Those questions are the job.',
        "That's why I use AI to build, but the design and the decisions are mine. I am the designer. I am the architect. Learning to plan a feature, understand its lifecycle, and direct AI toward a goal is the skill of my generation. It's not about delegating judgment; it's about amplifying it.",
      ],
      quote: "AI can write the code. It can't decide why it exists.",
      quoteBy: 'Marco Castillo',
      closing: "That's my edge: not writing more code, but designing better systems.",
      principlesLabel: 'How I work',
      principles: [
        {
          title: 'Design before generating',
          description: 'Problem, boundaries, and model first. AI comes after.',
        },
        {
          title: 'Choose with context',
          description: 'No silver bullets: only trade-offs, constraints, and consequences.',
        },
        {
          title: 'Understand every line',
          description: "If I can't explain why it's there, it isn't finished.",
        },
        {
          title: "Guide, don't delegate",
          description: 'AI accelerates execution; judgment stays human.',
        },
      ],
    },
    work: {
      index: '02',
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
      index: '03',
      label: 'About',
      title: 'A QA mindset, an infrastructure habit.',
      note: 'How I think about software.',
      lead: 'I started in QA automating the work nobody wanted to repeat. That habit led me to pipelines, Terraform, and designing complete systems.',
      body: "My last role was at Deskree, where I built CI/CD, provisioned infrastructure, and automated containerized deployments until August 2026. Today I'm part of the implementation work for Woky, an AI-assisted engineering product, where I install and prepare the software in client development environments for their pilots. I'm studying Computer Systems Technician – Networking at Georgian College, and I care about the exact point where software, cloud, and operations meet. I like systems that explain themselves: few steps, clear boundaries, no magic.",
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
      index: '04',
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
      index: '05',
      label: 'Experience',
      title: "Where I've built.",
      note: 'Experience and education.',
      nowLabel: 'Now',
      nowMeta: 'Woky × OrkAI',
      nowTitle: 'Woky implementation',
      nowDescription:
        'I install and prepare Woky in client development environments for their pilots: server, integrations, and AI providers ready to evaluate.',
      nowHref: 'https://woky.dev/',
      nowLinkLabel: 'Explore Woky',
      items: [
        {
          period: 'May 2026 — Aug 28, 2026',
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
      index: '06',
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
