'use client'

/**
 * Stage — reusable wireframe-animation primitives.
 * Port of animations.jsx из Claude Design handoff bundle.
 *
 * Изменения относительно оригинала:
 *   • Убрана глобальная инжекция в window (Object.assign(window, ...))
 *   • Всё экспортируется как ES-модули
 *   • controls=false по умолчанию (для встраивания в hero без playback-бара)
 *   • persistKey=null по умолчанию (никаких записей в localStorage без явного opt-in)
 *   • outerBg='transparent' когда controls выключены — нет чёрной рамки вокруг канвы
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Easing — Popmotion-style, hand-rolled
// ─────────────────────────────────────────────────────────────────────────────

export const Easing = {
  linear:        (t: number) => t,

  easeInQuad:    (t: number) => t * t,
  easeOutQuad:   (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  easeInCubic:    (t: number) => t * t * t,
  easeOutCubic:   (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  easeInQuart:    (t: number) => t * t * t * t,
  easeOutQuart:   (t: number) => 1 - --t * t * t * t,
  easeInOutQuart: (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),

  easeInExpo:  (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t: number) => {
    if (t === 0) return 0
    if (t === 1) return 1
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10)
    return 1 - 0.5 * Math.pow(2, -20 * t + 10)
  },

  easeInSine:    (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine:   (t: number) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,

  easeOutBack: (t: number) => {
    const c1 = 1.70158, c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  easeInBack: (t: number) => {
    const c1 = 1.70158, c3 = c1 + 1
    return c3 * t * t * t - c1 * t * t
  },
  easeInOutBack: (t: number) => {
    const c1 = 1.70158, c2 = c1 * 1.525
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2
  },

  easeOutElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3
    if (t === 0) return 0
    if (t === 1) return 1
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Core helpers
// ─────────────────────────────────────────────────────────────────────────────

export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

type EaseFn = (t: number) => number

export function interpolate(
  input: number[],
  output: number[],
  ease: EaseFn | EaseFn[] = Easing.linear,
) {
  return (t: number) => {
    if (t <= input[0]) return output[0]
    if (t >= input[input.length - 1]) return output[output.length - 1]
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i]
        const local = span === 0 ? 0 : (t - input[i]) / span
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease
        const eased = easeFn(local)
        return output[i] + (output[i + 1] - output[i]) * eased
      }
    }
    return output[output.length - 1]
  }
}

export function animate({
  from = 0, to = 1, start = 0, end = 1, ease = Easing.easeInOutCubic,
}: { from?: number; to?: number; start?: number; end?: number; ease?: EaseFn }) {
  return (t: number) => {
    if (t <= start) return from
    if (t >= end) return to
    const local = (t - start) / (end - start)
    return from + (to - from) * ease(local)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Timeline context
// ─────────────────────────────────────────────────────────────────────────────

interface TimelineValue {
  time:     number
  duration: number
  playing:  boolean
  setTime?: (t: number) => void
  setPlaying?: (p: boolean) => void
}

const TimelineContext = createContext<TimelineValue>({
  time: 0, duration: 10, playing: false,
})

export const useTime     = () => useContext(TimelineContext).time
export const useTimeline = () => useContext(TimelineContext)

// ─────────────────────────────────────────────────────────────────────────────
// Sprite — only renders inside [start, end] window
// ─────────────────────────────────────────────────────────────────────────────

interface SpriteValue {
  localTime: number
  progress:  number
  duration:  number
  visible:   boolean
}

const SpriteContext = createContext<SpriteValue>({
  localTime: 0, progress: 0, duration: 0, visible: false,
})

export const useSprite = () => useContext(SpriteContext)

interface SpriteProps {
  start?:        number
  end?:          number
  keepMounted?:  boolean
  children:      React.ReactNode | ((ctx: SpriteValue) => React.ReactNode)
}

export function Sprite({
  start = 0, end = Infinity, children, keepMounted = false,
}: SpriteProps) {
  const { time } = useTimeline()
  const visible = time >= start && time <= end
  if (!visible && !keepMounted) return null

  const duration = end - start
  const localTime = Math.max(0, time - start)
  const progress  = duration > 0 && Number.isFinite(duration)
    ? clamp(localTime / duration, 0, 1) : 0

  const value: SpriteValue = { localTime, progress, duration, visible }

  return (
    <SpriteContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </SpriteContext.Provider>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage — animation host
// ─────────────────────────────────────────────────────────────────────────────

interface StageProps {
  width?:       number
  height?:      number
  duration?:    number
  background?:  string
  fps?:         number       // не используется — RAF сам
  loop?:        boolean
  autoplay?:    boolean
  controls?:    boolean      // показывать playback-бар + слушать клавиатуру
  persistKey?:  string | null // null = без localStorage
  outerBg?:     string       // фон ВНЕ канвы. Default = transparent
  children:     React.ReactNode
}

export function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = '#f6f4ef',
  loop = true,
  autoplay = true,
  controls = false,
  persistKey = null,
  outerBg,
  children,
}: StageProps) {
  // initial time: либо из localStorage (если есть ключ), либо 0
  const [time, setTime] = useState<number>(() => {
    if (!persistKey || typeof window === 'undefined') return 0
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0')
      return Number.isFinite(v) ? clamp(v, 0, duration) : 0
    } catch { return 0 }
  })
  const [playing, setPlaying] = useState<boolean>(autoplay)
  const [hoverTime, setHoverTime] = useState<number | null>(null)
  const [scale, setScale] = useState<number>(1)

  const stageRef  = useRef<HTMLDivElement>(null)
  const rafRef    = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)

  // Persist playhead — только если persistKey задан явно
  useEffect(() => {
    if (!persistKey) return
    try { localStorage.setItem(persistKey + ':t', String(time)) } catch { /* ignore */ }
  }, [time, persistKey])

  // Auto-scale: вписываем 1920×1080 канву в контейнер
  useEffect(() => {
    if (!stageRef.current) return
    const el = stageRef.current
    const barH = controls ? 44 : 0
    const measure = () => {
      const s = Math.min(
        el.clientWidth / width,
        (el.clientHeight - barH) / height,
      )
      setScale(Math.max(0.05, s))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [width, height, controls])

  // RAF playback loop
  useEffect(() => {
    if (!playing) { lastTsRef.current = null; return }
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts
      setTime((t) => {
        let next = t + dt
        if (next >= duration) {
          if (loop) next = next % duration
          else { next = duration; setPlaying(false) }
        }
        return next
      })
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTsRef.current = null
    }
  }, [playing, duration, loop])

  // Keyboard controls — только при controls=true
  useEffect(() => {
    if (!controls) return
    const onKey = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement | null
      if (tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA')) return
      if (e.code === 'Space')      { e.preventDefault(); setPlaying((p) => !p) }
      else if (e.code === 'ArrowLeft')  setTime((t) => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration))
      else if (e.code === 'ArrowRight') setTime((t) => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration))
      else if (e.key === '0' || e.code === 'Home') setTime(0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [controls, duration])

  const displayTime = hoverTime != null ? hoverTime : time

  const ctxValue = useMemo<TimelineValue>(
    () => ({ time: displayTime, duration, playing, setTime, setPlaying }),
    [displayTime, duration, playing],
  )

  return (
    <div
      ref={stageRef}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        background: outerBg ?? (controls ? '#0a0a0a' : 'transparent'),
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Canvas — scaled to fit */}
      <div style={{
        flex: 1, width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', minHeight: 0,
      }}>
        <div
          style={{
            width, height, background,
            position: 'relative',
            transform: `scale(${scale})`,
            transformOrigin: 'center',
            flexShrink: 0,
            boxShadow: controls ? '0 20px 60px rgba(0,0,0,0.4)' : 'none',
            overflow: 'hidden',
          }}
        >
          <TimelineContext.Provider value={ctxValue}>
            {children}
          </TimelineContext.Provider>
        </div>
      </div>

      {controls && (
        <PlaybackBar
          time={displayTime}
          duration={duration}
          playing={playing}
          onPlayPause={() => setPlaying((p) => !p)}
          onReset={() => setTime(0)}
          onSeek={(t) => setTime(t)}
          onHover={(t) => setHoverTime(t)}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PlaybackBar — used only when controls=true (dev/preview, not hero)
// ─────────────────────────────────────────────────────────────────────────────

interface PlaybackBarProps {
  time:        number
  duration:    number
  playing:     boolean
  onPlayPause: () => void
  onReset:     () => void
  onSeek:      (t: number) => void
  onHover:     (t: number | null) => void
}

function PlaybackBar({
  time, duration, playing,
  onPlayPause, onReset, onSeek, onHover,
}: PlaybackBarProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  const timeFromEvent = useCallback((e: MouseEvent | React.MouseEvent) => {
    const rect = trackRef.current!.getBoundingClientRect()
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1)
    return x * duration
  }, [duration])

  const onTrackMove = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    const t = timeFromEvent(e)
    if (dragging) onSeek(t)
    else onHover(t)
  }

  const onTrackLeave = () => { if (!dragging) onHover(null) }

  const onTrackDown = (e: React.MouseEvent) => {
    setDragging(true)
    onSeek(timeFromEvent(e))
    onHover(null)
  }

  useEffect(() => {
    if (!dragging) return
    const onUp = () => setDragging(false)
    const onMove = (e: MouseEvent) => {
      if (!trackRef.current) return
      onSeek(timeFromEvent(e))
    }
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mousemove', onMove)
    }
  }, [dragging, timeFromEvent, onSeek])

  const pct = duration > 0 ? (time / duration) * 100 : 0
  const fmt = (t: number) => {
    const total = Math.max(0, t)
    const m  = Math.floor(total / 60)
    const s  = Math.floor(total % 60)
    const cs = Math.floor((total * 100) % 100)
    return `${m}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`
  }

  const mono = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace'

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 16px',
      background: 'rgba(20,20,20,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      width: '100%', maxWidth: 680, alignSelf: 'center',
      borderRadius: 8, color: '#f6f4ef',
      userSelect: 'none', flexShrink: 0,
    }}>
      <IconButton onClick={onReset} title="Return to start">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 2v10M12 2L5 7l7 5V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
        </svg>
      </IconButton>
      <IconButton onClick={onPlayPause} title="Play/pause">
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14"><rect x="3" y="2" width="3" height="10" fill="currentColor"/><rect x="8" y="2" width="3" height="10" fill="currentColor"/></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 2l9 5-9 5V2z" fill="currentColor"/></svg>
        )}
      </IconButton>
      <div style={{ fontFamily: mono, fontSize: 12, fontVariantNumeric: 'tabular-nums', width: 64, textAlign: 'right' }}>
        {fmt(time)}
      </div>
      <div
        ref={trackRef}
        onMouseMove={onTrackMove}
        onMouseLeave={onTrackLeave}
        onMouseDown={onTrackDown}
        style={{ flex: 1, height: 22, position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <div style={{ position: 'absolute', left: 0, right: 0, height: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 2 }}/>
        <div style={{ position: 'absolute', left: 0, width: `${pct}%`, height: 4, background: '#1ea1e6', borderRadius: 2 }}/>
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', width: 12, height: 12, marginLeft: -6, marginTop: -6, background: '#fff', borderRadius: 6, boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }}/>
      </div>
      <div style={{ fontFamily: mono, fontSize: 12, fontVariantNumeric: 'tabular-nums', width: 64, textAlign: 'left', color: 'rgba(246,244,239,0.55)' }}>
        {fmt(duration)}
      </div>
    </div>
  )
}

function IconButton({ children, onClick, title }: {
  children: React.ReactNode; onClick: () => void; title: string
}) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick} title={title}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: 28, height: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 6, color: '#f6f4ef',
        cursor: 'pointer', padding: 0, transition: 'background 120ms',
      }}
    >
      {children}
    </button>
  )
}
