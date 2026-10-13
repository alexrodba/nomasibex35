import { getStoredConsent, GRANTED, loadAnalytics } from './src/lib/analytics'

const GA4_ID = process.env.GATSBY_GA4_ID || ''

export const onClientEntry = () => {
  if (GA4_ID && getStoredConsent() === GRANTED) {
    loadAnalytics(GA4_ID)
  }
}
