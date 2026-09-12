import type { LayoutElement, LayoutScore, Surface } from './types'

export function scoreLayout(elements: LayoutElement[], surface: Surface): LayoutScore {
  const headline = elements.find((element) => element.kind === 'headline')
  const cta = elements.find((element) => element.kind === 'cta')
  const checks: LayoutScore['checks'] = []
  const headlineRisk = headline ? headline.content.length > (surface.id === 'banner' ? 42 : 31) : true
  const ctaRisk = !cta || cta.x + cta.width > 96 || cta.y + cta.height > 96
  const image = elements.find((element) => element.kind === 'image')
  const safeAreaRisk = elements.some((element) => element.x < 4 || element.y < 4 || element.x + element.width > 96 || element.y + element.height > 96)

  checks.push({ label: 'Headline legibility', detail: headlineRisk ? 'Long copy may wrap into the CTA zone.' : 'Copy has enough breathing room.', status: headlineRisk ? 'watch' : 'pass' })
  checks.push({ label: 'CTA visibility', detail: ctaRisk ? 'Action could be clipped at this surface size.' : 'Action stays inside the tap-safe area.', status: ctaRisk ? 'risk' : 'pass' })
  checks.push({ label: 'Media coverage', detail: image ? 'Hero media fills the primary attention zone.' : 'Add media to anchor the composition.', status: image ? 'pass' : 'watch' })
  checks.push({ label: 'Safe area', detail: safeAreaRisk ? 'Keep important content 4% away from the edge.' : 'All elements respect the safe area.', status: safeAreaRisk ? 'watch' : 'pass' })

  const riskCount = checks.filter((check) => check.status === 'risk').length
  const watchCount = checks.filter((check) => check.status === 'watch').length
  const value = Math.max(52, 100 - riskCount * 18 - watchCount * 7)
  return { value, status: riskCount ? 'risk' : watchCount > 1 ? 'watch' : 'healthy', checks }
}
