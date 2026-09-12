import { useMemo, useState } from 'react'
import { Check, ChevronDown, Code2, Copy, Download, Eye, Gauge, GitBranch, Layers3, LayoutGrid, PanelLeft, Plus, RotateCcw, Share2, Sparkles, WandSparkles, X, Zap } from 'lucide-react'
import { adaptElements } from './engine/layoutSolver'
import { scoreLayout } from './engine/scoring'
import { starterElements, surfaces } from './engine/schema'
import type { LayoutElement, SurfaceId } from './engine/types'

export function App() {
  const [activeSurface, setActiveSurface] = useState<SurfaceId>('story')
  const [elements, setElements] = useState<LayoutElement[]>(starterElements)
  const [selectedId, setSelectedId] = useState('headline')
  const [showCode, setShowCode] = useState(false)
  const surface = surfaces.find((item) => item.id === activeSurface)!
  const adapted = useMemo(() => adaptElements(elements, surface), [elements, surface])
  const score = useMemo(() => scoreLayout(adapted, surface), [adapted, surface])
  const selected = elements.find((element) => element.id === selectedId)

  const updateSelected = (changes: Partial<LayoutElement>) => {
    setElements((current) => current.map((element) => element.id === selectedId ? { ...element, ...changes } : element))
  }

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="brand-mark"><Sparkles size={15} /></div><span>ALE//CORE</span><span className="beta">R&D</span></div>
      <div className="topbar-center"><span className="status-dot" /> Workspace / MULTI_SURFACE_ADAPTIVE / <strong>PROFILER</strong></div>
      <div className="top-actions"><div className="sync-pill"><span className="status-dot" /> SYNCED: 60FPS</div><button className="button button-primary"><RotateCcw size={15} /> Recalculate</button><div className="avatar">AK</div></div>
    </header>

    <main className="workspace">
      <aside className="left-rail">
        <div className="rail-section"><div className="section-label">Workspace</div><button className="rail-item active"><LayoutGrid size={16} /> Campaign canvas</button><button className="rail-item"><Layers3 size={16} /> Components <span className="count">6</span></button><button className="rail-item"><Code2 size={16} /> Schema explorer</button></div>
        <div className="rail-section surfaces"><div className="section-label">Surfaces <button className="mini-button" title="Add surface"><Plus size={14} /></button></div>{surfaces.map((item) => <button key={item.id} className={`surface-item ${activeSurface === item.id ? 'selected' : ''}`} onClick={() => setActiveSurface(item.id)}><span className="surface-icon" style={{ background: item.accent }} /> <span><strong>{item.name}</strong><small>{item.ratio} / {item.subtitle}</small></span><ChevronDown size={14} className="surface-chevron" /></button>)}</div>
        <div className="rail-bottom"><div className="section-label">Project</div><div className="project-card"><div className="project-icon"><Zap size={14} /></div><div><strong>morning-box / v3</strong><small>Synced to GitHub</small></div><Check size={15} className="project-check" /></div></div>
      </aside>

      <section className="canvas-area">
        <section className="telemetry-banner"><div className="quality-block"><div className="quality-ring"><span>{score.value}</span></div><div><div className="metric-label">CQI INDEX <span className="grade">GRADE B+</span></div><strong>Optimal synthetic quality</strong><small>Convergence threshold reached • {score.checks.filter((check) => check.status === 'pass').length}/{score.checks.length} passes</small></div></div><div className="surface-metrics">{surfaces.map((item, index) => <button key={item.id} className={`surface-metric ${activeSurface === item.id ? 'active' : ''}`} onClick={() => setActiveSurface(item.id)}><span className="metric-label">{item.ratio} {item.name.split(' ')[0]}</span><strong>{Math.max(68, score.value - index * 4)}% {index === 1 ? 'WARN' : 'PASS'}</strong></button>)}</div><div className="telemetry-actions"><button className="button button-muted"><Gauge size={15} /> Run heuristic sweep</button><button className="button button-secondary" onClick={() => setShowCode(true)}><Download size={15} /> Export JSON</button><button className="button button-primary" onClick={() => setElements(starterElements)}><WandSparkles size={15} /> Auto-fix violations</button></div></section>
        <div className="canvas-header"><div><div className="eyebrow"><span className="live-pill">LIVE</span> Viewport telemetry</div><h1>Adaptive surface profiler</h1><p>One source of truth, four surfaces, zero layout surprises.</p></div><div className="canvas-tools"><button className="button button-light"><Eye size={15} /> Preview mode</button><button className="icon-button" title="Toggle panels" onClick={() => setShowCode(!showCode)}><PanelLeft size={16} /></button></div></div>
        <div className="surface-tabs">{surfaces.map((item) => <button key={item.id} className={activeSurface === item.id ? 'active' : ''} onClick={() => setActiveSurface(item.id)}>{item.name}<span>{item.ratio}</span></button>)}</div>
        <div className="preview-stage"><div className={`ad-preview ${activeSurface}`} style={{ aspectRatio: `${surface.width} / ${surface.height}` }}>
          {adapted.map((element) => <PreviewElement key={element.id} element={element} surface={surface.id} selected={selectedId === element.id} onClick={() => setSelectedId(element.id)} />)}
        </div><div className="stage-caption"><span><span className="caption-dot" /> Rendering at {surface.width} x {surface.height}px</span><span>Grid 8px <span className="caption-separator">/</span> Safe area on</span></div></div>
        <div className="bottom-insight"><div className="insight-icon"><WandSparkles size={16} /></div><div><strong>Smart adaptation active</strong><p>Elements reflow by surface rules. Try switching to Web banner to see the composition change.</p></div><button className="text-button">View rules <ChevronDown size={14} /></button></div>
        <div className="diagnostic-grid">{score.checks.slice(0, 3).map((check, index) => <div className="diagnostic-card" key={check.label}><div className="diagnostic-top"><span className={`diagnostic-tag ${check.status}`}>{check.status === 'pass' ? 'VERIFIED PASS' : 'ASYMMETRY WARN'}</span><span className="metric-label">HEURISTIC 0{index + 1}</span></div><strong>{check.label}</strong><p>{check.detail}</p><div className="diagnostic-value"><span>STATUS</span><b>{check.status === 'pass' ? 'CLEAR' : 'REVIEW'}</b></div></div>)}</div>
      </section>

      <aside className="right-panel">
        <div className="panel-heading"><div><div className="section-label">Inspector</div><h2>{selected?.label || 'Select an element'}</h2></div><button className="icon-button subtle" title="Close inspector"><X size={16} /></button></div>
        {selected && <><div className="field-group"><label>Content</label><textarea value={selected.content} onChange={(event) => updateSelected({ content: event.target.value })} /></div><div className="field-row"><div className="field-group"><label>Width</label><div className="input-with-unit"><input value={selected.width} onChange={(event) => updateSelected({ width: Number(event.target.value) })} /><span>%</span></div></div><div className="field-group"><label>Height</label><div className="input-with-unit"><input value={selected.height} onChange={(event) => updateSelected({ height: Number(event.target.value) })} /><span>%</span></div></div></div><div className="field-row"><div className="field-group"><label>X position</label><div className="input-with-unit"><input value={selected.x} onChange={(event) => updateSelected({ x: Number(event.target.value) })} /><span>%</span></div></div><div className="field-group"><label>Y position</label><div className="input-with-unit"><input value={selected.y} onChange={(event) => updateSelected({ y: Number(event.target.value) })} /><span>%</span></div></div></div><div className="divider" /><div className="panel-subheading"><span>Design tokens</span><button className="mini-button" title="Add token"><Plus size={14} /></button></div><div className="token-row"><span className="token-swatch coral" /><span>accent / coral</span><code>#FF6B4A</code></div><div className="token-row"><span className="token-swatch ink" /><span>text / ink</span><code>#17232D</code></div><div className="token-row"><span className="token-swatch white" /><span>surface / white</span><code>#FFFFFF</code></div></>}
        <div className="divider" /><div className="panel-subheading score-heading"><span>Layout score</span><span className={`score-status ${score.status}`}><span /> {score.status === 'healthy' ? 'Healthy' : 'Review'}</span></div><div className="score-overview"><div className="score-number">{score.value}<small>/100</small></div><div className="score-bar"><span style={{ width: `${score.value}%` }} /></div><p>Based on {surface.name.toLowerCase()} constraints</p></div><div className="checks">{score.checks.map((check) => <div className="check-row" key={check.label}><span className={`check-icon ${check.status}`}><Check size={12} /></span><span><strong>{check.label}</strong><small>{check.detail}</small></span></div>)}</div><button className="button button-outline full-width" onClick={() => setShowCode(true)}><Gauge size={15} /> Inspect engine output</button>
      </aside>
    </main>
    {showCode && <div className="modal-backdrop" onClick={() => setShowCode(false)}><div className="code-modal" onClick={(event) => event.stopPropagation()}><div className="modal-head"><div><div className="section-label">Engine output</div><h2>Portable layout schema</h2></div><button className="icon-button" title="Close" onClick={() => setShowCode(false)}><X size={16} /></button></div><pre>{JSON.stringify({ surface: surface.id, score: score.value, elements: adapted.map(({ id, kind, x, y, width, height }) => ({ id, kind, x, y, width, height })) }, null, 2)}</pre><button className="button button-dark" onClick={() => navigator.clipboard?.writeText(JSON.stringify(adapted, null, 2))}><Copy size={15} /> Copy schema</button></div></div>}
  </div>
}

function PreviewElement({ element, surface, selected, onClick }: { element: LayoutElement; surface: SurfaceId; selected: boolean; onClick: () => void }) {
  const style = { left: `${element.x}%`, top: `${element.y}%`, width: `${element.width}%`, height: `${element.height}%` }
  if (element.kind === 'image') return <button className={`preview-element image-element ${selected ? 'selected' : ''}`} style={style} onClick={onClick}><div className={`coffee-art ${surface}`}><span className="sun" /><span className="cup">◒</span><span className="steam">∿</span></div><span className="image-copy">{element.content}</span></button>
  if (element.kind === 'badge') return <button className={`preview-element badge-element ${selected ? 'selected' : ''}`} style={style} onClick={onClick}>{element.content}</button>
  if (element.kind === 'cta') return <button className={`preview-element cta-element ${selected ? 'selected' : ''}`} style={style} onClick={onClick}>{element.content}<span>↗</span></button>
  if (element.kind === 'price') return <button className={`preview-element price-element ${selected ? 'selected' : ''}`} style={style} onClick={onClick}>{element.content}</button>
  if (element.kind === 'headline') return <button className={`preview-element headline-element ${selected ? 'selected' : ''}`} style={style} onClick={onClick}>{element.content}</button>
  return <button className={`preview-element body-element ${selected ? 'selected' : ''}`} style={style} onClick={onClick}>{element.content}</button>
}
