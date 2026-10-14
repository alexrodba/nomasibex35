const ca = {
  code: 'ca',
  ogLocale: 'ca_ES',
  name: 'Català',
  short: 'CA',
  switchTo: 'Castellano',
  slugs: {
    directory: 'empreses',
    cookies: 'cookies',
    about: 'sobre',
    legal: 'avis-legal',
    transparency: 'transparencia',
  },
  nav: {
    home: 'Inici',
    directory: 'Totes les empreses',
    about: 'Sobre el projecte',
    menu: 'Menú',
    close: 'Tanca',
    languageLabel: 'Idioma',
  },
  home: {
    title: 'No més IBEX 35',
    subtitle:
      "Un lloc web responsable on trobaràs alternatives més ètiques a les empreses de l'IBEX 35",
    start: 'Comença',
    allHeading: 'Totes les empreses',
    allText:
      'Mitjançant el següent enllaç podràs veure totes les empreses en una sola pàgina. Aquest llistat es va actualitzant constantment.',
    allButton: 'Veure totes les empreses',
  },
  sector: {
    ibexList: "Les empreses d'aquest sector que cotitzen a l'IBEX 35 són:",
    alternatives: 'Les alternatives que proposem:',
    wipTitle: 'Secció en construcció',
    wipText:
      'Encara no tenim alternatives verificades per a aquest sector. Si coneixes una empresa que hi encaixi, proposa-la i la revisarem.',
    suggest: 'Suggerir una empresa',
    signup: "Dona't d'alta",
    visit: 'Anar al web',
    affiliate: "enllaç d'afiliat",
    affiliateTitle:
      "Si contractes a través d'aquest enllaç, No Más IBEX 35 rep una comissió però a tu no et costa ni res més.",
    ownedBy: 'Propietat de',
    hq: 'Seu',
    verified: 'Revisat',
    warning: 'Atenció',
    photo: 'Foto',
    disclaimer:
      "La informació de cada empresa surt de fonts públiques i es va revisar en la data indicada a la seva fitxa. Pot haver canviat: comprova-la al web de l'empresa abans de contractar. Això no és assessorament financer ni legal.",
  },
  tags: {
    cooperativa: 'Cooperativa',
    bcorp: 'B Corp',
    renovable: '100% renovable',
    'banca-etica': 'Banca ètica',
    mutua: 'Mútua',
    local: 'Empresa local',
    multinacional: 'Multinacional',
    afiliado: "Enllaç d'afiliat",
    publica: 'Empresa pública',
  },
  ownership: {
    cooperativa: 'Cooperativa',
    pyme: 'Pime',
    mutua: 'Mútua',
    fundacion: 'Fundació',
    multinacional: 'Multinacional',
    publica: 'Empresa pública',
    privada: 'Empresa privada',
    asociacion: 'Associació',
  },
  directory: {
    title: 'Totes les empreses',
    banner: 'Totes les alternatives, sector per sector',
    intro:
      "Cada empresa porta etiquetes perquè jutgis tu mateix: cooperativa, banca ètica, renovable, local o multinacional. Les que tenen enllaç d'afiliat ho indiquen.",
    filter: 'Filtra per etiqueta',
    all: 'Totes',
    none: 'Cap empresa amb aquesta etiqueta.',
  },
  footer: {
    text: "No Más IBEX 35 és un projecte sense ànim de lucre, anònim i de codi obert. Alguns dels enllaços a les empreses alternatives són d'afiliació i algun dia, potser, si Déu vol, perquè de moment no, però esperem que la situació millori, uns ingressos a No Más IBEX 35. Farem servir aquests ingressos per cobrir les despeses bàsiques d'aquest lloc web i reinvertir-ho en publicitat per fer-ho arribar a més gent.",
    suggest: 'Suggerir una empresa',
    code: 'Codi a GitHub',
    design: 'Disseny',
  },
  consent: {
    text: "Fem servir Google Analytics per saber quines seccions es visiten més. Només s'activa si ho acceptes.",
    more: 'Més informació',
    accept: 'Accepta',
    reject: 'Rebutja',
    label: 'Avís de galetes',
  },
  cookies: {
    title: 'Política de galetes',
    description:
      'Quines galetes fa servir No Más IBEX 35 i com canviar la teva elecció.',
    p1: "Aquest lloc no fa servir galetes pròpies. Si acceptes l'avís que apareix a la primera visita, carreguem Google Analytics 4, que instal·la galetes de mesura (_ga, _ga_*) per comptar visites de forma agregada i amb la IP anonimitzada. Si ho rebutges, no es carrega res de Google i no s'instal·la cap galeta.",
    p2: "La teva elecció es desa a l'emmagatzematge local del navegador per no tornar-te a preguntar. Pots canviar-la aquí:",
    withdraw: 'Retirar el consentiment',
    askAgain: 'Tornar a preguntar',
    p3: "Els enllaços a empreses externes poden portar paràmetres d'afiliació; en fer-hi clic surts d'aquest lloc i s'apliquen les polítiques de l'empresa de destinació.",
  },
  notFound: {
    title: 'Pàgina no trobada',
    text: 'Aquesta pàgina no existeix (de moment).',
    back: "Tornar a l'inici",
  },
  seo: {
    description:
      "Alternatives ètiques, cooperatives i locals a les empreses de l'IBEX 35: energia, banca, telefonia, habitatge, assegurances, consum i turisme.",
    sectorTitle: (name) => `Alternatives a l'IBEX 35: ${name}`,
    sectorDescription: (name) =>
      `Empreses de l'IBEX 35 en ${name.toLowerCase()} i les alternatives que proposem.`,
  },
}

export default ca
