import type { Lang } from './content';

export interface DecisionRecord {
  id: string;
  title: string;
  context: string;
  decision: string;
  tradeoff: string;
}

export interface CaseStudySection {
  id: string;
  index: string;
  label: string;
  title: string;
}

export interface ProjectCaseStudy {
  slug: string;
  seoTitle: string;
  kicker: string;
  name: string;
  year: string;
  status?: string;
  title: string;
  lead: string;
  meta: { label: string; value: string }[];
  abstract: string;
  toc: { label: string; href: string }[];
  problem: CaseStudySection & {
    body: string[];
    invariants: { title: string; body: string }[];
  };
  principles: CaseStudySection & {
    body: string;
    approach: { title: string; detail: string }[];
    items: { title: string; body: string }[];
  };
  architecture: CaseStudySection & {
    body: string[];
    flow: { label: string; detail: string }[];
    caption: string;
    note: string;
    diagramTitle: string;
    diagramDesc: string;
  };
  decisions: CaseStudySection & {
    intro: string;
    labels: { context: string; decision: string; tradeoff: string };
    items: DecisionRecord[];
  };
  infrastructure: CaseStudySection & {
    body: string[];
    lifecycle: { label: string; detail: string }[];
    terraform: {
      label: string;
      title: string;
      intro: string;
      readOnly: string;
      note: string;
    };
    workflows: {
      label: string;
      title: string;
      intro: string;
      previous: string;
      next: string;
      triggerLabel: string;
      stepsLabel: string;
      items: {
        file: string;
        name: string;
        title: string;
        trigger: string;
        body: string;
        steps: string[];
      }[];
    };
    caption: string;
    note: string;
    diagramTitle: string;
    diagramDesc: string;
  };
  localRepo: {
    label: string;
    title: string;
    body: string;
    cloneLabel: string;
    cloneCommand: string;
    copyLabel: string;
    copiedLabel: string;
    note: string;
    repoLabel: string;
    repoUrl: string;
  };
  learnings: CaseStudySection & {
    items: { title: string; body: string }[];
  };
  next: CaseStudySection & {
    items: string[];
  };
  labels: {
    backToWork: string;
    toc: string;
    figure: string;
    approach: string;
    invariants: string;
    lifecycle: string;
  };
}

const triplannerEs: ProjectCaseStudy = {
  slug: 'triplanner',
  seoTitle: 'Triplanner — Caso de estudio',
  kicker: 'Caso de estudio · 01',
  name: 'Triplanner',
  year: '2026',
  title: 'Planear un viaje es un problema de estado compartido.',
  lead: 'Triplanner nació de una frustración concreta: cuando cuatro personas planean el mismo viaje, la información se reparte entre chats, hojas de cálculo y capturas. Construí una app que mantiene el itinerario, el presupuesto y los documentos en un solo lugar, con permisos explícitos y sugerencias de IA que no deciden por nadie.',
  meta: [
    { label: 'Rol', value: 'Producto, frontend, backend e infraestructura' },
    { label: 'Año', value: '2026' },
    {
      label: 'Stack',
      value: 'Next.js · GraphQL · Postgres · MongoDB · Python · Docker · Terraform',
    },
    { label: 'Repo', value: 'Público · MarcoJr1312/local_triplanner' },
  ],
  abstract:
    'La versión actual corre entera en localhost: tres procesos, dos bases de datos y un agente. La infraestructura AWS existe como stack efímero: se levanta bajo demanda y se destruye tras 30 minutos sin tráfico. Elegí esa forma porque el problema interesante no era desplegar, sino decidir qué merece persistir, qué se puede reconstruir y dónde vive cada verdad.',
  toc: [
    { label: 'El problema', href: '#problema' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Arquitectura', href: '#arquitectura' },
    { label: 'Decisiones', href: '#decisiones' },
    { label: 'Infraestructura', href: '#infraestructura' },
    { label: 'Aprendizajes', href: '#aprendizajes' },
    { label: 'Qué sigue', href: '#siguientes' },
  ],
  problem: {
    id: 'problema',
    index: '01',
    label: 'El problema',
    title: 'El viaje no cabe en un chat.',
    body: [
      'Un viaje compartido tiene tres características que rompen las herramientas genéricas: el estado cambia muchas veces, varias personas necesitan escribir sobre él y no todos deben ver lo mismo.',
      'Una hoja de cálculo resuelve la tabla, pero no los permisos, ni la conversación, ni los archivos. Un chat resuelve la conversación, pero pierde la estructura. Un documento compartido resuelve la edición, pero no el modelo de datos.',
      'Mi objetivo no fue clonar un planificador. Fue definir un modelo donde el viaje es la unidad de acceso, cada actividad tiene un lugar y un horario, y cada archivo pertenece a una actividad con una audiencia explícita.',
    ],
    invariants: [
      {
        title: 'El viaje es la frontera de seguridad',
        body: 'Cada lectura y cada mutación comprueban membresía. No hay endpoints "públicos" que devuelvan datos de un viaje.',
      },
      {
        title: 'Una fuente de verdad por dato',
        body: 'Postgres guarda lo relacional y lo que evoluciona; DynamoDB solo sirve el catálogo de lugares, que es lectura intensiva.',
      },
      {
        title: 'Los binarios no viajan por la API',
        body: 'Los adjuntos se sirven con URLs HMAC de vida corta, y la visibilidad la elige quien sube el archivo.',
      },
      {
        title: 'La IA propone, la persona decide',
        body: 'El agente tiene herramientas de solo lectura. No crea, no edita y no borra.',
      },
    ],
  },
  principles: {
    id: 'proceso',
    index: '02',
    label: 'Proceso de pensamiento',
    title: 'Qué decidí antes de escribir código.',
    body: 'Antes del esquema escribí las reglas que no quería romper. Después ordené el trabajo para que cada capa pudiera probarse sola. Estas dos listas fueron el filtro de todo lo que vino después.',
    approach: [
      {
        title: 'Modelar el viaje',
        detail:
          'Entidades, dueños y reglas de acceso antes de cualquier pantalla. Si un dato no tenía dueño claro, el modelo estaba mal.',
      },
      {
        title: 'Definir el contrato',
        detail:
          'Esquema GraphQL y códigos de error estables. El cliente pide lo que muestra; el servidor decide qué puede devolver.',
      },
      {
        title: 'Construir el camino feliz',
        detail:
          'Crear viaje, invitar, añadir actividad, adjuntar archivo. Primero sin IA, sin tiempo real y sin AWS.',
      },
      {
        title: 'Añadir la IA al final',
        detail: 'El agente lee un producto que ya funciona. Si se apaga, la app sigue siendo útil.',
      },
      {
        title: 'Hacerlo repetible',
        detail:
          'Docker, migraciones idempotentes, seed y pruebas en verde antes de tocar infraestructura.',
      },
    ],
    items: [
      {
        title: 'Empezar por los límites, no por las pantallas',
        body: 'Definí las entidades y sus dueños: usuario, viaje, día, actividad, adjunto. Cuando una pantalla pedía un dato sin dueño claro, el problema era el modelo, no la pantalla.',
      },
      {
        title: 'Diseñar para el peor caso: cuatro personas y un archivo',
        body: 'Los permisos no son una capa añadida al final; están en la forma del dato. Cada adjunto conoce a sus espectadores.',
      },
      {
        title: 'Mantener el navegador ignorante',
        body: 'El cliente nunca ve URLs internas ni claves. Next.js es el único origen público y hace de proxy.',
      },
      {
        title: 'Separar lo que cambia de lo que se lee',
        body: 'El catálogo de lugares cambia poco y se lee mucho; el itinerario cambia constantemente. Dos motores, dos ritmos.',
      },
      {
        title: 'Dejar la infraestructura en un estado reversible',
        body: 'Un stack que se puede destruir sin drama obliga a separar datos desechables de artefactos que sobreviven.',
      },
    ],
  },
  architecture: {
    id: 'arquitectura',
    index: '03',
    label: 'Arquitectura',
    title: 'Tres procesos, dos bases, un solo origen.',
    body: [
      'El navegador habla únicamente con Next.js. Next proxya /api/graphql hacia el servidor GraphQL, /api/agent/* hacia el servicio de agente y reescribe /uploads/* hacia el almacenamiento. La API habla con Postgres, DynamoDB, S3 y los servicios externos. El agente lee el contexto del viaje por endpoints internos autenticados con un token compartido y consulta pgvector directamente en Postgres.',
      'Esa forma reduce la superficie pública a un proceso: las claves de HasData, Resend y DeepSeek viven en el servidor, y ninguna variable NEXT_PUBLIC_* lleva secretos.',
    ],
    flow: [
      {
        label: 'Navegador',
        detail: 'Carga la app y obtiene un ID token de Firebase.',
      },
      {
        label: 'Next.js',
        detail: 'Valida la sesión, renderiza en servidor y proxya la petición.',
      },
      {
        label: 'GraphQL API',
        detail: 'Verifica el token, comprueba membresía y resuelve el dato.',
      },
      {
        label: 'Datos',
        detail: 'Postgres para el viaje; DynamoDB solo si hay búsqueda de lugares.',
      },
    ],
    caption:
      'Fig. 01 — Arquitectura de ejecución. El bus de la derecha agrupa las salidas de la API; el agente usa DeepSeek y lee los embeddings directamente de Postgres.',
    note: 'Firebase Auth se usa en el cliente para obtener el ID token; la API lo verifica con el Admin SDK. El agente consulta pgvector en Postgres para recuperar contexto por similitud; los binarios se sirven por URLs firmadas, no por el proxy.',
    diagramTitle: 'Diagrama de arquitectura de Triplanner',
    diagramDesc:
      'El navegador habla con Next.js, que hace de único origen público. Next.js proxya /api/graphql hacia el servidor GraphQL en Bun, /api/agent hacia el agente en Python y reescribe /uploads/* hacia el almacenamiento. La API lee y escribe en Postgres con pgvector, DynamoDB, S3 o disco local, y llama a Firebase, HasData y Resend. El agente usa DeepSeek, lee el contexto del viaje a través de la API y consulta los embeddings en Postgres directamente.',
  },
  decisions: {
    id: 'decisiones',
    index: '04',
    label: 'Decisiones',
    title: 'Siete decisiones y su precio.',
    intro:
      'Cada elección tiene un costo. Estas son las que tomé, por qué las tomé y qué acepté a cambio. Ninguna es gratuita; varias las volvería a tomar igual.',
    labels: { context: 'Contexto', decision: 'Decisión', tradeoff: 'Trade-off' },
    items: [
      {
        id: 'D1',
        title: 'Next.js como único origen público',
        context:
          'El navegador necesitaba hablar con dos servicios y con archivos, sin exponer URLs internas ni claves.',
        decision:
          'Route handlers que actúan de proxy. El cliente solo conoce /api/graphql, /api/agent/* y /uploads/*.',
        tradeoff:
          'Un salto extra de red y un proceso que puede convertirse en cuello de botella. A cambio, una sola superficie que autenticar, cachear y observar.',
      },
      {
        id: 'D2',
        title: 'GraphQL entre el cliente y Postgres',
        context:
          'La app tiene muchas vistas sobre el mismo viaje: día, calendario, presupuesto, miembros. REST habría multiplicado endpoints casi idénticos.',
        decision:
          'Un esquema tipado con graphql-yoga sobre Bun; el cliente pide exactamente lo que muestra cada pantalla.',
        tradeoff:
          'Más disciplina en el servidor (N+1, límites de profundidad) y un caching menos directo que REST. A cambio, un contrato explícito y menos endpoints ad hoc.',
      },
      {
        id: 'D3',
        title: 'Postgres como fuente de verdad; DynamoDB solo para el catálogo',
        context:
          'El catálogo de lugares es lectura intensiva y viene de HasData; el itinerario es relacional y cambia todo el tiempo.',
        decision:
          'Separar por patrón de acceso, no por moda: Postgres para el viaje, DynamoDB para el catálogo con cache-first.',
        tradeoff:
          'Dos motores que operar y ningún join entre ellos. A cambio, cada uno hace lo que sabe hacer y el catálogo no compite con las escrituras del itinerario.',
      },
      {
        id: 'D4',
        title: 'pgvector en lugar de una base vectorial aparte',
        context:
          'El agente necesitaba recuperar contexto del viaje por similitud, sin añadir otro servicio a un stack que ya tenía tres.',
        decision: 'Guardar los embeddings en Postgres con pgvector, junto al dato que describen.',
        tradeoff:
          'Menos herramientas especializadas y afinado de índices manual. A cambio, un servicio menos y consistencia con el resto del viaje.',
      },
      {
        id: 'D5',
        title: 'Una interfaz de almacenamiento, dos implementaciones',
        context:
          'En local no tiene sentido depender de S3; en AWS no tiene sentido escribir en el disco del contenedor.',
        decision:
          'Una capa Storage con implementación local y S3, y URLs HMAC de vida corta para los adjuntos.',
        tradeoff:
          'Una indirección más y pruebas en dos entornos. A cambio, el mismo código corre en localhost y en Fargate sin cambios.',
      },
      {
        id: 'D6',
        title: 'El agente como servicio separado en Python',
        context: 'El ecosistema de IA vive en Python; el resto del producto en TypeScript.',
        decision:
          'Un servicio FastAPI independiente, con herramientas de solo lectura y un token interno compartido.',
        tradeoff:
          'Otro despliegue, otro runtime y otro failure domain. A cambio, aíslo dependencias de ML y puedo apagar la IA sin tumbar el producto.',
      },
      {
        id: 'D7',
        title: 'Stack AWS efímero con control plane',
        context: 'Un demo público no debería costar como producción las 24 horas.',
        decision:
          'La aplicación se levanta bajo demanda y se destruye tras 30 minutos sin tráfico. Un control plane mínimo (Lambdas, EventBridge, estado, ECR) sobrevive para poder despertarla.',
        tradeoff:
          'Cold start de 8–12 minutos y pérdida de datos aceptada. A cambio, el costo se concentra en las horas en que alguien usa el producto.',
      },
    ],
  },
  infrastructure: {
    id: 'infraestructura',
    index: '05',
    label: 'Infraestructura',
    title: 'Lo que se puede destruir no se diseña igual.',
    body: [
      'El stack efímero separa dos mundos. El control plane es pequeño y permanente: recibe la orden de despertar, comprueba si hay tráfico y guarda el estado de Terraform. El stack de aplicación es desechable: VPC, RDS, DynamoDB, S3, ALB con WAF y tres servicios en ECS Fargate.',
      'El ciclo es explícito: se aplica Terraform con desired_count=1, se corren migraciones y seed, se actualiza el CNAME de Cloudflare al nuevo ALB y se marca el estado como awake. Cuando la Lambda deja de ver tráfico durante 30 minutos, dispara destroy y el estado vuelve a asleep.',
    ],
    lifecycle: [
      {
        label: 'Despertar',
        detail: 'POST /wake → repository_dispatch → terraform apply + migraciones + seed.',
      },
      {
        label: 'Servir',
        detail: 'Cloudflare apunta al ALB; WAF filtra; ECS corre web, API y agente.',
      },
      {
        label: 'Dormir',
        detail: 'Sleep-check ve 30 minutos sin tráfico y dispara terraform destroy.',
      },
      {
        label: 'Sobrevivir',
        detail: 'Estado, Lambdas, ECR, ACM y el secreto de GitHub siguen en pie.',
      },
    ],
    terraform: {
      label: 'Terraform · aws-infra',
      title: 'Terraform',
      intro:
        'Vista de solo lectura de aws-infra, el único directorio que aplica y destruye el stack. Solo se muestran carpetas y archivos: no se ejecutan planes, no se exponen valores y no se toca AWS.',
      readOnly: 'Solo lectura',
      note: 'Haz clic en una carpeta para expandirla. Es una instantánea de la estructura del repositorio, sin contenido de archivos.',
    },
    workflows: {
      label: 'GitHub Actions · 7 workflows',
      title: 'Cada workflow tiene su disparador y su permiso.',
      intro:
        'En aws_triplanner, los pipelines de aplicación prueban cada cambio y solo publican imágenes desde main. Wake y sleep son los únicos que aplican o destruyen Terraform, y comparten grupo de concurrencia para no pisarse. Elige una pestaña o desliza el panel para ver el siguiente.',
      previous: 'Workflow anterior',
      next: 'Workflow siguiente',
      triggerLabel: 'Disparador',
      stepsLabel: 'Pasos clave',
      items: [
        {
          file: 'web.yml',
          name: 'Web',
          title: 'Web · probar y publicar',
          trigger: 'push · pull_request · tags v* · manual',
          body: 'Valida el frontend en cada cambio y publica la imagen solo desde main. El test corre con Bun; el publish asume el rol OIDC, entra a ECR y construye para linux/amd64, que es lo que espera Fargate.',
          steps: ['bun audit', 'tsc --noEmit', 'bun test', 'build → triplanner/web'],
        },
        {
          file: 'api.yml',
          name: 'API',
          title: 'API · probar y publicar',
          trigger: 'push · pull_request · tags v* · manual',
          body: 'El test levanta Postgres con pgvector, DynamoDB Local y S3 sobre LocalStack para correr la suite contra servicios reales. Desde main, publica triplanner/api con tag por SHA y latest.',
          steps: [
            'Postgres 17 + pgvector',
            'DynamoDB Local',
            'LocalStack S3',
            'bun test',
            'build → triplanner/api',
          ],
        },
        {
          file: 'agent.yml',
          name: 'Agent',
          title: 'Agente · probar y publicar',
          trigger: 'push · pull_request · tags v* · manual',
          body: 'Prueba el agente en Python 3.12 con uv y una base pgvector. pip-audit corta el pipeline salvo por cuatro advisories de chromadb que todavía no tienen fix upstream; el publish construye triplanner/agent.',
          steps: ['uv sync --frozen', 'pip-audit', 'test_m2.py', 'build → triplanner/agent'],
        },
        {
          file: 'compose-smoke.yml',
          name: 'Compose',
          title: 'Compose smoke · el stack completo',
          trigger: 'push · pull_request · manual',
          body: 'Es el único workflow que arranca los tres servicios juntos. Construye las imágenes, levanta docker-compose.ci.yml, espera los health checks de Postgres, DynamoDB, API, agente y web, y corre el smoke test de extremo a extremo.',
          steps: ['build 3 imágenes', 'docker compose up', 'health checks', 'scripts/smoke.sh'],
        },
        {
          file: 'wake.yml',
          name: 'Wake',
          title: 'Wake · despertar el stack',
          trigger: 'repository_dispatch: wake · manual',
          body: 'Lo dispara POST /wake. Aplica Terraform con desired_count=1, apunta el CNAME de Cloudflare al ALB nuevo, corre migraciones y seed como tareas ECS de una sola vez y espera un 200 en /login antes de marcar el stack como awake. Si algo falla, deja el estado en error.',
          steps: [
            'OIDC → AWS',
            'terraform apply',
            'CNAME → ALB',
            'migrate + seed',
            'health check',
            'estado: awake',
          ],
        },
        {
          file: 'sleep.yml',
          name: 'Sleep',
          title: 'Sleep · destruir el stack',
          trigger: 'repository_dispatch: sleep · manual',
          body: 'Lo dispara el sleep-check tras 30 minutos sin tráfico. Destruye el stack de aplicación, mueve el hostname a la página de estado y marca asleep. Comparte con wake el grupo de concurrencia triplanner-aws, así que nunca corren a la vez.',
          steps: ['OIDC → AWS', 'terraform destroy', 'hostname → status page', 'estado: asleep'],
        },
        {
          file: 'status-page.yml',
          name: 'Status',
          title: 'Status page · lo que queda en línea',
          trigger: 'push a main · manual',
          body: 'Publica la página estática que responde cuando el stack duerme. Wrangler la sube a Cloudflare Pages, fuera del stack de AWS que se destruye.',
          steps: ['wrangler pages deploy', 'Cloudflare Pages'],
        },
      ],
    },
    caption:
      'Fig. 02 — Stack efímero. Arriba, lo que nunca se destruye; abajo, lo que se reconstruye en cada despertar.',
    note: 'RDS es Single-AZ a propósito: menos tiempo de arranque, sin garantía de alta disponibilidad. El DNS del ALB cambia en cada apply, así que el workflow actualiza Cloudflare.',
    diagramTitle: 'Diagrama del stack AWS efímero',
    diagramDesc:
      'El control plane siempre activo contiene GitHub Actions, la API de wake, EventBridge con la Lambda de sleep-check y el estado en S3 con ECR y ACM. El stack efímero contiene Cloudflare, el ALB con WAF, ECS Fargate con web, API y agente, y RDS, DynamoDB y S3, que se destruyen al dormir.',
  },
  localRepo: {
    label: 'Demo local',
    title: 'También puedes correrlo en tu máquina.',
    body: 'El stack AWS efímero tarda entre 8 y 12 minutos en despertar. Si no quieres esperar, local_triplanner empaqueta la misma app con Docker Compose: Next.js, GraphQL sobre Bun, el agente en Python, Postgres y MongoDB, con datos sembrados y sin cuentas externas.',
    cloneLabel: 'Clona el repositorio',
    cloneCommand: 'git clone https://github.com/MarcoJr1312/local_triplanner.git',
    copyLabel: 'Copiar',
    copiedLabel: 'Copiado',
    note: 'Después entra en la carpeta, corre docker compose up --build y abre localhost:3000/login. Elige Demo o Demo Friend.',
    repoLabel: 'Abrir local_triplanner en GitHub',
    repoUrl: 'https://github.com/MarcoJr1312/local_triplanner',
  },
  learnings: {
    id: 'aprendizajes',
    index: '06',
    label: 'Aprendizajes',
    title: 'Lo que me costó y lo que haría distinto.',
    items: [
      {
        title: 'Migrar el motor no es cambiar una cadena de conexión',
        body: 'Pasar de SQLite con FTS5 a Postgres + DynamoDB obligó a reescribir repositorios, migraciones y pruebas. Lo hice por partes, con la suite en verde en cada paso.',
      },
      {
        title: 'El entorno de desarrollo también tiene arquitectura',
        body: 'Correr next build mientras next dev sirve el mismo .next rompe los chunks. Separar artefactos y limpiar al cambiar de runtime se volvió parte del flujo.',
      },
      {
        title: 'La infraestructura efímera tiene un costo escondido',
        body: 'El cold start no es solo espera: es una experiencia de producto. Si el demo tarda diez minutos en despertar, la primera impresión ya está decidida.',
      },
      {
        title: 'Los permisos se diseñan en el dato',
        body: 'Cuando la visibilidad de un archivo es una columna y no una capa, es mucho más difícil olvidarla en una consulta nueva.',
      },
    ],
  },
  next: {
    id: 'siguientes',
    index: '07',
    label: 'Qué sigue',
    title: 'La siguiente versión.',
    items: [
      'Terminar el stack AWS efímero y volver a conectar el botón de deploy cuando el flujo de wake sea estable.',
      'Reducir el rol OIDC de AdministratorAccess a los servicios exactos que toca cada workflow.',
      'Añadir un arnés de evaluación para el agente: comparar sugerencias contra un conjunto de viajes reales.',
      'Medir y optimizar el tiempo de despertar antes de abrirlo al público.',
    ],
  },
  labels: {
    backToWork: 'Volver a proyectos',
    toc: 'En esta página',
    figure: 'Figura',
    approach: 'Cómo lo abordé',
    invariants: 'Reglas que no quería romper',
    lifecycle: 'Ciclo de vida',
  },
};

const triplannerEn: ProjectCaseStudy = {
  slug: 'triplanner',
  seoTitle: 'Triplanner — Case study',
  kicker: 'Case study · 01',
  name: 'Triplanner',
  year: '2026',
  title: 'Planning a trip is a shared-state problem.',
  lead: 'Triplanner started from a concrete frustration: when four people plan the same trip, the information scatters across chats, spreadsheets, and screenshots. I built an app that keeps the itinerary, the budget, and the documents in one place, with explicit permissions and AI suggestions that never make decisions for anyone.',
  meta: [
    { label: 'Role', value: 'Product, frontend, backend, and infrastructure' },
    { label: 'Year', value: '2026' },
    {
      label: 'Stack',
      value: 'Next.js · GraphQL · Postgres · MongoDB · Python · Docker · Terraform',
    },
    { label: 'Repo', value: 'Public · MarcoJr1312/local_triplanner' },
  ],
  abstract:
    'The current version runs entirely on localhost: three processes, two databases, and one agent. The AWS infrastructure exists as an ephemeral stack: it wakes on demand and is destroyed after 30 minutes without traffic. I chose that shape because the interesting problem was not deploying, but deciding what deserves to persist, what can be rebuilt, and where each truth lives.',
  toc: [
    { label: 'The problem', href: '#problema' },
    { label: 'Process', href: '#proceso' },
    { label: 'Architecture', href: '#arquitectura' },
    { label: 'Decisions', href: '#decisiones' },
    { label: 'Infrastructure', href: '#infraestructura' },
    { label: 'Learnings', href: '#aprendizajes' },
    { label: 'What is next', href: '#siguientes' },
  ],
  problem: {
    id: 'problema',
    index: '01',
    label: 'The problem',
    title: 'A trip does not fit in a chat.',
    body: [
      'A shared trip has three properties that break generic tools: the state changes many times, several people need to write to it, and not everyone should see the same thing.',
      'A spreadsheet solves the table, but not permissions, conversation, or files. A chat solves the conversation, but loses structure. A shared document solves editing, but not the data model.',
      'My goal was not to clone a planner. It was to define a model where the trip is the unit of access, every activity has a place and a time, and every file belongs to an activity with an explicit audience.',
    ],
    invariants: [
      {
        title: 'The trip is the security boundary',
        body: 'Every read and every mutation checks membership. There are no "public" endpoints that return trip data.',
      },
      {
        title: 'One source of truth per fact',
        body: 'Postgres holds relational and evolving data; DynamoDB only serves the location catalogue, which is read-heavy.',
      },
      {
        title: 'Binaries do not travel through the API',
        body: 'Attachments are served through short-lived HMAC URLs, and the uploader chooses who can see each file.',
      },
      {
        title: 'AI proposes, the person decides',
        body: 'The agent only has read-only tools. It does not create, edit, or delete.',
      },
    ],
  },
  principles: {
    id: 'proceso',
    index: '02',
    label: 'Thought process',
    title: 'What I decided before writing code.',
    body: 'Before the schema I wrote the rules I did not want to break. Then I ordered the work so every layer could be tested on its own. Those two lists became the filter for everything that followed.',
    approach: [
      {
        title: 'Model the trip',
        detail:
          'Entities, owners, and access rules before any screen. If a piece of data had no clear owner, the model was wrong.',
      },
      {
        title: 'Define the contract',
        detail:
          'A GraphQL schema and stable error codes. The client asks for what it renders; the server decides what it may return.',
      },
      {
        title: 'Build the happy path',
        detail:
          'Create a trip, invite, add an activity, attach a file. First without AI, realtime, or AWS.',
      },
      {
        title: 'Add AI last',
        detail:
          'The agent reads a product that already works. If it goes down, the app is still useful.',
      },
      {
        title: 'Make it repeatable',
        detail:
          'Docker, idempotent migrations, seed, and a green test suite before touching infrastructure.',
      },
    ],
    items: [
      {
        title: 'Start with boundaries, not screens',
        body: 'I defined the entities and their owners: user, trip, day, activity, attachment. When a screen asked for data with no clear owner, the model was the problem, not the screen.',
      },
      {
        title: 'Design for the worst case: four people and one file',
        body: 'Permissions are not a layer added at the end; they are part of the shape of the data. Every attachment knows its audience.',
      },
      {
        title: 'Keep the browser ignorant',
        body: 'The client never sees internal URLs or keys. Next.js is the only public origin and acts as the proxy.',
      },
      {
        title: 'Separate what changes from what is read',
        body: 'The location catalogue changes rarely and is read constantly; the itinerary changes all the time. Two engines, two rhythms.',
      },
      {
        title: 'Leave infrastructure in a reversible state',
        body: 'A stack you can destroy without drama forces you to separate disposable data from artifacts that survive.',
      },
    ],
  },
  architecture: {
    id: 'arquitectura',
    index: '03',
    label: 'Architecture',
    title: 'Three processes, two databases, one origin.',
    body: [
      'The browser only talks to Next.js. Next proxies /api/graphql to the GraphQL server, /api/agent/* to the agent service, and rewrites /uploads/* to storage. The API talks to Postgres, DynamoDB, S3, and external services. The agent reads trip context through internal endpoints authenticated with a shared token and queries pgvector directly in Postgres.',
      'That shape reduces the public surface to one process: the HasData, Resend, and DeepSeek keys live on the server, and no NEXT_PUBLIC_* variable carries a secret.',
    ],
    flow: [
      {
        label: 'Browser',
        detail: 'Loads the app and obtains a Firebase ID token.',
      },
      {
        label: 'Next.js',
        detail: 'Validates the session, renders on the server, and proxies the request.',
      },
      {
        label: 'GraphQL API',
        detail: 'Verifies the token, checks membership, and resolves the data.',
      },
      {
        label: 'Data',
        detail: 'Postgres for the trip; DynamoDB only for location search.',
      },
    ],
    caption:
      'Fig. 01 — Runtime architecture. The bus on the right groups the API outbound calls; the agent uses DeepSeek and reads embeddings directly from Postgres.',
    note: 'Firebase Auth is used in the client to obtain the ID token; the API verifies it with the Admin SDK. The agent queries pgvector in Postgres for similarity context; binaries are served through signed URLs, not through the proxy.',
    diagramTitle: 'Triplanner architecture diagram',
    diagramDesc:
      'The browser talks to Next.js, which acts as the only public origin. Next.js proxies /api/graphql to the GraphQL server on Bun, /api/agent to the Python agent, and rewrites /uploads/* to storage. The API reads and writes Postgres with pgvector, DynamoDB, S3 or local disk, and calls Firebase, HasData, and Resend. The agent uses DeepSeek, reads trip context through the API, and queries embeddings directly in Postgres.',
  },
  decisions: {
    id: 'decisiones',
    index: '04',
    label: 'Decisions',
    title: 'Seven decisions and their price.',
    intro:
      'Every choice has a cost. These are the ones I made, why I made them, and what I accepted in return. None is free; several I would make again.',
    labels: { context: 'Context', decision: 'Decision', tradeoff: 'Trade-off' },
    items: [
      {
        id: 'D1',
        title: 'Next.js as the only public origin',
        context:
          'The browser needed to talk to two services and to files without exposing internal URLs or keys.',
        decision:
          'Route handlers that act as proxies. The client only knows /api/graphql, /api/agent/*, and /uploads/*.',
        tradeoff:
          'An extra network hop and a process that can become a bottleneck. In exchange, a single surface to authenticate, cache, and observe.',
      },
      {
        id: 'D2',
        title: 'GraphQL between the client and Postgres',
        context:
          'The app has many views over the same trip: day, calendar, budget, members. REST would have multiplied nearly identical endpoints.',
        decision:
          'A typed schema with graphql-yoga on Bun; the client asks for exactly what each screen renders.',
        tradeoff:
          'More server discipline (N+1, depth limits) and less direct caching than REST. In exchange, an explicit contract and fewer ad hoc endpoints.',
      },
      {
        id: 'D3',
        title: 'Postgres as the source of truth; DynamoDB only for the catalogue',
        context:
          'The location catalogue is read-heavy and comes from HasData; the itinerary is relational and changes constantly.',
        decision:
          'Separate by access pattern, not by fashion: Postgres for the trip, DynamoDB for the cache-first catalogue.',
        tradeoff:
          'Two engines to operate and no join between them. In exchange, each does what it is good at and the catalogue does not compete with itinerary writes.',
      },
      {
        id: 'D4',
        title: 'pgvector instead of a separate vector database',
        context:
          'The agent needed to retrieve trip context by similarity without adding another service to a stack that already had three.',
        decision: 'Store embeddings in Postgres with pgvector, next to the data they describe.',
        tradeoff:
          'Fewer specialized tools and manual index tuning. In exchange, one less service and consistency with the rest of the trip.',
      },
      {
        id: 'D5',
        title: 'One storage interface, two implementations',
        context:
          'Locally it makes no sense to depend on S3; in AWS it makes no sense to write to the container disk.',
        decision:
          'A Storage layer with local and S3 implementations, and short-lived HMAC URLs for attachments.',
        tradeoff:
          'One more indirection and tests in two environments. In exchange, the same code runs on localhost and on Fargate without changes.',
      },
      {
        id: 'D6',
        title: 'The agent as a separate Python service',
        context: 'The AI ecosystem lives in Python; the rest of the product lives in TypeScript.',
        decision:
          'An independent FastAPI service with read-only tools and a shared internal token.',
        tradeoff:
          'Another deployment, another runtime, and another failure domain. In exchange, I isolate ML dependencies and can turn AI off without taking the product down.',
      },
      {
        id: 'D7',
        title: 'Ephemeral AWS stack with a control plane',
        context: 'A public demo should not cost like production around the clock.',
        decision:
          'The application wakes on demand and is destroyed after 30 minutes without traffic. A minimal control plane (Lambdas, EventBridge, state, ECR) survives so it can be woken again.',
        tradeoff:
          'An 8–12 minute cold start and accepted data loss. In exchange, cost concentrates on the hours when someone actually uses the product.',
      },
    ],
  },
  infrastructure: {
    id: 'infraestructura',
    index: '05',
    label: 'Infrastructure',
    title: 'What can be destroyed is not designed the same way.',
    body: [
      'The ephemeral stack separates two worlds. The control plane is small and permanent: it receives the wake command, checks for traffic, and stores Terraform state. The application stack is disposable: VPC, RDS, DynamoDB, S3, an ALB with WAF, and three services on ECS Fargate.',
      'The cycle is explicit: Terraform applies with desired_count=1, migrations and seed run, the Cloudflare CNAME is updated to the new ALB, and the state is marked awake. When the Lambda sees no traffic for 30 minutes, it triggers destroy and the state returns to asleep.',
    ],
    lifecycle: [
      {
        label: 'Wake',
        detail: 'POST /wake → repository_dispatch → terraform apply + migrations + seed.',
      },
      {
        label: 'Serve',
        detail: 'Cloudflare points to the ALB; WAF filters; ECS runs web, API, and agent.',
      },
      {
        label: 'Sleep',
        detail: 'Sleep-check sees 30 minutes without traffic and triggers terraform destroy.',
      },
      {
        label: 'Survive',
        detail: 'State, Lambdas, ECR, ACM, and the GitHub secret stay up.',
      },
    ],
    terraform: {
      label: 'Terraform · aws-infra',
      title: 'Terraform',
      intro:
        'A read-only view of aws-infra, the only directory that applies and destroys the stack. Only folders and files are shown: no plans run, no values are exposed, and nothing touches AWS.',
      readOnly: 'Read-only',
      note: 'Click a folder to expand it. This is a snapshot of the repository structure, without file contents.',
    },
    workflows: {
      label: 'GitHub Actions · 7 workflows',
      title: 'Every workflow has its own trigger and its own permission.',
      intro:
        'In aws_triplanner, application pipelines test every change and only publish images from main. Wake and sleep are the only ones that apply or destroy Terraform, and they share a concurrency group so they never overlap. Pick a tab or swipe the panel to see the next one.',
      previous: 'Previous workflow',
      next: 'Next workflow',
      triggerLabel: 'Trigger',
      stepsLabel: 'Key steps',
      items: [
        {
          file: 'web.yml',
          name: 'Web',
          title: 'Web · test and publish',
          trigger: 'push · pull_request · tags v* · manual',
          body: 'Validates the frontend on every change and publishes the image only from main. Tests run on Bun; publish assumes the OIDC role, logs in to ECR, and builds for linux/amd64, which is what Fargate expects.',
          steps: ['bun audit', 'tsc --noEmit', 'bun test', 'build → triplanner/web'],
        },
        {
          file: 'api.yml',
          name: 'API',
          title: 'API · test and publish',
          trigger: 'push · pull_request · tags v* · manual',
          body: 'The test job starts Postgres with pgvector, DynamoDB Local, and S3 on LocalStack so the suite runs against real services. From main, it publishes triplanner/api tagged by SHA and latest.',
          steps: [
            'Postgres 17 + pgvector',
            'DynamoDB Local',
            'LocalStack S3',
            'bun test',
            'build → triplanner/api',
          ],
        },
        {
          file: 'agent.yml',
          name: 'Agent',
          title: 'Agent · test and publish',
          trigger: 'push · pull_request · tags v* · manual',
          body: 'Tests the agent on Python 3.12 with uv and a pgvector database. pip-audit gates the pipeline except for four chromadb advisories that have no upstream fix yet; publish builds triplanner/agent.',
          steps: ['uv sync --frozen', 'pip-audit', 'test_m2.py', 'build → triplanner/agent'],
        },
        {
          file: 'compose-smoke.yml',
          name: 'Compose',
          title: 'Compose smoke · the whole stack',
          trigger: 'push · pull_request · manual',
          body: 'The only workflow that boots all three services together. It builds the images, starts docker-compose.ci.yml, waits for the Postgres, DynamoDB, API, agent, and web health checks, and runs the end-to-end smoke test.',
          steps: ['build 3 images', 'docker compose up', 'health checks', 'scripts/smoke.sh'],
        },
        {
          file: 'wake.yml',
          name: 'Wake',
          title: 'Wake · bring the stack up',
          trigger: 'repository_dispatch: wake · manual',
          body: 'Triggered by POST /wake. It applies Terraform with desired_count=1, points the Cloudflare CNAME at the new ALB, runs migrations and seed as one-off ECS tasks, and waits for a 200 on /login before marking the stack awake. On failure it leaves the state as error.',
          steps: [
            'OIDC → AWS',
            'terraform apply',
            'CNAME → ALB',
            'migrate + seed',
            'health check',
            'state: awake',
          ],
        },
        {
          file: 'sleep.yml',
          name: 'Sleep',
          title: 'Sleep · tear the stack down',
          trigger: 'repository_dispatch: sleep · manual',
          body: 'Triggered by the sleep-check after 30 minutes without traffic. It destroys the application stack, moves the hostname to the status page, and marks the stack asleep. It shares the triplanner-aws concurrency group with wake, so the two never run at the same time.',
          steps: ['OIDC → AWS', 'terraform destroy', 'hostname → status page', 'state: asleep'],
        },
        {
          file: 'status-page.yml',
          name: 'Status',
          title: 'Status page · what stays online',
          trigger: 'push to main · manual',
          body: 'Publishes the static page that answers while the stack sleeps. Wrangler uploads it to Cloudflare Pages, outside the AWS stack that gets destroyed.',
          steps: ['wrangler pages deploy', 'Cloudflare Pages'],
        },
      ],
    },
    caption:
      'Fig. 02 — Ephemeral stack. Above, what is never destroyed; below, what is rebuilt on every wake.',
    note: 'RDS is Single-AZ on purpose: shorter start time, no high-availability guarantee. The ALB DNS name changes on every apply, so the workflow updates Cloudflare.',
    diagramTitle: 'Ephemeral AWS stack diagram',
    diagramDesc:
      'The always-on control plane contains GitHub Actions, the wake API, EventBridge with the sleep-check Lambda, and the state in S3 with ECR and ACM. The ephemeral stack contains Cloudflare, the ALB with WAF, ECS Fargate with web, API, and agent, and RDS, DynamoDB, and S3, which are destroyed on sleep.',
  },
  localRepo: {
    label: 'Local demo',
    title: 'You can also run it on your machine.',
    body: 'The ephemeral AWS stack takes 8–12 minutes to wake. If you do not want to wait, local_triplanner packages the same app with Docker Compose: Next.js, GraphQL on Bun, the Python agent, Postgres, and MongoDB, with seeded data and no external accounts.',
    cloneLabel: 'Clone the repository',
    cloneCommand: 'git clone https://github.com/MarcoJr1312/local_triplanner.git',
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
    note: 'Then enter the folder, run docker compose up --build, and open localhost:3000/login. Pick Demo or Demo Friend.',
    repoLabel: 'Open local_triplanner on GitHub',
    repoUrl: 'https://github.com/MarcoJr1312/local_triplanner',
  },
  learnings: {
    id: 'aprendizajes',
    index: '06',
    label: 'Learnings',
    title: 'What was hard and what I would do differently.',
    items: [
      {
        title: 'Migrating the engine is not changing a connection string',
        body: 'Moving from SQLite with FTS5 to Postgres + DynamoDB meant rewriting repositories, migrations, and tests. I did it in slices, with the suite green at every step.',
      },
      {
        title: 'The development environment also has architecture',
        body: 'Running next build while next dev serves the same .next breaks chunks. Separating artifacts and cleaning up when switching runtimes became part of the workflow.',
      },
      {
        title: 'Ephemeral infrastructure has a hidden cost',
        body: 'Cold start is not just waiting: it is a product experience. If the demo takes ten minutes to wake, the first impression is already decided.',
      },
      {
        title: 'Permissions are designed into the data',
        body: 'When file visibility is a column instead of a layer, it is much harder to forget in a new query.',
      },
    ],
  },
  next: {
    id: 'siguientes',
    index: '07',
    label: 'What is next',
    title: 'The next version.',
    items: [
      'Finish the ephemeral AWS stack and reconnect the deploy button once the wake flow is stable.',
      'Reduce the OIDC role from AdministratorAccess to the exact services each workflow touches.',
      'Add an evaluation harness for the agent: compare suggestions against a set of real trips.',
      'Measure and optimize wake time before opening it to the public.',
    ],
  },
  labels: {
    backToWork: 'Back to projects',
    toc: 'On this page',
    figure: 'Figure',
    approach: 'How I approached it',
    invariants: 'Rules I did not want to break',
    lifecycle: 'Lifecycle',
  },
};

export const caseStudies: Record<string, Record<Lang, ProjectCaseStudy>> = {
  triplanner: {
    es: triplannerEs,
    en: triplannerEn,
  },
};

export function getCaseStudy(slug: string, lang: Lang): ProjectCaseStudy | undefined {
  return caseStudies[slug]?.[lang];
}
