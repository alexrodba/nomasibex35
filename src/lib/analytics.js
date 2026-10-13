// GA4 is loaded only after the visitor accepts analytics cookies ("basic"
// consent mode: nothing is sent to Google until then). The choice is kept in
// localStorage so the banner is shown once.

export const CONSENT_KEY = 'nmi35-consent'
export const GRANTED = 'granted'
export const DENIED = 'denied'

let loaded = false

export function getStoredConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY)
  } catch (e) {
    return null
  }
}

export function storeConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value)
  } catch (e) {
    // private mode or storage blocked: the banner will show again next visit
  }
}

export function gtag() {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(arguments)
}

export function loadAnalytics(measurementId) {
  if (loaded || !measurementId || typeof window === 'undefined') return
  loaded = true
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
  gtag('js', new Date())
  // Page views: GA4 sends the first one on config and, through the data
  // stream's enhanced measurement (on by default), one per in-site navigation
  // (browser history changes). The site sends no page views of its own, so
  // nothing is counted twice.
  gtag('config', measurementId, { anonymize_ip: true })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)
}

export function isLoaded() {
  return loaded
}

export function trackEvent(name, params) {
  if (!loaded) return
  gtag('event', name, params)
}
