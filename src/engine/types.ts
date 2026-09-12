export type SurfaceId = 'story' | 'square' | 'banner' | 'product'

export type LayoutElement = {
  id: string
  kind: 'headline' | 'body' | 'cta' | 'price' | 'badge' | 'image'
  label: string
  content: string
  x: number
  y: number
  width: number
  height: number
  color?: string
}

export type Surface = {
  id: SurfaceId
  name: string
  subtitle: string
  ratio: string
  width: number
  height: number
  accent: string
}

export type LayoutScore = {
  value: number
  status: 'healthy' | 'watch' | 'risk'
  checks: { label: string; detail: string; status: 'pass' | 'watch' | 'risk' }[]
}
