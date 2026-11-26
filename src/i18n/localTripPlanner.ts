import type { Lang } from './content';
import type { CaseStudySection, DecisionRecord } from './projects';

export interface LocalCaseStudy {
  slug: string;
  seoTitle: string;
  kicker: string;
  name: string;
  year: string;
  status: string;
  title: string;
  lead: string;
  meta: { label: string; value: string }[];
  abstract: string;
  toc: { label: string; href: string }[];
  baseline: CaseStudySection & {
    body: string[];
    facts: { value: string; label: string; note: string }[];
    constraintsLabel: string;
    constraints: { title: string; body: string }[];
  };
  method: CaseStudySection & {
    body: string;
    gatesLabel: string;
    gates: { id: string; title: string; body: string }[];
    timelineLabel: string;
    timeline: { milestone: string; title: string; body: string }[];
  };
  architecture: CaseStudySection & {
    body: string[];
    flow: { label: string; detail: string }[];
    caption: string;
    note: string;
    diagramTitle: string;
    diagramDesc: string;
    deliveryLabel: string;
    delivery: { label: string; value: string; detail: string }[];
  };
  decisions: CaseStudySection & {
    intro: string;
    labels: { context: string; decision: string; tradeoff: string };
    items: DecisionRecord[];
  };
  observability: CaseStudySection & {
    body: string[];
    stats: { value: string; label: string; note: string }[];
    screenshots: { src: string; alt: string; title: string; caption: string }[];
    caption: string;
    note: string;
  };
  learnings: CaseStudySection & {
    items: { title: string; body: string }[];
  };
  repo: {
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
    docsLabel: string;
    docsUrl: string;
  };
  labels: {
    backToWork: string;
    toc: string;
    figure: string;
    gates: string;
    timeline: string;
    constraints: string;
  };
}

const localEs: LocalCaseStudy = {
  slug: 'local-triplanner',
  seoTitle: 'Local Trip Planner — Caso de estudio',
  kicker: 'Caso de estudio · 02',
  name: 'Local Trip Planner',
  year: '2026',
  status: 'Migración local completada · M29',
  title: 'Migrar un monolito también es aprender dónde están los límites.',
  lead: 'Local Trip Planner es la versión local de Triplanner y el laboratorio donde convertí un monolito modular en ocho servicios sobre Kubernetes. No lo hice por escala: lo hice para aprender a mover datos, contratos y confianza sin romper el producto.',
  meta: [
    { label: 'Rol', value: 'Arquitectura, migración, infraestructura y observabilidad' },
    { label: 'Año', value: '2026' },
    {
      label: 'Stack',
      value: 'Next.js · Bun · gRPC · PostgreSQL · MongoDB · Helm · Cilium · Prometheus · Argo CD',
    },
    { label: 'Repo', value: 'Público · MarcoJr1312/local_triplanner' },
  ],
  abstract:
    'Durante seis días y 29 hitos, el backend pasó de un solo proceso GraphQL con una base compartida a ocho runtimes con bases separadas, contratos gRPC, un broker de email, Helm, Cilium, Prometheus/Grafana y Argo CD. La regla fue simple: cada corte debía dejar el demo funcionando y un rollback que fuera una bandera, no un redeploy. Este caso cuenta el método, las decisiones y lo que las gráficas del clúster terminaron enseñándome.',
  toc: [
    { label: 'Punto de partida', href: '#inicio' },
    { label: 'Método', href: '#metodo' },
    { label: 'Clúster', href: '#arquitectura' },
    { label: 'Decisiones', href: '#decisiones' },
    { label: 'Observabilidad', href: '#observabilidad' },
    { label: 'Aprendizajes', href: '#aprendizajes' },
    { label: 'Repo', href: '#repo' },
  ],
  baseline: {
    id: 'inicio',
    index: '01',
    label: 'Punto de partida',
    title: 'Un monolito que funcionaba demasiado bien.',
    body: [
      'La versión original era un monolito modular: Next.js como único origen público, una API GraphQL en Bun, un Postgres para el viaje, MongoDB para el catálogo de lugares y un agente en Python. Todo vivía en un docker compose, todo compartía el mismo proceso de despliegue y casi cualquier resolver podía leer casi cualquier tabla.',
      'Ese diseño fue correcto para construir el producto. El problema apareció cuando quise aprender microservicios de verdad: no hay forma de entender los límites de un servicio si nunca lo separas, nunca lo despliegas solo y nunca lo ves fallar por su cuenta.',
      'La migración no buscaba escala. Buscaba responder preguntas concretas: ¿quién es dueño de cada dato?, ¿qué pasa cuando el consumidor de email se cae?, ¿cómo cambio un contrato sin tocar el frontend?, ¿cómo sé que el nuevo camino es más lento?',
    ],
    facts: [
      {
        value: '8',
        label: 'runtimes',
        note: 'web, API, users, trips, locations, agent, broker, email',
      },
      { value: '5', label: 'bases', note: 'cuatro PostgreSQL y un MongoDB' },
      { value: '29', label: 'hitos', note: 'M1–M29 planificados en Orkai' },
      { value: '35', label: 'docs', note: 'decisiones y evidencia por corte' },
    ],
    constraintsLabel: 'Reglas que no quería romper',
    constraints: [
      {
        title: 'El demo no se rompe',
        body: 'Cada extracción convivió con el camino anterior hasta que el nuevo tuvo pruebas, smoke y rollback probado.',
      },
      {
        title: 'Una base por servicio',
        body: 'La frontera se movió del código a la red: si un servicio necesita un dato, lo pide por contrato, no por SQL.',
      },
      {
        title: 'Cada corte tiene bandera',
        body: 'LOCATIONS_MODE, flags de transporte y rutas HTTP de respaldo permitieron volver atrás sin reconstruir imágenes.',
      },
      {
        title: 'Nada de secretos en values',
        body: 'Las claves viven en Secrets o en el PVC del servicio; el chart solo lleva referencias y valores de demo.',
      },
    ],
  },
  method: {
    id: 'metodo',
    index: '02',
    label: 'Método',
    title: 'Ocho puertas antes de borrar el código viejo.',
    body: 'El playbook de migración definió ocho gates. Ninguno se saltaba: baseline, contrato, esqueleto, productor, consumidor, e2e local, Helm y cutover. La extracción avanzó en el orden en que los datos podían separarse sin mentir: primero el email, luego el catálogo, después viajes y usuarios. Cada servicio nuevo nació con health/ready, suite propia, imagen y valores de Helm.',
    gatesLabel: 'Las ocho puertas',
    gates: [
      {
        id: '0',
        title: 'Baseline',
        body: 'Comportamiento actual, dueño del dato y bandera de rollback.',
      },
      {
        id: '1',
        title: 'Contrato',
        body: 'Esquema versionado y propiedad explícita del dato.',
      },
      {
        id: '2',
        title: 'Esqueleto',
        body: 'Servicio ejecutable con probes, tests y typecheck.',
      },
      {
        id: '3',
        title: 'Productor',
        body: 'Outbox transaccional: el evento nace con el cambio de dominio.',
      },
      {
        id: '4',
        title: 'Consumidor',
        body: 'Retries, idempotencia, DLQ y shutdown limpio.',
      },
      {
        id: '5',
        title: 'E2E local',
        body: 'Broker real y smoke del flujo completo, no mocks.',
      },
      {
        id: '6',
        title: 'Helm',
        body: 'Values, secretos, probes, PDB y network policy revisados.',
      },
      {
        id: '7',
        title: 'Cutover',
        body: 'Bandera activa, dashboards observados y rollback probado.',
      },
    ],
    timelineLabel: 'La ruta de extracción',
    timeline: [
      {
        milestone: 'M1–M5 · Nov 20',
        title: 'Email fuera del request',
        body: 'Servicio de email, outbox en Postgres y un broker Go con topic/offset/ack. La invitación se escribe en la misma transacción que el evento; el consumidor puede fallar sin perder el correo.',
      },
      {
        milestone: 'M6 · Nov 21',
        title: 'Locations y MongoDB',
        body: 'El catálogo de lugares salió primero porque era el límite más claro: lectura intensiva, datos externos y un contrato interno pequeño. El API conservó GraphQL y delegó con LOCATIONS_MODE=remote|local.',
      },
      {
        milestone: 'M9 · Nov 22',
        title: 'Trips y su PostgreSQL',
        body: 'Viajes, miembros, ítems e invitaciones pasaron a un servicio con base propia. El cutover usó UUIDs fijos para que las referencias del demo sobrevivieran.',
      },
      {
        milestone: 'M10 · Nov 22',
        title: 'Users, login y notificaciones',
        body: 'Cuentas, Argon2id, invitaciones locales y la bandeja de notificaciones se mudaron a users. El frontend no cambió de contrato.',
      },
      {
        milestone: 'M11–M14 · Nov 22–23',
        title: 'Frontend, favoritos, recordatorios y agente',
        body: 'La web entró a Helm, favoritos y recordatorios encontraron dueño, y el agente empezó a sincronizar embeddings con pgvector a partir de eventos del catálogo.',
      },
      {
        milestone: 'M15–M18 · Nov 23–24',
        title: 'gRPC, Cilium y el API facade',
        body: 'Los contratos internos pasaron de HTTP a gRPC h2c con .proto versionados. Cilium Gateway reemplazó el ingress y las CiliumNetworkPolicy hicieron explícito el tráfico permitido. El API facade se volvió un workload más del chart.',
      },
      {
        milestone: 'M19–M27 · Nov 25–26',
        title: 'Medir antes de creer',
        body: '/metrics en cada runtime, ServiceMonitors, 11 dashboards, kube-rbac-proxy, métricas gRPC, p50/p95 y cinco exporters de base de datos. La carga de QA reveló que gRPC no estaba instrumentado; eso se volvió un hito propio.',
      },
      {
        milestone: 'M28–M29 · Nov 26',
        title: 'GitOps y trazabilidad',
        body: 'Argo CD adoptó el release de Helm, sincronizó desde Git y demostró self-heal. CI publica imágenes sha-* y actualiza values; el clúster converge a HEAD sin upgrades manuales.',
      },
    ],
  },
  architecture: {
    id: 'arquitectura',
    index: '03',
    label: 'Clúster',
    title: 'Ocho runtimes, cinco bases y un solo origen público.',
    body: [
      'En el clúster, el navegador sigue hablando solo con Next.js. Cilium Gateway publica la web; la web proxya /api/graphql hacia el API facade y /api/agent/* hacia el agente. El facade es el único que conoce a users, trips y locations, ahora por gRPC sobre la red interna.',
      'Cada servicio tiene su base: users, trips, API y agent usan instancias PostgreSQL separadas; locations conserva MongoDB. El broker Go y el email quedan fuera del camino síncrono. Prometheus raspa los ocho runtimes y los cinco exporters; Grafana y Argo CD viven en namespaces aparte y nunca se exponen por el Gateway.',
    ],
    flow: [
      {
        label: 'Navegador',
        detail: 'HTTPS al Gateway; sesión y render en Next.js.',
      },
      {
        label: 'Cilium Gateway',
        detail: 'HTTPRoute a la web; servicios internos solo ClusterIP.',
      },
      {
        label: 'API facade',
        detail: 'GraphQL público, gRPC h2c interno y token compartido.',
      },
      {
        label: 'Datos',
        detail: 'Una base por servicio; sin joins entre dominios.',
      },
    ],
    caption:
      'Fig. 01 — Clúster local. El Gateway solo publica la web; el API facade habla gRPC con users, trips y locations. El broker y el email quedan fuera del request. Prometheus y Grafana observan desde monitoring.',
    note: 'El diagrama muestra el estado final de la migración (chart 0.21.0). En Compose, API y agente comparten Postgres; en Helm cada uno tiene su instancia. Los exporters y Argo CD se instalan como releases separados y no forman parte del chart de la aplicación.',
    diagramTitle: 'Diagrama del clúster de Local Trip Planner',
    diagramDesc:
      'El navegador entra por Cilium Gateway a la web en Next.js. La web llama al API facade por /api/graphql y al agente por /api/agent. El facade usa gRPC sobre h2c para users, trips y locations. Users, trips, API y agent tienen PostgreSQL propio; locations usa MongoDB. El facade publica invitaciones en un broker Go que el servicio de email consume y entrega a Resend o a un sink. Prometheus raspa los runtimes y los exporters; Grafana consulta Prometheus. Argo CD sincroniza el chart de Helm desde Git.',
    deliveryLabel: 'Entrega',
    delivery: [
      {
        label: 'Helm',
        value: 'chart 0.21.0',
        detail: 'Un chart, values por entorno, probes, PDB y NetworkPolicy.',
      },
      {
        label: 'GitOps',
        value: 'Synced / Healthy',
        detail: 'Argo CD sigue HEAD con auto-sync y selfHeal; prune desactivado.',
      },
      {
        label: 'Imágenes',
        value: 'sha-e377c12',
        detail: 'Seis servicios publicados por CI; broker y email locales por ahora.',
      },
    ],
  },
  decisions: {
    id: 'decisiones',
    index: '04',
    label: 'Decisiones',
    title: 'Ocho decisiones y lo que costaron.',
    intro:
      'Ninguna de estas decisiones fue gratis. Las elegí por una razón concreta y anoté el precio. Varias las volvería a tomar; otras explican por qué el clúster local no pretende ser producción.',
    labels: { context: 'Contexto', decision: 'Decisión', tradeoff: 'Trade-off' },
    items: [
      {
        id: 'D1',
        title: 'Extraer por dueño de dato, no por capa',
        context:
          'El monolito compartía un Postgres y un MongoDB. Cualquier resolver podía leer cualquier tabla y nada impedía que dos dominios escribieran el mismo registro.',
        decision:
          'Cada servicio recibió su propia base: users, trips, API y agent con PostgreSQL separado; locations conservó MongoDB. El API compone datos por contrato, no por join.',
        tradeoff:
          'Cuatro PostgreSQL y un MongoDB que operar, migrar y respaldar. A cambio, la frontera dejó de ser una convención y pasó a ser una dirección de red.',
      },
      {
        id: 'D2',
        title: 'Strangler con banderas y doble protocolo',
        context:
          'El demo tenía que seguir funcionando en cada corte. Una migración big-bang habría dejado el producto roto justo cuando necesitaba comparar el antes y el después.',
        decision:
          'Cada servicio nuevo convivió con el camino anterior. LOCATIONS_MODE=remote|local, flags de transporte HTTP/gRPC y rutas internas de respaldo se quitaron solo después del Gate 2.',
        tradeoff:
          'Código duplicado temporal y dos caminos que probar. A cambio, el rollback era una variable de entorno, no un redeploy de la versión anterior.',
      },
      {
        id: 'D3',
        title: 'Outbox transaccional y un broker Go en vez de Kafka',
        context:
          'El envío de invitaciones ocurría dentro del request. Kafka resolvía el desacoplamiento, pero añadía Zookeeper, operación y una dependencia que no cabía en un demo de un solo nodo.',
        decision:
          'La invitación y su evento se escriben en la misma transacción de Postgres. Un relay publica al broker Go (topic/offset/ack); el servicio de email hace long-poll, reintenta y manda a DLQ.',
        tradeoff:
          'Un broker propio con semántica que hay que documentar y probar. A cambio, no hay doble escritura, el demo no arrastra Kafka y el DLQ se puede inspeccionar y reproducir.',
      },
      {
        id: 'D4',
        title: 'GraphQL público, gRPC interno',
        context:
          'El frontend ya tenía un contrato GraphQL estable. Las llamadas internas por HTTP eran strings sin tipos y cada servicio evolucionaba a distinta velocidad.',
        decision:
          'GraphQL se quedó en el borde. Users, trips y locations expusieron contratos .proto versionados y gRPC sobre h2c; health y readiness siguieron en HTTP.',
        tradeoff:
          'Dos protocolos, codegen y disciplina de compatibilidad. A cambio, contratos tipados, menos overhead y servicios que pueden evolucionar sin tocar al cliente.',
      },
      {
        id: 'D5',
        title: 'Helm como contrato de entrega',
        context:
          'Compose era la única forma de correr el stack. El clúster necesitaba despliegues repetibles, probes y secretos sin copiar YAML a mano.',
        decision:
          'Un chart, helm-triplanner, con bloques de values por servicio, secretos por referencia, probes, PDB y NetworkPolicy. Kind y Compose comparten la misma estructura de configuración.',
        tradeoff:
          'Más complejidad de templates y un chart que mantener. A cambio, helm template se volvió el artefacto de revisión y el mismo chart corre en local y en el clúster.',
      },
      {
        id: 'D6',
        title: 'Cilium Gateway y NetworkPolicy en lugar de ingress plano',
        context:
          'Un ingress clásico publicaba la web, pero dejaba todos los pods en una red plana donde cualquier servicio podía hablar con cualquier otro.',
        decision:
          'Cilium Gateway API para el tráfico norte-sur y CiliumNetworkPolicy para el este-oeste. Los servicios internos quedaron ClusterIP-only; el Gateway solo publica la web.',
        tradeoff:
          'YAML específico de Cilium y un workaround de egress en WSL2. A cambio, el tráfico permitido es explícito y no hay superficie pública accidental.',
      },
      {
        id: 'D7',
        title: 'Instrumentar cada runtime antes de optimizar',
        context:
          'La migración añadió saltos de red. Sin métricas, la única señal era que "se siente más lento", y no había forma de comparar servicios ni de detectar un contrato sin instrumentar.',
        decision:
          '/metrics en los ocho runtimes, ServiceMonitors, 11 dashboards, contadores gRPC, p50/p95 y cinco exporters de base de datos. Prometheus y Grafana quedaron ClusterIP-only.',
        tradeoff:
          'Más configuración que mantener y dashboards que envejecen. A cambio, 13/13 targets y pruebas de carga convirtieron la latencia en evidencia, no en opinión.',
      },
      {
        id: 'D8',
        title: 'GitOps con selfHeal y prune desactivado',
        context:
          'Los upgrades de Helm desde una laptop no eran reproducibles y podían borrar PVCs o Secrets. El clúster necesitaba converger a Git sin perder estado.',
        decision:
          'Argo CD adopta el release existente, sigue HEAD con auto-sync y selfHeal, y mantiene prune off. CI publica imágenes sha-* y actualiza values.yaml; los upgrades manuales de Helm se congelan.',
        tradeoff:
          'Otro control plane que operar y un workaround de egress para el repo-server. A cambio, el clúster se corrige solo y el estado queda protegido del sync.',
      },
    ],
  },
  observability: {
    id: 'observabilidad',
    index: '05',
    label: 'Observabilidad',
    title: 'La migración se termina cuando puedes verla.',
    body: [
      'Un microservicio sin métricas es solo un monolito distribuido con más formas de fallar. La instrumentación empezó con un contrato simple: GET /metrics en cada runtime, sin tocar la base de datos, y un ServiceMonitor por servicio.',
      'Las gráficas cambiaron la conversación. El overview muestra los ocho servicios UP y el tráfico por servicio; los dashboards de users y trips separan gRPC por método, estado y latencia p50/p95; los exporters muestran conexiones, cache hit ratio y transacciones por instancia. Cuando una prueba de carga mostró llamadas gRPC sin métricas, se convirtió en el hito M25, no en una nota al pie.',
    ],
    stats: [
      {
        value: '13',
        label: 'targets',
        note: '8 runtimes + 4 PostgreSQL + 1 MongoDB',
      },
      {
        value: '11',
        label: 'dashboards',
        note: '8 por servicio, overview, PostgreSQL y MongoDB',
      },
      {
        value: '0',
        label: 'errores',
        note: '1,346 intentos y 462 llamadas en las pruebas de carga',
      },
      {
        value: 'p50/p95',
        label: 'latencia',
        note: 'en cada panel de cada servicio',
      },
    ],
    screenshots: [
      {
        src: '/projects/local-triplanner/overview.png',
        alt: 'Dashboard overview de Triplanner con los ocho servicios UP, tráfico por servicio y gRPC',
        title: 'Overview',
        caption:
          'Los ocho runtimes UP, build info y tráfico por servicio durante la prueba de carga.',
      },
      {
        src: '/projects/local-triplanner/users-grpc.png',
        alt: 'Dashboard de users con llamadas gRPC por método, estado y latencia p50/p95',
        title: 'Users · gRPC',
        caption: 'GetUser, BatchUsers y ListFavoriteIds por método, estado y latencia p50/p95.',
      },
      {
        src: '/projects/local-triplanner/trips-grpc.png',
        alt: 'Dashboard de trips con llamadas gRPC y error ratio en cero',
        title: 'Trips · gRPC',
        caption: 'CreateTrip, DeleteTrip y CreateInvitation con error ratio en 0 %.',
      },
      {
        src: '/projects/local-triplanner/postgres-exporters.png',
        alt: 'Dashboard PostgreSQL con cuatro instancias, conexiones y cache hit ratio',
        title: 'PostgreSQL',
        caption: 'Cuatro instancias, conexiones, cache hit ratio y transacciones por instancia.',
      },
      {
        src: '/projects/local-triplanner/mongodb-exporter.png',
        alt: 'Dashboard MongoDB con conexiones, operaciones y memoria',
        title: 'MongoDB',
        caption: 'Conexiones, operaciones y memoria del catálogo de lugares.',
      },
      {
        src: '/projects/local-triplanner/api-load.png',
        alt: 'Dashboard del API facade bajo carga con GraphQL, p95 y cero errores 5xx',
        title: 'API facade',
        caption: 'GraphQL e internos bajo carga: 5.77 req/s, p95 de 228 ms y 0 % de 5xx.',
      },
    ],
    caption:
      'Fig. 02 — Capturas de Grafana tomadas del clúster kind durante la fase de observabilidad.',
    note: 'Prometheus y Grafana son ClusterIP-only; se abren con kubectl port-forward. Los dashboards se provisionan como ConfigMaps desde el chart y se recargan con el sidecar de Grafana.',
  },
  learnings: {
    id: 'aprendizajes',
    index: '06',
    label: 'Aprendizajes',
    title: 'Lo que cambió en cómo diseño sistemas.',
    items: [
      {
        title: 'Los límites se prueban con fallos',
        body: 'Un diagrama dice que users está separado; apagar su base y ver qué se rompe lo demuestra. Los gates de consumidor y cutover existen por eso.',
      },
      {
        title: 'El cutover es parte del producto',
        body: 'Mover users con UUIDs fijos no fue un detalle técnico: fue la diferencia entre un demo que sigue funcionando y uno que hay que reseedear.',
      },
      {
        title: 'La observabilidad también se migra',
        body: 'Las métricas de gRPC faltaban hasta que la carga las hizo visibles. Instrumentar no es el paso final; es una parte del contrato de cada servicio.',
      },
      {
        title: 'GitOps no arregla un chart mal diseñado',
        body: 'Argo CD solo puede sincronizar lo que el chart expresa bien. Primero fueron los values, los probes y las policies; después el self-heal.',
      },
      {
        title: 'Microservicios no son el objetivo',
        body: 'El objetivo era aprender dónde cortar. Algunas cosas siguen juntas a propósito: el agente habla HTTP, broker y email conservan imágenes locales, y el demo sigue siendo un solo comando en Compose.',
      },
    ],
  },
  repo: {
    label: 'El repositorio',
    title: 'Todo el viaje está en local_triplanner.',
    body: 'El código, el chart de Helm, los values de kind, los dashboards y las 35 notas de migración viven en el mismo repositorio. Si quieres ver cómo se tomó cada decisión, empieza por docs/migrations; si quieres correr el producto, usa Docker Compose.',
    cloneLabel: 'Clona el repositorio',
    cloneCommand: 'git clone https://github.com/MarcoJr1312/local_triplanner.git',
    copyLabel: 'Copiar',
    copiedLabel: 'Copiado',
    note: 'Después: cd local_triplanner && docker compose -f deploy/docker-compose.yml up --build. Abre localhost:3000/login con demo / demo123.',
    repoLabel: 'Abrir local_triplanner en GitHub',
    repoUrl: 'https://github.com/MarcoJr1312/local_triplanner',
    docsLabel: 'Leer las notas de migración',
    docsUrl: 'https://github.com/MarcoJr1312/local_triplanner/tree/main/docs/migrations',
  },
  labels: {
    backToWork: 'Volver a proyectos',
    toc: 'En esta página',
    figure: 'Figura',
    gates: 'Puertas',
    timeline: 'Cronología',
    constraints: 'Reglas',
  },
};

const localEn: LocalCaseStudy = {
  slug: 'local-triplanner',
  seoTitle: 'Local Trip Planner — Case study',
  kicker: 'Case study · 02',
  name: 'Local Trip Planner',
  year: '2026',
  status: 'Local migration complete · M29',
  title: 'Migrating a monolith is also learning where the boundaries are.',
  lead: 'Local Trip Planner is the local version of Triplanner and the lab where I turned a modular monolith into eight services on Kubernetes. I did not do it for scale: I did it to learn how to move data, contracts, and trust without breaking the product.',
  meta: [
    { label: 'Role', value: 'Architecture, migration, infrastructure, and observability' },
    { label: 'Year', value: '2026' },
    {
      label: 'Stack',
      value: 'Next.js · Bun · gRPC · PostgreSQL · MongoDB · Helm · Cilium · Prometheus · Argo CD',
    },
    { label: 'Repo', value: 'Public · MarcoJr1312/local_triplanner' },
  ],
  abstract:
    'Over six days and 29 milestones, the backend went from a single GraphQL process with a shared database to eight runtimes with separate databases, gRPC contracts, an email broker, Helm, Cilium, Prometheus/Grafana, and Argo CD. The rule was simple: every slice had to leave the demo working and a rollback that was a flag, not a redeploy. This case covers the method, the decisions, and what the cluster graphs ended up teaching me.',
  toc: [
    { label: 'Starting point', href: '#inicio' },
    { label: 'Method', href: '#metodo' },
    { label: 'Cluster', href: '#arquitectura' },
    { label: 'Decisions', href: '#decisiones' },
    { label: 'Observability', href: '#observabilidad' },
    { label: 'Learnings', href: '#aprendizajes' },
    { label: 'Repo', href: '#repo' },
  ],
  baseline: {
    id: 'inicio',
    index: '01',
    label: 'Starting point',
    title: 'A monolith that worked too well.',
    body: [
      'The original version was a modular monolith: Next.js as the only public origin, a GraphQL API on Bun, Postgres for the trip, MongoDB for the place catalogue, and a Python agent. Everything lived in one docker compose, everything shared the same deployment process, and almost any resolver could read almost any table.',
      'That design was right for building the product. The problem appeared when I wanted to learn microservices for real: there is no way to understand a service boundary if you never separate it, never deploy it alone, and never watch it fail on its own.',
      'The migration was not about scale. It was about answering concrete questions: who owns each piece of data? What happens when the email consumer goes down? How do I change a contract without touching the frontend? How do I know the new path is slower?',
    ],
    facts: [
      {
        value: '8',
        label: 'runtimes',
        note: 'web, API, users, trips, locations, agent, broker, email',
      },
      { value: '5', label: 'databases', note: 'four PostgreSQL and one MongoDB' },
      { value: '29', label: 'milestones', note: 'M1–M29 planned in Orkai' },
      { value: '35', label: 'docs', note: 'decisions and evidence per slice' },
    ],
    constraintsLabel: 'Rules I did not want to break',
    constraints: [
      {
        title: 'The demo does not break',
        body: 'Every extraction coexisted with the old path until the new one had tests, smoke coverage, and a proven rollback.',
      },
      {
        title: 'One database per service',
        body: 'The boundary moved from code to network: if a service needs data, it asks through a contract, not SQL.',
      },
      {
        title: 'Every slice has a flag',
        body: 'LOCATIONS_MODE, transport flags, and fallback HTTP routes allowed a rollback without rebuilding images.',
      },
      {
        title: 'No secrets in values',
        body: 'Keys live in Secrets or on the service PVC; the chart only carries references and demo values.',
      },
    ],
  },
  method: {
    id: 'metodo',
    index: '02',
    label: 'Method',
    title: 'Eight gates before deleting the old code.',
    body: 'The migration playbook defined eight gates. None was skipped: baseline, contract, skeleton, producer, consumer, local e2e, Helm, and cutover. Extraction followed the order in which data could be separated honestly: email first, then the catalogue, then trips and users. Every new service shipped with health/ready, its own test suite, an image, and Helm values.',
    gatesLabel: 'The eight gates',
    gates: [
      {
        id: '0',
        title: 'Baseline',
        body: 'Current behaviour, data owner, and rollback flag.',
      },
      {
        id: '1',
        title: 'Contract',
        body: 'Versioned schema and explicit data ownership.',
      },
      {
        id: '2',
        title: 'Skeleton',
        body: 'Runnable service with probes, tests, and typecheck.',
      },
      {
        id: '3',
        title: 'Producer',
        body: 'Transactional outbox: the event is born with the domain change.',
      },
      {
        id: '4',
        title: 'Consumer',
        body: 'Retries, idempotency, DLQ, and clean shutdown.',
      },
      {
        id: '5',
        title: 'Local e2e',
        body: 'Real broker and full-flow smoke, not mocks.',
      },
      {
        id: '6',
        title: 'Helm',
        body: 'Values, secrets, probes, PDB, and network policy reviewed.',
      },
      {
        id: '7',
        title: 'Cutover',
        body: 'Flag on, dashboards watched, rollback proven.',
      },
    ],
    timelineLabel: 'The extraction route',
    timeline: [
      {
        milestone: 'M1–M5 · Nov 20',
        title: 'Email out of the request',
        body: 'Email service, Postgres outbox, and a Go broker with topic/offset/ack. The invitation is written in the same transaction as the event; the consumer can fail without losing the email.',
      },
      {
        milestone: 'M6 · Nov 21',
        title: 'Locations and MongoDB',
        body: 'The place catalogue went first because it had the clearest boundary: read-heavy, external data, and a small internal contract. The API kept GraphQL and delegated with LOCATIONS_MODE=remote|local.',
      },
      {
        milestone: 'M9 · Nov 22',
        title: 'Trips and its PostgreSQL',
        body: 'Trips, members, items, and invitations moved to a service with its own database. The cutover used fixed UUIDs so demo references survived.',
      },
      {
        milestone: 'M10 · Nov 22',
        title: 'Users, login, and notifications',
        body: 'Accounts, Argon2id, local invites, and the notification inbox moved to users. The frontend contract did not change.',
      },
      {
        milestone: 'M11–M14 · Nov 22–23',
        title: 'Frontend, favorites, reminders, and agent',
        body: 'The web app entered Helm, favorites and reminders found an owner, and the agent started syncing pgvector embeddings from catalogue events.',
      },
      {
        milestone: 'M15–M18 · Nov 23–24',
        title: 'gRPC, Cilium, and the API facade',
        body: 'Internal contracts moved from HTTP to gRPC h2c with versioned .proto files. Cilium Gateway replaced ingress and CiliumNetworkPolicy made allowed traffic explicit. The API facade became just another chart workload.',
      },
      {
        milestone: 'M19–M27 · Nov 25–26',
        title: 'Measure before believing',
        body: '/metrics on every runtime, ServiceMonitors, 11 dashboards, kube-rbac-proxy, gRPC metrics, p50/p95, and five database exporters. The QA load revealed gRPC was not instrumented; that became its own milestone.',
      },
      {
        milestone: 'M28–M29 · Nov 26',
        title: 'GitOps and traceability',
        body: 'Argo CD adopted the Helm release, synced from Git, and proved self-heal. CI publishes sha-* images and updates values; the cluster converges to HEAD without manual upgrades.',
      },
    ],
  },
  architecture: {
    id: 'arquitectura',
    index: '03',
    label: 'Cluster',
    title: 'Eight runtimes, five databases, one public origin.',
    body: [
      'In the cluster, the browser still talks only to Next.js. Cilium Gateway publishes the web app; the web app proxies /api/graphql to the API facade and /api/agent/* to the agent. The facade is the only thing that knows users, trips, and locations, now over gRPC on the internal network.',
      'Each service owns its database: users, trips, API, and agent use separate PostgreSQL instances; locations keeps MongoDB. The Go broker and email sit outside the synchronous path. Prometheus scrapes the eight runtimes and five exporters; Grafana and Argo CD live in separate namespaces and are never exposed through the Gateway.',
    ],
    flow: [
      {
        label: 'Browser',
        detail: 'HTTPS to the Gateway; session and rendering in Next.js.',
      },
      {
        label: 'Cilium Gateway',
        detail: 'HTTPRoute to the web app; internal services are ClusterIP only.',
      },
      {
        label: 'API facade',
        detail: 'Public GraphQL, internal gRPC h2c, shared token.',
      },
      {
        label: 'Data',
        detail: 'One database per service; no cross-domain joins.',
      },
    ],
    caption:
      'Fig. 01 — Local cluster. The Gateway only publishes the web app; the API facade speaks gRPC to users, trips, and locations. Broker and email stay outside the request. Prometheus and Grafana observe from monitoring.',
    note: 'The diagram shows the final migration state (chart 0.21.0). In Compose, API and agent share Postgres; in Helm each has its own instance. Exporters and Argo CD are installed as separate releases and are not part of the application chart.',
    diagramTitle: 'Local Trip Planner cluster diagram',
    diagramDesc:
      'The browser enters through Cilium Gateway to the Next.js web app. The web app calls the API facade through /api/graphql and the agent through /api/agent. The facade uses gRPC over h2c for users, trips, and locations. Users, trips, API, and agent each have their own PostgreSQL; locations uses MongoDB. The facade publishes invitations to a Go broker that the email service consumes and delivers to Resend or a sink. Prometheus scrapes the runtimes and exporters; Grafana queries Prometheus. Argo CD syncs the Helm chart from Git.',
    deliveryLabel: 'Delivery',
    delivery: [
      {
        label: 'Helm',
        value: 'chart 0.21.0',
        detail: 'One chart, per-environment values, probes, PDB, and NetworkPolicy.',
      },
      {
        label: 'GitOps',
        value: 'Synced / Healthy',
        detail: 'Argo CD tracks HEAD with auto-sync and selfHeal; prune is off.',
      },
      {
        label: 'Images',
        value: 'sha-e377c12',
        detail: 'Six services published by CI; broker and email still local.',
      },
    ],
  },
  decisions: {
    id: 'decisiones',
    index: '04',
    label: 'Decisions',
    title: 'Eight decisions and what they cost.',
    intro:
      'None of these decisions was free. I made each one for a concrete reason and wrote down the price. Several I would make again; others explain why the local cluster does not pretend to be production.',
    labels: { context: 'Context', decision: 'Decision', tradeoff: 'Trade-off' },
    items: [
      {
        id: 'D1',
        title: 'Extract by data ownership, not by layer',
        context:
          'The monolith shared one Postgres and one MongoDB. Any resolver could read any table, and nothing stopped two domains from writing the same record.',
        decision:
          'Each service received its own database: users, trips, API, and agent on separate PostgreSQL instances; locations kept MongoDB. The API composes data through contracts, not joins.',
        tradeoff:
          'Four PostgreSQL instances and one MongoDB to operate, migrate, and back up. In exchange, the boundary stopped being a convention and became a network address.',
      },
      {
        id: 'D2',
        title: 'Strangler with flags and dual protocol',
        context:
          'The demo had to keep working on every slice. A big-bang migration would have broken the product exactly when I needed to compare before and after.',
        decision:
          'Every new service coexisted with the old path. LOCATIONS_MODE=remote|local, HTTP/gRPC transport flags, and fallback internal routes were removed only after Gate 2.',
        tradeoff:
          'Temporary duplicated code and two paths to test. In exchange, rollback was an environment variable, not a redeploy of the previous version.',
      },
      {
        id: 'D3',
        title: 'Transactional outbox and a Go broker instead of Kafka',
        context:
          'Invitations were sent inside the request. Kafka solved decoupling but added Zookeeper, operations, and a dependency that did not fit a single-node demo.',
        decision:
          'The invitation and its event are written in the same Postgres transaction. A relay publishes to the Go broker (topic/offset/ack); the email service long-polls, retries, and dead-letters.',
        tradeoff:
          'A custom broker with semantics to document and test. In exchange, there are no dual writes, the demo does not carry Kafka, and the DLQ can be inspected and replayed.',
      },
      {
        id: 'D4',
        title: 'Public GraphQL, internal gRPC',
        context:
          'The frontend already had a stable GraphQL contract. Internal HTTP calls were untyped strings, and each service evolved at a different speed.',
        decision:
          'GraphQL stayed at the edge. Users, trips, and locations exposed versioned .proto contracts and gRPC over h2c; health and readiness stayed on HTTP.',
        tradeoff:
          'Two protocols, codegen, and compatibility discipline. In exchange, typed contracts, less overhead, and services that can evolve without touching the client.',
      },
      {
        id: 'D5',
        title: 'Helm as the delivery contract',
        context:
          'Compose was the only way to run the stack. The cluster needed repeatable deployments, probes, and secrets without hand-copied YAML.',
        decision:
          'One chart, helm-triplanner, with per-service values blocks, secret references, probes, PDB, and NetworkPolicy. Kind and Compose share the same configuration shape.',
        tradeoff:
          'More template complexity and a chart to maintain. In exchange, helm template became the review artifact and the same chart runs locally and in the cluster.',
      },
      {
        id: 'D6',
        title: 'Cilium Gateway and NetworkPolicy instead of flat ingress',
        context:
          'A classic ingress published the web app but left every pod on a flat network where any service could talk to any other.',
        decision:
          'Cilium Gateway API for north-south traffic and CiliumNetworkPolicy for east-west. Internal services became ClusterIP-only; the Gateway only publishes the web app.',
        tradeoff:
          'Cilium-specific YAML and a WSL2 egress workaround. In exchange, allowed traffic is explicit and there is no accidental public surface.',
      },
      {
        id: 'D7',
        title: 'Instrument every runtime before optimizing',
        context:
          'The migration added network hops. Without metrics, the only signal was that it felt slower, and there was no way to compare services or detect an uninstrumented contract.',
        decision:
          '/metrics on all eight runtimes, ServiceMonitors, 11 dashboards, gRPC counters, p50/p95, and five database exporters. Prometheus and Grafana stayed ClusterIP-only.',
        tradeoff:
          'More configuration to maintain and dashboards that age. In exchange, 13/13 targets and load tests turned latency into evidence, not opinion.',
      },
      {
        id: 'D8',
        title: 'GitOps with selfHeal and prune off',
        context:
          'Helm upgrades from a laptop were not reproducible and could delete PVCs or Secrets. The cluster needed to converge to Git without losing state.',
        decision:
          'Argo CD adopts the existing release, tracks HEAD with auto-sync and selfHeal, and keeps prune off. CI publishes sha-* images and updates values.yaml; manual Helm upgrades are frozen.',
        tradeoff:
          'Another control plane to operate and an egress workaround for the repo server. In exchange, the cluster corrects itself and state is protected from sync.',
      },
    ],
  },
  observability: {
    id: 'observabilidad',
    index: '05',
    label: 'Observability',
    title: 'The migration is finished when you can see it.',
    body: [
      'A microservice without metrics is just a distributed monolith with more ways to fail. Instrumentation started with a simple contract: GET /metrics on every runtime, no database queries, and one ServiceMonitor per service.',
      'The graphs changed the conversation. The overview shows all eight services UP and traffic by service; the users and trips dashboards split gRPC by method, status, and p50/p95 latency; the exporters show connections, cache hit ratio, and transactions per instance. When a load test showed gRPC calls without metrics, it became milestone M25, not a footnote.',
    ],
    stats: [
      {
        value: '13',
        label: 'targets',
        note: '8 runtimes + 4 PostgreSQL + 1 MongoDB',
      },
      {
        value: '11',
        label: 'dashboards',
        note: '8 per service, overview, PostgreSQL, and MongoDB',
      },
      {
        value: '0',
        label: 'errors',
        note: '1,346 attempts and 462 calls in the load tests',
      },
      {
        value: 'p50/p95',
        label: 'latency',
        note: 'on every panel of every service',
      },
    ],
    screenshots: [
      {
        src: '/projects/local-triplanner/overview.png',
        alt: 'Triplanner overview dashboard with all eight services UP, traffic by service, and gRPC',
        title: 'Overview',
        caption: 'All eight runtimes UP, build info, and traffic by service during the load test.',
      },
      {
        src: '/projects/local-triplanner/users-grpc.png',
        alt: 'Users dashboard with gRPC calls by method, status, and p50/p95 latency',
        title: 'Users · gRPC',
        caption: 'GetUser, BatchUsers, and ListFavoriteIds by method, status, and p50/p95 latency.',
      },
      {
        src: '/projects/local-triplanner/trips-grpc.png',
        alt: 'Trips dashboard with gRPC calls and a zero error ratio',
        title: 'Trips · gRPC',
        caption: 'CreateTrip, DeleteTrip, and CreateInvitation with a 0 % error ratio.',
      },
      {
        src: '/projects/local-triplanner/postgres-exporters.png',
        alt: 'PostgreSQL dashboard with four instances, connections, and cache hit ratio',
        title: 'PostgreSQL',
        caption: 'Four instances, connections, cache hit ratio, and transactions per instance.',
      },
      {
        src: '/projects/local-triplanner/mongodb-exporter.png',
        alt: 'MongoDB dashboard with connections, operations, and memory',
        title: 'MongoDB',
        caption: 'Connections, operations, and memory for the place catalogue.',
      },
      {
        src: '/projects/local-triplanner/api-load.png',
        alt: 'API facade dashboard under load with GraphQL, p95 latency, and zero 5xx errors',
        title: 'API facade',
        caption: 'GraphQL and internal routes under load: 5.77 req/s, 228 ms p95, and 0 % 5xx.',
      },
    ],
    caption:
      'Fig. 02 — Grafana screenshots taken from the kind cluster during the observability phase.',
    note: 'Prometheus and Grafana are ClusterIP-only; open them with kubectl port-forward. Dashboards are provisioned as ConfigMaps from the chart and reloaded by the Grafana sidecar.',
  },
  learnings: {
    id: 'aprendizajes',
    index: '06',
    label: 'Learnings',
    title: 'What changed in how I design systems.',
    items: [
      {
        title: 'Boundaries are proven by failure',
        body: 'A diagram says users is separate; shutting down its database and watching what breaks proves it. The consumer and cutover gates exist for that reason.',
      },
      {
        title: 'Cutover is part of the product',
        body: 'Moving users with fixed UUIDs was not a technical detail: it was the difference between a demo that keeps working and one that needs reseeding.',
      },
      {
        title: 'Observability migrates too',
        body: 'gRPC metrics were missing until load made them visible. Instrumentation is not the final step; it is part of every service contract.',
      },
      {
        title: 'GitOps does not fix a badly designed chart',
        body: 'Argo CD can only sync what the chart expresses well. Values, probes, and policies came first; self-heal came after.',
      },
      {
        title: 'Microservices are not the goal',
        body: 'The goal was learning where to cut. Some things stay together on purpose: the agent speaks HTTP, broker and email keep local images, and the demo is still one Compose command.',
      },
    ],
  },
  repo: {
    label: 'The repository',
    title: 'The whole journey lives in local_triplanner.',
    body: 'The code, Helm chart, kind values, dashboards, and 35 migration notes live in the same repository. If you want to see how each decision was made, start with docs/migrations; if you want to run the product, use Docker Compose.',
    cloneLabel: 'Clone the repository',
    cloneCommand: 'git clone https://github.com/MarcoJr1312/local_triplanner.git',
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
    note: 'Then: cd local_triplanner && docker compose -f deploy/docker-compose.yml up --build. Open localhost:3000/login with demo / demo123.',
    repoLabel: 'Open local_triplanner on GitHub',
    repoUrl: 'https://github.com/MarcoJr1312/local_triplanner',
    docsLabel: 'Read the migration notes',
    docsUrl: 'https://github.com/MarcoJr1312/local_triplanner/tree/main/docs/migrations',
  },
  labels: {
    backToWork: 'Back to projects',
    toc: 'On this page',
    figure: 'Figure',
    gates: 'Gates',
    timeline: 'Timeline',
    constraints: 'Rules',
  },
};

export const localCaseStudies: Record<string, Record<Lang, LocalCaseStudy>> = {
  'local-triplanner': {
    es: localEs,
    en: localEn,
  },
};

export const localCaseStudySlugs = Object.keys(localCaseStudies);

export function getLocalCaseStudy(slug: string, lang: Lang): LocalCaseStudy | undefined {
  return localCaseStudies[slug]?.[lang];
}
