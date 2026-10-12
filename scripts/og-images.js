#!/usr/bin/env node
// Generates the Open Graph / social sharing images (1200x630) into static/og/:
// one per sector and one for the home page, in Spanish and Catalan.
// Re-run after changing sector names, taglines or photos: npm run og
const fs = require('fs')
const os = require('os')
const path = require('path')
const zlib = require('zlib')
const yaml = require('js-yaml')

const ROOT = path.join(__dirname, '..')
const OUT = path.join(ROOT, 'static', 'og')
const W = 1200
const H = 630

// Keep in sync with src/assets/scss/libs/_vars.scss
const PALETTE = {
  bg: '#242943',
  style1: '#6fc3df',
  style2: '#8d82c4',
  style3: '#ec8d81',
  style4: '#e7b788',
  style5: '#8ea9e8',
  style6: '#87c5a4',
}

const HOME = {
  es: {
    title: 'No más IBEX 35',
    tagline:
      'Alternativas éticas, cooperativas y locales a las empresas del IBEX 35',
  },
  ca: {
    title: 'No més IBEX 35',
    tagline:
      "Alternatives ètiques, cooperatives i locals a les empreses de l'IBEX 35",
  },
}

// --- WOFF 1.0 -> TTF, so pango can use the site's font without extra files ---
function woffToTtf(woffPath) {
  const b = fs.readFileSync(woffPath)
  const flavor = b.readUInt32BE(4)
  const numTables = b.readUInt16BE(12)
  const tables = []
  for (let i = 0; i < numTables; i++) {
    const o = 44 + i * 20
    const tag = b.toString('latin1', o, o + 4)
    const offset = b.readUInt32BE(o + 4)
    const compLength = b.readUInt32BE(o + 8)
    const origLength = b.readUInt32BE(o + 12)
    const checksum = b.readUInt32BE(o + 16)
    const raw = b.subarray(offset, offset + compLength)
    const data = compLength < origLength ? zlib.inflateSync(raw) : raw
    tables.push({ tag, checksum, data })
  }
  let pow = 1
  let log = 0
  while (pow * 2 <= numTables) {
    pow *= 2
    log++
  }
  const head = Buffer.alloc(12 + numTables * 16)
  head.writeUInt32BE(flavor, 0)
  head.writeUInt16BE(numTables, 4)
  head.writeUInt16BE(pow * 16, 6)
  head.writeUInt16BE(log, 8)
  head.writeUInt16BE(numTables * 16 - pow * 16, 10)
  let offset = head.length
  const bodies = []
  tables.forEach((t, i) => {
    const o = 12 + i * 16
    head.write(t.tag, o, 4, 'latin1')
    head.writeUInt32BE(t.checksum, o + 4)
    head.writeUInt32BE(offset, o + 8)
    head.writeUInt32BE(t.data.length, o + 12)
    const pad = (4 - (t.data.length % 4)) % 4
    bodies.push(t.data, Buffer.alloc(pad))
    offset += t.data.length + pad
  })
  const out = path.join(FONT_TMP, path.basename(woffPath, '.woff') + '.ttf')
  fs.writeFileSync(out, Buffer.concat([head, ...bodies]))
  return out
}

// Private fontconfig setup: a temp dir with the converted fonts and a minimal
// fonts.conf, set before sharp (and its bundled fontconfig) is loaded.
const FONT_TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'nmi35-og-'))
const FONT_DIR = path.join(
  ROOT,
  'node_modules',
  '@fontsource',
  'source-sans-3',
  'files'
)
const FONT_SEMIBOLD = woffToTtf(
  path.join(FONT_DIR, 'source-sans-3-latin-600-normal.woff')
)
const FONT_LIGHT = woffToTtf(
  path.join(FONT_DIR, 'source-sans-3-latin-300-normal.woff')
)
fs.writeFileSync(
  path.join(FONT_TMP, 'fonts.conf'),
  `<?xml version="1.0"?><fontconfig><dir>${FONT_TMP}</dir><cachedir>${FONT_TMP}/cache</cachedir></fontconfig>`
)
process.env.FONTCONFIG_FILE = path.join(FONT_TMP, 'fonts.conf')
const sharp = require('sharp')
// Family names embedded in the @fontsource files
const FAMILY = {
  [FONT_SEMIBOLD]: 'Source Sans 3 SemiBold',
  [FONT_LIGHT]: 'Source Sans 3 Light',
}

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function text(str, { size, fontfile, width, spacing = 0, upper = false }) {
  const s = upper ? str.toUpperCase() : str
  return sharp({
    text: {
      text: `<span foreground="#ffffff" letter_spacing="${spacing * 1024}">${esc(s)}</span>`,
      font: `${FAMILY[fontfile]} ${size}px`,
      fontfile,
      rgba: true,
      width,
      wrap: 'word',
      dpi: 72,
    },
  })
    .png()
    .toBuffer()
}

function mark(size) {
  // Same drawing as static/favicon.svg, without the background tile.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
    <rect width="64" height="64" rx="14" fill="${PALETTE.bg}"/>
    <g fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 15 H27 L19.5 26.5 C26 26.5 29.5 30.5 29.5 36 C29.5 42.5 24.5 47 18.5 47 C15.5 47 13 46.3 11.5 45"/>
      <path d="M53 15 H38.5 L36.5 29 C38.5 27.8 41 27 43.5 27 C49 27 53.5 31 53.5 37 C53.5 43 49 47 43 47 C39.5 47 36.5 45.5 34.5 43"/>
    </g>
    <line x1="8" y1="55" x2="56" y2="9" stroke="#ec8d81" stroke-width="6" stroke-linecap="round"/>
  </svg>`
  return Buffer.from(svg)
}

async function render({
  photo,
  tint,
  tintOpacity,
  brand,
  title,
  tagline,
  out,
}) {
  const base = await sharp(photo)
    .resize(W, H, { fit: 'cover' })
    .grayscale()
    .toBuffer()
  const overlay = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <rect width="${W}" height="${H}" fill="${PALETTE.bg}" fill-opacity="0.45"/>
      <rect width="${W}" height="${H}" fill="${tint}" fill-opacity="${tintOpacity}" style="mix-blend-mode:multiply"/>
      <rect width="${W}" height="${H}" fill="${PALETTE.bg}" fill-opacity="0.25"/>
      <rect y="${H - 120}" width="${W}" height="120" fill="${PALETTE.bg}" fill-opacity="0.55"/>
    </svg>`
  )
  const [brandImg, titleImg, taglineImg, urlImg] = await Promise.all([
    text(brand, { size: 30, fontfile: FONT_SEMIBOLD, spacing: 6, upper: true }),
    text(title, { size: 112, fontfile: FONT_SEMIBOLD, width: W - 160 }),
    text(tagline, { size: 40, fontfile: FONT_LIGHT, width: W - 160 }),
    text('nomasibex35.com', {
      size: 30,
      fontfile: FONT_SEMIBOLD,
      spacing: 4,
      upper: true,
    }),
  ])
  const titleMeta = await sharp(titleImg).metadata()
  const titleTop = 250
  const ruleTop = titleTop + titleMeta.height + 18
  const rule = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="3"><rect width="360" height="3" fill="#fff"/></svg>`
  )
  await sharp(base)
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: mark(72), left: 80, top: 64 },
      { input: brandImg, left: 172, top: 84 },
      { input: titleImg, left: 80, top: titleTop },
      { input: rule, left: 80, top: ruleTop },
      { input: taglineImg, left: 80, top: ruleTop + 32 },
      { input: urlImg, left: 80, top: H - 78 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out)
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true })
  const sectors = yaml.load(
    fs.readFileSync(path.join(ROOT, 'src/data/sectors.yaml'), 'utf8')
  )
  const jobs = []
  for (const locale of ['es', 'ca']) {
    const brand = locale === 'ca' ? 'No més IBEX 35' : 'No más IBEX 35'
    jobs.push(
      render({
        photo: path.join(ROOT, 'src/assets/images/banner.jpg'),
        tint: PALETTE.bg,
        tintOpacity: 0.82,
        brand,
        title: HOME[locale].title,
        tagline: HOME[locale].tagline,
        out: path.join(OUT, `${locale}-home.jpg`),
      })
    )
    for (const s of sectors) {
      jobs.push(
        render({
          photo: path.join(ROOT, 'src/data', s.image),
          tint: PALETTE[s.style] || PALETTE.style2,
          tintOpacity: 0.9,
          brand,
          title: s.name[locale],
          tagline: s.tagline[locale],
          out: path.join(OUT, `${locale}-${s.key}.jpg`),
        })
      )
    }
  }
  await Promise.all(jobs)
  console.log(`Wrote ${jobs.length} images to static/og/`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(() => fs.rmSync(FONT_TMP, { recursive: true, force: true }))
