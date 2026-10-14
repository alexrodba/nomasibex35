#!/usr/bin/env node
// Adds a photo to a company from Wikimedia Commons or Openverse:
//   npm run photo -- <slug> "File:Some photo.jpg"        (Wikimedia Commons)
//   npm run photo -- <slug> openverse:<image-uuid>       (Openverse: Flickr, etc.)
//
// Only licences that need NO visible attribution are accepted: CC0 and public
// domain (Commons "Public domain", Openverse "pdm"). The photo is resized to
// max 960px wide (JPEG, metadata stripped) into
// src/assets/images/companies/<slug>.jpg, and image, imageCredit (author,
// licence, source) and imageSource (landing page) are written into
// src/data/companies/<slug>.yaml for our records.
const fs = require('fs')
const os = require('os')
const path = require('path')
const sharp = require('sharp')

const ROOT = path.join(__dirname, '..')
const UA =
  'nomasibex35-site-builder/1.0 (https://nomasibex35.com; github.com/alexrodba/nomasibex35)'
const strip = (h) =>
  (h || '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

async function json(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.json()
}

async function fromCommons(title) {
  const data = await json(
    'https://commons.wikimedia.org/w/api.php?' +
      new URLSearchParams({
        action: 'query',
        format: 'json',
        titles: title,
        prop: 'imageinfo',
        iiprop: 'url|extmetadata',
        iiurlwidth: '1200',
      })
  )
  const page = Object.values(data.query.pages)[0]
  if (!page.imageinfo) throw new Error(`Not found on Commons: ${title}`)
  const ii = page.imageinfo[0]
  const meta = ii.extmetadata || {}
  const license = strip(meta.LicenseShortName && meta.LicenseShortName.value)
  if (!/^(CC0|Public domain|PD)/i.test(license)) {
    throw new Error(`Licence needs attribution or is unclear: "${license}"`)
  }
  return {
    download: ii.thumburl,
    author: strip(meta.Artist && meta.Artist.value),
    license,
    source: 'Wikimedia Commons',
    landing: ii.descriptionurl,
  }
}

async function fromOpenverse(id) {
  const x = await json(`https://api.openverse.org/v1/images/${id}/`)
  if (!['cc0', 'pdm'].includes(x.license)) {
    throw new Error(`Licence needs attribution: "${x.license}"`)
  }
  return {
    download: x.url,
    author: strip(x.creator),
    license: x.license === 'cc0' ? 'CC0' : 'Public domain',
    source: `Openverse/${x.source || x.provider}`,
    landing: x.foreign_landing_url,
  }
}

async function main() {
  const [slug, ref] = process.argv.slice(2)
  if (
    !slug ||
    !ref ||
    !(ref.startsWith('File:') || ref.startsWith('openverse:'))
  ) {
    console.error(
      'Usage: node scripts/add-company-photo.js <slug> "File:Name.jpg" | openverse:<id>'
    )
    process.exit(2)
  }
  const yamlPath = path.join(ROOT, 'src/data/companies', `${slug}.yaml`)
  if (!fs.existsSync(yamlPath)) throw new Error(`No company file ${yamlPath}`)

  const info = ref.startsWith('File:')
    ? await fromCommons(ref)
    : await fromOpenverse(ref.slice('openverse:'.length))
  let author = info.author || 'Autor desconocido'
  if (author.length > 70) author = author.slice(0, 67) + '…'

  // Untrusted download goes to its own temp dir; only sharp's re-encode lands in the repo.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'nmi35-photo-'))
  try {
    const res = await fetch(info.download, { headers: { 'User-Agent': UA } })
    if (!res.ok) throw new Error(`Download failed: HTTP ${res.status}`)
    const raw = path.join(tmp, 'download')
    fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()))
    await sharp(raw)
      .rotate()
      .resize({ width: 960, withoutEnlargement: true })
      .jpeg({ quality: 74, mozjpeg: true })
      .toFile(path.join(ROOT, 'src/assets/images/companies', `${slug}.jpg`))
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
    `imageCredit: ${q(`${author}, ${info.license}, ${info.source}`)}\nimageSource: ${info.landing}`
  )
  fs.writeFileSync(yamlPath, y)
  console.log(`${slug}: ${ref} (${info.license}, ${author})`)
}

main().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
