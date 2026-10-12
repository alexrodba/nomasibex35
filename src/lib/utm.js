// UTM tagging for outgoing links to recommended companies, so each company
// (and we, if they share data) can attribute visits to No Más IBEX 35.
//
//   utm_source   = nomasibex35            (always)
//   utm_medium   = referral               (always)
//   utm_campaign = <sector key>           e.g. energia, banca
//   utm_content  = <page>-<placement>-<locale>
//                  page: sector | directory; placement: cta | name
//                  e.g. sector-cta-es, directory-name-ca
//
// Existing utm_* parameters in the URL are kept, never overwritten.
// Affiliate links are not passed through here: networks use their own click IDs.

export const UTM_SOURCE = 'nomasibex35'
export const UTM_MEDIUM = 'referral'

export function withUtm(
  href,
  { campaign, page = 'sector', placement = 'cta', locale = 'es' } = {}
) {
  if (!href) return href
  let url
  try {
    url = new URL(href)
  } catch (e) {
    return href
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return href
  const params = {
    utm_source: UTM_SOURCE,
    utm_medium: UTM_MEDIUM,
    utm_campaign: campaign,
    utm_content: [page, placement, locale].filter(Boolean).join('-'),
  }
  for (const [key, value] of Object.entries(params)) {
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value)
  }
  return url.toString()
}
