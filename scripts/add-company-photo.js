#!/usr/bin/env node
// Adds a Wikimedia Commons photo to a company:
//   node scripts/add-company-photo.js <slug> "File:Some photo.jpg"
//   npm run photo -- <slug> "File:Some photo.jpg"
//
// Downloads a 1200px rendition, resizes to max 960px wide (JPEG, metadata
// stripped) into src/assets/images/companies/<slug>.jpg, and writes image,
// imageCredit (author, licence) and imageSource (Commons page) into
// src/data/companies/<slug>.yaml. Only free licences are accepted:
// CC0, public domain, CC BY, CC BY-SA. The credit is shown on the card.
const fs = require('fs')
const os = require('os')
const path = require('path')
const sharp = require('sharp')

const ROOT = path.join(__dirname, '..')
const UA =
  'nomasibex35-site-builder/1.0 (https://nomasibex35.com; github.com/alexrodba/nomasibex35)'
const FREE = /^(CC0|Public domain|PD|CC BY(-SA)?( \d(\.\d)?)?$)/i
const strip = (h) =>
  (h || '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

async function main() {
  const [slug, title] = process.argv.slice(2)
  if (!slug || !title || !title.startsWith('File:')) {
    console.error(
      'Usage: node scripts/add-company-photo.js <slug> "File:Name.jpg"'
    )
    process.exit(2)
  }
  const yamlPath = path.join(ROOT, 'src/data/companies', `${slug}.yaml`)
  if (!fs.existsSync(yamlPath)) throw new Error(`No company file ${yamlPath}`)

  const api =
    'https://commons.wikimedia.org/w/api.php?' +
    new URLSearchParams({
      action: 'query',
      format: 'json',
      titles: title,
      prop: 'imageinfo',
      iiprop: 'url|extmetadata|mime',
      iiurlwidth: '1200',
    })
  const data = await (
    await fetch(api, { headers: { 'User-Agent': UA } })
  ).json()
  const page = Object.values(data.query.pages)[0]
  if (!page.imageinfo) throw new Error(`Not found on Commons: ${title}`)
  const ii = page.imageinfo[0]
  const meta = ii.extmetadata || {}
  const license = strip(meta.LicenseShortName && meta.LicenseShortName.value)
  if (!FREE.test(license)) throw new Error(`Licence not allowed: "${license}"`)
  let artist = strip(meta.Artist && meta.Artist.value) || 'Autor desconocido'
  if (artist.length > 70) artist = artist.slice(0, 67) + '…'

  // Untrusted download goes to its own temp dir; only sharp's re-encode lands in the repo.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'nmi35-photo-'))
  try {
    const res = await fetch(ii.thumburl, { headers: { 'User-Agent': UA } })
    if (!res.ok) throw new Error(`Download failed: HTTP ${res.status}`)
    const raw = path.join(tmp, 'download')
    fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()))
    const out = path.join(ROOT, 'src/assets/images/companies', `${slug}.jpg`)
    await sharp(raw)
      .rotate()
      .resize({ width: 960, withoutEnlargement: true })
      .jpeg({ quality: 74, mozjpeg: true })
      .toFile(out)
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true })
  }

  const q = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'
  let y = fs.readFileSync(yamlPath, 'utf8')
  y = y.replace(
    /^image: .*$/m,
    `image: ../../assets/images/companies/${slug}.jpg`
  )
  y = y.replace(/^imageSource: .*\n/m, '')
  y = y.replace(
    /^imageCredit: .*$/m,
    `imageCredit: ${q(`${artist}, ${license}, Wikimedia Commons`)}\nimageSource: ${ii.descriptionurl}`
  )
  fs.writeFileSync(yamlPath, y)
  console.log(`${slug}: ${title} (${license}, ${artist})`)
}

main().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
