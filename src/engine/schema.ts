import type { LayoutElement, Surface } from './types'

export const surfaces: Surface[] = [
  { id: 'story', name: 'Mobile story', subtitle: 'Vertical placement', ratio: '9:16', width: 360, height: 640, accent: '#ff6b4a' },
  { id: 'square', name: 'Social square', subtitle: 'Feed placement', ratio: '1:1', width: 560, height: 560, accent: '#5b5ce2' },
  { id: 'banner', name: 'Web banner', subtitle: 'Desktop placement', ratio: '16:9', width: 720, height: 405, accent: '#2e9c84' },
  { id: 'product', name: 'Product card', subtitle: 'Commerce placement', ratio: '4:5', width: 480, height: 600, accent: '#e09b35' },
]

export const starterElements: LayoutElement[] = [
  { id: 'image', kind: 'image', label: 'Hero image', content: 'Freshly roasted, delivered.', x: 5, y: 5, width: 90, height: 49 },
  { id: 'badge', kind: 'badge', label: 'Badge', content: 'NEW THIS WEEK', x: 8, y: 9, width: 25, height: 5 },
  { id: 'headline', kind: 'headline', label: 'Headline', content: 'Your morning, made better.', x: 8, y: 59, width: 78, height: 14 },
  { id: 'body', kind: 'body', label: 'Supporting copy', content: 'Small-batch coffee delivered on your schedule.', x: 8, y: 76, width: 76, height: 8 },
  { id: 'price', kind: 'price', label: 'Price', content: 'From $18 / month', x: 8, y: 87, width: 38, height: 5 },
  { id: 'cta', kind: 'cta', label: 'Call to action', content: 'Build your box', x: 64, y: 86, width: 28, height: 8 },
]
