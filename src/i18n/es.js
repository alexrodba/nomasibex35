const es = {
  code: 'es',
  ogLocale: 'es_ES',
  name: 'Castellano',
  short: 'ES',
  switchTo: 'Català',
  slugs: {
    directory: 'empresas',
    cookies: 'cookies',
    about: 'sobre',
    legal: 'aviso-legal',
    transparency: 'transparencia',
  },
  nav: {
    home: 'Inicio',
    directory: 'Todas las empresas',
    about: 'Sobre el proyecto',
    menu: 'Menú',
    close: 'Cerrar',
    languageLabel: 'Idioma',
  },
  home: {
    title: 'No más IBEX 35',
    subtitle:
      'Un sitio web responsable donde encontrarás alternativas más éticas a las empresas del IBEX 35',
    start: 'Empezar',
    allHeading: 'Todas las empresas',
    allText:
      'No Más IBEX 35 es un sitio web sin ánimo de lucro que proporciona información pública a quien quiera encontrar otras opciones a las empresas listadas en el IBEX 35. Algunos de los enlaces a las empresas alternativas son de afiliación y reportan unos ingresos a No Más IBEX 35. Usaremos estos ingresos para cubrir los gastos básicos de este sitio web y el resto lo donaremos a beneficencia.',
    allButton: 'Ver todas las empresas',
  },
  sector: {
    ibexList: 'Las empresas de este sector listadas en el IBEX 35 son:',
    alternatives: 'Las alternativas que proponemos:',
    wipTitle: 'Sección en construcción',
    wipText:
      'Todavía no tenemos alternativas verificadas para este sector. Si conoces una empresa que encaje, propónla y la revisaremos.',
    suggest: 'Sugerir una empresa',
    signup: 'Date de alta',
    visit: 'Ir a la web',
    affiliate: 'enlace de afiliado',
    affiliateTitle:
      'Si contratas a través de este enlace, No Más IBEX 35 recibe una comisión. No te cuesta nada más.',
    ownedBy: 'Propiedad de',
    hq: 'Sede',
    verified: 'Revisado',
    warning: 'Atención',
  },
  tags: {
    cooperativa: 'Cooperativa',
    bcorp: 'B Corp',
    renovable: '100% renovable',
    'banca-etica': 'Banca ética',
    mutua: 'Mutua',
    local: 'Empresa local',
    multinacional: 'Multinacional',
    afiliado: 'Enlace de afiliado',
    publica: 'Empresa pública',
  },
  ownership: {
    cooperativa: 'Cooperativa',
    pyme: 'Pyme',
    mutua: 'Mutua',
    fundacion: 'Fundación',
    multinacional: 'Multinacional',
    publica: 'Empresa pública',
    privada: 'Empresa privada',
    asociacion: 'Asociación',
  },
  directory: {
    title: 'Todas las empresas',
    banner: 'Todas las alternativas, sector por sector',
    intro:
      'Cada empresa lleva etiquetas para que juzgues por ti mismo: cooperativa, banca ética, renovable, local o multinacional. Las que tienen enlace de afiliado lo indican.',
    filter: 'Filtrar por etiqueta',
    all: 'Todas',
    none: 'Ninguna empresa con esa etiqueta.',
  },
  footer: {
    text: 'No Más IBEX 35 es un proyecto sin ánimo de lucro, anónimo y de código abierto. Algunos enlaces son de afiliación: los ingresos cubren los gastos del sitio y el resto se dona a beneficencia.',
    suggest: 'Sugerir una empresa',
    code: 'Código en GitHub',
    design: 'Diseño',
  },
  consent: {
    text: 'Usamos Google Analytics para saber qué secciones se visitan más. Solo se activa si aceptas.',
    more: 'Más información',
    accept: 'Aceptar',
    reject: 'Rechazar',
    label: 'Aviso de cookies',
  },
  cookies: {
    title: 'Política de cookies',
    description: 'Qué cookies usa No Más IBEX 35 y cómo cambiar tu elección.',
    p1: 'Este sitio no usa cookies propias. Si aceptas el aviso que aparece en tu primera visita, cargamos Google Analytics 4, que instala cookies de medición (_ga, _ga_*) para contar visitas de forma agregada y con la IP anonimizada. Si lo rechazas, no se carga nada de Google y no se instala ninguna cookie.',
    p2: 'Tu elección se guarda en el almacenamiento local de tu navegador para no volver a preguntarte. Puedes cambiarla aquí:',
    withdraw: 'Retirar el consentimiento',
    askAgain: 'Volver a preguntar',
    p3: 'Los enlaces a empresas externas pueden llevar parámetros de afiliación; al hacer clic sales de este sitio y se aplican las políticas de la empresa de destino.',
  },
  notFound: {
    title: 'Página no encontrada',
    text: 'Esta página no existe (de momento).',
    back: 'Volver al inicio',
  },
  seo: {
    description:
      'Alternativas éticas, cooperativas y locales a las empresas del IBEX 35: energía, banca, telefonía, vivienda, seguros, consumo y turismo.',
    sectorTitle: (name) => `Alternativas al IBEX 35: ${name}`,
    sectorDescription: (name) =>
      `Empresas del IBEX 35 en ${name.toLowerCase()} y las alternativas que proponemos.`,
  },
}

export default es
