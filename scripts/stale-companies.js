#!/usr/bin/env node
// Lists companies whose `lastVerified` is older than N days (default 330).
// The production build fails at 365 days (see gatsby-node.js), so this gives
// a month of warning. Usage: node scripts/stale-companies.js [days]
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const days = Number(process.argv[2] || 330)
const dir = path.join(__dirname, '..', 'src', 'data', 'companies')
const now = Date.now()

const stale = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.yaml'))
  .map((f) => yaml.load(fs.readFileSync(path.join(dir, f), 'utf8')))
  .map((c) => ({
    slug: c.slug,
    name: c.name,
    sector: c.sector,
    lastVerified: String(c.lastVerified).slice(0, 10),
    age: Math.floor((now - new Date(c.lastVerified).getTime()) / 86400000),
  }))
  .filter((c) => c.age > days)
  .sort((a, b) => b.age - a.age)

if (stale.length === 0) {
  console.log(`Ninguna empresa supera los ${days} días sin revisar.`)
  process.exit(0)
}

console.log(
  `Estas empresas llevan más de ${days} días sin revisar. La build de producción falla a los 365 días.\n`
)
console.log(
  'Para cada una: comprobar web, propietario y enlace de alta; actualizar la ficha y `lastVerified`.\n'
)
for (const c of stale) {
  console.log(
    `- [ ] **${c.name}** (${c.sector}) — revisada el ${c.lastVerified}, hace ${c.age} días — \`src/data/companies/${c.slug}.yaml\``
  )
}
