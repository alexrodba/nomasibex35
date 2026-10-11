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

## Plan de modernización

Ver [docs/MODERNIZATION-PLAN.md](docs/MODERNIZATION-PLAN.md).

## Créditos

Plantilla original: [Forty](https://html5up.net/forty) de HTML5 UP (CCA 3.0), vía
[gatsby-starter-forty](https://github.com/codebushi/gatsby-starter-forty). Fotos: Unsplash
(crédito en cada imagen).
