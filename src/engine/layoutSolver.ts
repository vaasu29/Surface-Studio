import type { LayoutElement, Surface } from './types'

export function adaptElements(elements: LayoutElement[], surface: Surface): LayoutElement[] {
  return elements.map((element) => {
    if (surface.id === 'banner') {
      if (element.kind === 'image') return { ...element, x: 44, y: 5, width: 51, height: 90 }
      if (element.kind === 'headline') return { ...element, x: 7, y: 26, width: 34, height: 22 }
      if (element.kind === 'body') return { ...element, x: 7, y: 52, width: 32, height: 12 }
      if (element.kind === 'cta') return { ...element, x: 7, y: 76, width: 25, height: 9 }
      if (element.kind === 'price') return { ...element, x: 7, y: 68, width: 27, height: 5 }
      if (element.kind === 'badge') return { ...element, x: 7, y: 17, width: 23, height: 5 }
    }
    if (surface.id === 'product') {
      if (element.kind === 'image') return { ...element, x: 5, y: 5, width: 90, height: 57 }
      if (element.kind === 'headline') return { ...element, x: 8, y: 66, width: 82, height: 12 }
      if (element.kind === 'body') return { ...element, x: 8, y: 80, width: 82, height: 7 }
      if (element.kind === 'cta') return { ...element, x: 58, y: 89, width: 34, height: 7 }
      if (element.kind === 'price') return { ...element, x: 8, y: 90, width: 36, height: 5 }
      if (element.kind === 'badge') return { ...element, x: 8, y: 9, width: 25, height: 5 }
    }
    if (surface.id === 'square') {
      if (element.kind === 'image') return { ...element, x: 5, y: 5, width: 90, height: 42 }
      if (element.kind === 'headline') return { ...element, x: 8, y: 54, width: 79, height: 15 }
      if (element.kind === 'body') return { ...element, x: 8, y: 72, width: 74, height: 8 }
      if (element.kind === 'cta') return { ...element, x: 65, y: 87, width: 27, height: 7 }
      if (element.kind === 'price') return { ...element, x: 8, y: 88, width: 39, height: 5 }
      if (element.kind === 'badge') return { ...element, x: 8, y: 9, width: 25, height: 5 }
    }
    return element
  })
}
