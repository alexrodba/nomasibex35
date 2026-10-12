# No Más IBEX 35

[nomasibex35.com](https://nomasibex35.com) — alternativas a las empresas del IBEX 35, sector por sector.
Proyecto sin ánimo de lucro, anónimo y de código abierto. Algunos enlaces son de afiliación: los
ingresos cubren los gastos del sitio y el resto se dona a beneficencia.

## Contribuir

- **Sugerir una empresa**: abre un [issue con la plantilla](https://github.com/alexrodba/nomasibex35/issues/new?template=sugerir-empresa.yml).
- **Corregir un dato o un enlace roto**: abre un issue indicando la página.
- **Pull requests**: bienvenidas. El contenido vive en `src/data/` (YAML); el código en `src/`.

## Desarrollo

Requiere Node 22 (`.nvmrc`).

```bash
npm ci
npm run develop   # http://localhost:8000
npm run build     # genera public/
npm run serve     # sirve public/ en http://localhost:9000
```

Analytics (GA4) solo se carga si existe la variable `GATSBY_GA4_ID` y el visitante acepta
las cookies. En local no hace falta definirla.

## Despliegue

Cada push a `master` construye el sitio con GitHub Actions y lo publica en GitHub Pages
(`.github/workflows/deploy.yml`). El dominio se fija en `static/CNAME`.

## Mantenimiento

- **Contenido**: cada ficha en `src/data/companies/` tiene `lastVerified`. La build de producción falla si
  una empresa lleva más de 365 días sin revisar; `npm run check:stale` lista las que se acercan.
- **IBEX 35**: `src/data/ibex35.yaml`. BME revisa el índice en junio y diciembre; un workflow abre un issue
  recordatorio el día 12 de esos meses.
- **Enlaces**: el workflow `Link check` comprueba todos los enlaces externos el día 3 de cada mes y abre un
  issue con los rotos. Para que actualice siempre el mismo issue en vez de crear uno nuevo, define las
  variables de repositorio `LINK_CHECK_ISSUE` y `STALE_CHECK_ISSUE` con el número del issue.
- **Dependencias**: Dependabot, mensual, agrupado.
- **Fotos de empresas**: `npm run photo -- <slug> "File:Nombre.jpg"` descarga una foto de Wikimedia Commons (solo licencias libres: CC0, dominio público, CC BY, CC BY-SA), la redimensiona y escribe el crédito y el enlace en la ficha. El crédito se muestra en la tarjeta.
- **Atribución (UTM)**: todos los enlaces a empresas recomendadas llevan `utm_source=nomasibex35`, `utm_medium=referral`, `utm_campaign=<sector>` y `utm_content=<página>-<cta|name>-<idioma>` (ver `src/lib/utm.js`). Los enlaces de afiliado aprobados no se tocan.
- **Imágenes para redes sociales**: `npm run og` regenera `static/og/` (una por sector y la portada, en castellano y catalán) a partir de `sectors.yaml`. Hay que relanzarlo si cambian nombres, lemas o fotos de sector.
- **Afiliación**: `src/data/referrals.yaml` es el registro; solo las entradas `approved` con `url` se
  muestran como enlace de afiliado (con su etiqueta legal). Los códigos personales "invita a un amigo" no
  se publican.

## Plan de modernización

Ver [docs/MODERNIZATION-PLAN.md](docs/MODERNIZATION-PLAN.md).

## Créditos

Plantilla original: [Forty](https://html5up.net/forty) de HTML5 UP (CCA 3.0), vía
[gatsby-starter-forty](https://github.com/codebushi/gatsby-starter-forty). Fotos: Unsplash
(crédito en cada imagen).
