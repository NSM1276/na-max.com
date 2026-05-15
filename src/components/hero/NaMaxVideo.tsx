'use client'

/**
 * Na-Max Hero Animation — 15s wireframe loop.
 * Port of scenes.jsx из Claude Design handoff bundle.
 *
 * Сцены (единый "schematic world", камера переходит между ними):
 *   0.0–3.0 s   RoomScene      — изометричная схема номера + пульсирующий QR
 *   3.0–7.0 s   PhoneScene     — телефон сканирует, открывается меню, тап
 *   7.0–11.0 s  DashboardScene — Staff Dashboard ловит заказ, статус → IN BEARBEITUNG
 *  11.0–15.0 s  ClaimScene     — финальный слоган + лого + CTA chip
 *
 * Default export — готовый <Stage> с zarpressed sizes, autoplay + loop,
 * без controls (для встраивания в hero).
 */

import React from 'react'
import { Stage, useTime, clamp, Easing } from '@/components/anim/Stage'

// ─────────── design tokens (соответствуют tailwind brand-*) ───────────

const INK     = '#0b1c30'
const ACCENT  = '#1ea1e6'
const ACCENT2 = '#0b6fb8'
const MUTED   = '#7c8a99'
const HAIR    = '#d3dae2'
const BG      = '#f5f7fa'
const SURFACE = '#ffffff'
const POS     = '#0d8a55'

const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace"
const SANS = "Inter, 'Helvetica Neue', Helvetica, system-ui, sans-serif"

// ─────────── helpers ───────────

function Crosshair({ x, y, size = 16, color = HAIR }: { x: number; y: number; size?: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth="1">
      <line x1={x - size} y1={y} x2={x + size} y2={y} />
      <line x1={x} y1={y - size} x2={x} y2={y + size} />
    </g>
  )
}

function MonoTag({
  x, y, children, color = MUTED, size = 13, anchor = 'start' as 'start' | 'middle' | 'end',
}: {
  x: number; y: number; children: React.ReactNode;
  color?: string; size?: number; anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text x={x} y={y} fill={color} fontFamily={MONO} fontSize={size}
          textAnchor={anchor} letterSpacing="0.08em">
      {children}
    </text>
  )
}

// drifting dot grid behind everything
function GridBG({ time }: { time: number }) {
  const ox = (time * 4) % 40
  const oy = (time * 2) % 40
  return (
    <div style={{
      position: 'absolute', inset: 0, background: BG,
      backgroundImage: `radial-gradient(${HAIR} 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      backgroundPosition: `${-ox}px ${-oy}px`,
      opacity: 0.55,
    }} />
  )
}

// corner ticks + frame labels
function FrameChrome() {
  return (
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {[[60, 60], [1860, 60], [60, 1020], [1860, 1020]].map(([cx, cy], i) => (
        <g key={i} stroke={INK} strokeWidth="1.5" opacity="0.45">
          <line x1={cx - 14} y1={cy} x2={cx + 14} y2={cy} />
          <line x1={cx} y1={cy - 14} x2={cx} y2={cy + 14} />
        </g>
      ))}
      <text x={60}   y={48}   fontFamily={MONO} fontSize="13" fill={MUTED} letterSpacing="0.12em">NA-MAX · SYSTEM SCHEMATIC</text>
      <text x={1860} y={48}   fontFamily={MONO} fontSize="13" fill={MUTED} textAnchor="end" letterSpacing="0.12em">v1.0 · DE</text>
      <text x={60}   y={1052} fontFamily={MONO} fontSize="13" fill={MUTED} letterSpacing="0.12em">QR → ORDER → STAFF · ECHTZEIT</text>
      <text x={1860} y={1052} fontFamily={MONO} fontSize="13" fill={MUTED} textAnchor="end" letterSpacing="0.12em">DSGVO · EU-SERVER</text>
    </svg>
  )
}

// ─────────── A. Room scene (0–3 s) ───────────

function RoomScene({ globalTime, startT, endT }: { globalTime: number; startT: number; endT: number }) {
  const local = clamp((globalTime - startT) / (endT - startT), 0, 1)
  const scale = 0.92 + Easing.easeInOutCubic(local) * 0.18
  const tx    = (1 - local) * -30
  const pulse = Math.sin(globalTime * 3.4) * 0.5 + 0.5

  const exitProg     = clamp((globalTime - (endT - 0.5)) / 0.5, 0, 1)
  const opacity      = 1 - Easing.easeInCubic(exitProg)
  const entryProg    = clamp(globalTime / 0.5, 0, 1)
  const entryOpacity = Easing.easeOutCubic(entryProg)

  return (
    <div style={{
      position: 'absolute', inset: 0,
      transform: `translate(${tx}px, 0) scale(${scale})`,
      transformOrigin: '50% 55%',
      opacity: opacity * entryOpacity,
      willChange: 'transform, opacity',
    }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Iso floor */}
        <g transform="translate(960, 600)">
          <polygon points="0,-260 520,0 0,260 -520,0" fill="none" stroke={INK} strokeWidth="1.6"/>
          <g stroke={HAIR} strokeWidth="1">
            {[-200, -100, 0, 100, 200].map((d) => (
              <React.Fragment key={d}>
                <line x1={d * 2} y1={d} x2={d * 2 + 520 * (1 - Math.abs(d) / 260)} y2={d + (260 - Math.abs(d))} />
              </React.Fragment>
            ))}
          </g>

          {/* Bed */}
          <g transform="translate(-180, -40)">
            <polygon points="0,0 260,130 80,220 -180,90" fill={SURFACE} stroke={INK} strokeWidth="1.6"/>
            <polygon points="0,-22 260,108 260,130 0,0" fill={BG} stroke={INK} strokeWidth="1.4"/>
            <polygon points="0,-22 -180,68 -180,90 0,0" fill={BG} stroke={INK} strokeWidth="1.4"/>
            <polygon points="-60,-2 30,43 -10,63 -100,18" fill={SURFACE} stroke={INK} strokeWidth="1.2"/>
            <polygon points="20,18 110,63 70,83 -20,38" fill={SURFACE} stroke={INK} strokeWidth="1.2"/>
            <line x1="100" y1="60" x2="-70" y2="-25" stroke={INK} strokeWidth="1.2" opacity="0.4"/>
          </g>

          {/* Nightstand + lamp + QR placard */}
          <g transform="translate(130, 30)">
            <polygon points="0,0 90,45 30,75 -60,30" fill={SURFACE} stroke={INK} strokeWidth="1.6"/>
            <polygon points="0,-30 90,15 90,45 0,0" fill={BG} stroke={INK} strokeWidth="1.4"/>
            <polygon points="0,-30 -60,0 -60,30 0,0" fill={BG} stroke={INK} strokeWidth="1.4"/>

            <g transform="translate(-5, -36)">
              <line x1="0" y1="0" x2="0" y2="-26" stroke={INK} strokeWidth="1.4"/>
              <ellipse cx="0" cy="-38" rx="16" ry="8" fill={SURFACE} stroke={INK} strokeWidth="1.4"/>
              <path d="M -16 -38 L -10 -52 L 10 -52 L 16 -38" fill={SURFACE} stroke={INK} strokeWidth="1.4"/>
            </g>

            <g transform="translate(35, -8)">
              <polygon points="0,0 0,-72 36,-90 36,-18" fill={SURFACE} stroke={INK} strokeWidth="1.6"/>
              <g transform="translate(6, -82) skewY(-26)">
                <rect x="0" y="0" width="34" height="34" fill={SURFACE} stroke={INK} strokeWidth="1"/>
                {[
                  [0,0,8,8],[2,2,4,4],[26,0,8,8],[28,2,4,4],[0,26,8,8],[2,28,4,4],
                  [12,2,2,2],[16,2,4,2],[22,2,2,2],
                  [2,12,2,4],[6,12,4,2],[12,12,4,4],[20,14,2,2],[24,12,4,4],
                  [2,20,2,4],[8,22,4,2],[14,20,2,4],[18,22,2,2],[22,20,2,4],
                  [12,28,2,4],[18,28,4,2],[24,28,2,4],
                ].map(([x, y, w, h], i) => (
                  <rect key={i} x={x} y={y} width={w} height={h} fill={INK}/>
                ))}
              </g>
              <g transform="translate(24, -54)" opacity={0.25 + pulse * 0.55}>
                <circle r={28 + pulse * 14} cx="0" cy="0" fill="none" stroke={ACCENT} strokeWidth="1.5"/>
                <circle r={44 + pulse * 22} cx="0" cy="0" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.5"/>
              </g>
            </g>
          </g>

          <g transform="translate(-360, -60)">
            <polygon points="0,0 0,-160 80,-200 80,-40" fill={BG} stroke={INK} strokeWidth="1.4"/>
          </g>
          <g transform="translate(280, -120)">
            <polygon points="0,0 0,-110 90,-155 90,-45" fill="none" stroke={INK} strokeWidth="1.4"/>
            <line x1="45" y1="-23" x2="45" y2="-133" stroke={INK} strokeWidth="1" opacity="0.5"/>
            <line x1="0"  y1="-55" x2="90" y2="-100" stroke={INK} strokeWidth="1" opacity="0.5"/>
          </g>
        </g>

        {/* Callouts */}
        <Crosshair x={1090} y={510}/>
        <line x1="1090" y1="510" x2="1320" y2="430" stroke={INK} strokeWidth="1"/>
        <line x1="1320" y1="430" x2="1500" y2="430" stroke={INK} strokeWidth="1"/>
        <MonoTag x={1320} y={414}>QR · ZIMMER 304</MonoTag>
        <MonoTag x={1320} y={452} color={ACCENT}>STATUS · BEREIT</MonoTag>

        <Crosshair x={600} y={620}/>
        <line x1="600" y1="620" x2="420" y2="710" stroke={INK} strokeWidth="1"/>
        <line x1="420" y1="710" x2="240" y2="710" stroke={INK} strokeWidth="1"/>
        <MonoTag x={240} y={694}>HOTEL MIRABELL · WIEN</MonoTag>
        <MonoTag x={240} y={722} color={MUTED}>1 VON 38 ZIMMERN · LIVE</MonoTag>

        {/* Headline */}
        <text x={120} y={210} fontFamily={SANS} fontSize="84" fontWeight="700" fill={INK}    letterSpacing="-0.02em">1 QR-Code.</text>
        <text x={120} y={300} fontFamily={SANS} fontSize="84" fontWeight="700" fill={ACCENT} letterSpacing="-0.02em">0 Apps.</text>
      </svg>
    </div>
  )
}

// ─────────── B. Phone scene (3–7 s) ───────────

function PhoneScene({ globalTime, startT, endT }: { globalTime: number; startT: number; endT: number }) {
  const entryProg = Easing.easeOutCubic(clamp((globalTime - startT) / 0.55, 0, 1))
  const exitProg  = Easing.easeInCubic(clamp((globalTime - (endT - 0.5)) / 0.5, 0, 1))
  const opacity   = entryProg * (1 - exitProg)
  const phoneY    = (1 - entryProg) * 80

  const scanT    = clamp((globalTime - startT - 0.4) / 1.4, 0, 1)
  const showMenu = globalTime > startT + 1.5
  const menuT    = clamp((globalTime - startT - 1.5) / 0.55, 0, 1)
  const tapT     = clamp((globalTime - startT - 2.7) / 0.5, 0, 1)

  const rows = [
    { label: 'Zimmerservice', sub: 'Frühstück · Getränke · Snacks', tapped: true  },
    { label: 'Reinigung',     sub: 'Sofort oder geplant',           tapped: false },
    { label: 'Spa & Wellness',sub: 'Slot reservieren',              tapped: false },
    { label: 'Taxi',          sub: 'Flughafen · Stadt',             tapped: false },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, opacity, willChange: 'opacity' }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Left caption */}
        <g opacity={clamp((globalTime - startT - 0.2) / 0.5, 0, 1)}>
          <text x={140} y={300} fontFamily={SANS} fontSize="88" fontWeight="700" fill={INK} letterSpacing="-0.02em">Gast scannt.</text>
          <text x={140} y={392} fontFamily={SANS} fontSize="44" fontWeight="500" fill={MUTED} letterSpacing="-0.01em">Kein Download. Kein Login.</text>
          <text x={140} y={444} fontFamily={SANS} fontSize="44" fontWeight="500" fill={MUTED} letterSpacing="-0.01em">Browser öffnet — fertig.</text>

          <g transform="translate(140, 540)" fontFamily={MONO} fontSize="14" fill={MUTED} letterSpacing="0.08em">
            <line x1="0" y1="0"   x2="520" y2="0"   stroke={HAIR}/>
            <text x="0" y="32">01 · QR_SCAN</text>
            <text x="520" y="32" textAnchor="end" fill={POS}>OK · 0.4s</text>
            <line x1="0" y1="56"  x2="520" y2="56"  stroke={HAIR}/>
            <text x="0" y="88"  opacity={showMenu ? 1 : 0.3}>02 · SESSION_BIND_ROOM_304</text>
            <text x="520" y="88" textAnchor="end" fill={showMenu ? POS : MUTED} opacity={showMenu ? 1 : 0.4}>OK</text>
            <line x1="0" y1="112" x2="520" y2="112" stroke={HAIR}/>
            <text x="0" y="144" opacity={tapT > 0 ? 1 : 0.3}>03 · ORDER_DRAFT</text>
            <text x="520" y="144" textAnchor="end" fill={tapT > 0 ? ACCENT : MUTED} opacity={tapT > 0 ? 1 : 0.4}>
              {tapT > 0 ? 'SENDING' : 'WAITING'}
            </text>
          </g>
        </g>

        {/* Phone */}
        <g transform={`translate(${1180 + phoneY * 0.1}, ${130 + phoneY})`}>
          <ellipse cx="240" cy="900" rx="220" ry="14" fill={INK} opacity="0.06"/>
          <rect x="0"  y="0"  width="480" height="900" rx="60" ry="60" fill={SURFACE} stroke={INK} strokeWidth="2.5"/>
          <rect x="20" y="20" width="440" height="860" rx="42" ry="42" fill={BG}      stroke={HAIR} strokeWidth="1"/>
          <rect x="180" y="34" width="120" height="22" rx="11" fill={INK}/>
          <text x="48" y="92" fontFamily={MONO} fontSize="16" fill={INK} letterSpacing="0.1em">9:41</text>
          <g transform="translate(380,78)">
            <rect x="0" y="0" width="22" height="12" rx="2" fill="none" stroke={INK} strokeWidth="1.2"/>
            <rect x="2" y="2" width="16" height="8" fill={INK}/>
            <rect x="24" y="4" width="2" height="6" fill={INK}/>
          </g>
          <rect x="48" y="118" width="384" height="36" rx="8" fill={SURFACE} stroke={HAIR} strokeWidth="1"/>
          <text x="68" y="142" fontFamily={MONO} fontSize="13" fill={MUTED} letterSpacing="0.06em">na-max.app / mirabell / 304</text>

          {/* Scanner */}
          {!showMenu && (
            <g>
              <rect x="60" y="200" width="360" height="360" rx="20" fill={INK} opacity="0.04"/>
              {[[60, 200], [420, 200], [60, 560], [420, 560]].map(([cx, cy], i) => {
                const dx = cx < 240 ? 1 : -1
                const dy = cy < 380 ? 1 : -1
                return (
                  <g key={i} stroke={ACCENT} strokeWidth="3" fill="none">
                    <line x1={cx} y1={cy} x2={cx + 30 * dx} y2={cy}/>
                    <line x1={cx} y1={cy} x2={cx} y2={cy + 30 * dy}/>
                  </g>
                )
              })}
              <g transform="translate(140, 280)" opacity="0.6">
                <rect x="0" y="0" width="200" height="200" fill={SURFACE} stroke={INK} strokeWidth="1.4"/>
                {[
                  [10,10,40,40],[20,20,20,20],
                  [150,10,40,40],[160,20,20,20],
                  [10,150,40,40],[20,160,20,20],
                  [70,10,20,10],[100,10,30,20],[70,30,10,20],
                  [10,70,20,10],[60,70,40,40],[120,80,20,10],
                  [150,70,20,20],[150,110,30,10],
                  [10,110,30,10],[10,140,10,10],
                  [70,150,10,40],[100,160,40,10],[150,150,40,10],
                  [80,90,20,20],[110,120,30,30],
                ].map(([x, y, w, h], i) => (
                  <rect key={i} x={x} y={y} width={w} height={h} fill={INK}/>
                ))}
              </g>
              <line x1="80" y1={200 + (scanT * 360) % 360} x2="400" y2={200 + (scanT * 360) % 360} stroke={ACCENT} strokeWidth="2.5" opacity={0.85}/>
              <rect x="60" y={200 + (scanT * 360) % 360 - 40} width="360" height="40" fill="url(#scanGrad)" opacity="0.7"/>
              <defs>
                <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={ACCENT} stopOpacity="0"/>
                  <stop offset="1" stopColor={ACCENT} stopOpacity="0.35"/>
                </linearGradient>
              </defs>
              <text x="240" y="630" fontFamily={MONO} fontSize="15" fill={MUTED} textAnchor="middle" letterSpacing="0.16em">SCANNING…</text>
            </g>
          )}

          {/* Menu */}
          {showMenu && (
            <g>
              <text x="48" y="218" fontFamily={SANS} fontSize="26" fontWeight="700" fill={INK}>Hotel Mirabell · 304</text>
              <text x="48" y="246" fontFamily={SANS} fontSize="16" fill={MUTED}>Was können wir für Sie tun?</text>

              {rows.map((row, i) => {
                const rowY      = 280 + i * 110
                const enter     = Easing.easeOutCubic(clamp(menuT * 2 - i * 0.18, 0, 1))
                const rowOpacity= enter
                const rowDX     = (1 - enter) * 24
                const isTapped  = row.tapped && tapT > 0
                return (
                  <g key={i} transform={`translate(${rowDX}, 0)`} opacity={rowOpacity}>
                    <rect x="40" y={rowY} width="400" height="90" rx="14"
                          fill={isTapped ? '#eaf6fd' : SURFACE}
                          stroke={isTapped ? ACCENT : HAIR}
                          strokeWidth={isTapped ? 2 : 1}/>
                    <rect x="58" y={rowY + 22} width="46" height="46" rx="10" fill={BG} stroke={HAIR} strokeWidth="1"/>
                    {i === 0 && (
                      <g transform={`translate(${68}, ${rowY + 36})`} stroke={INK} strokeWidth="1.6" fill="none">
                        <path d="M0 12 C 0 4, 26 4, 26 12 L 26 18 L 0 18 Z"/>
                        <path d="M8 4 L 8 0 M14 4 L 14 -2 M20 4 L 20 0"/>
                      </g>
                    )}
                    {i === 1 && (
                      <g transform={`translate(${68}, ${rowY + 34})`} stroke={INK} strokeWidth="1.6" fill="none">
                        <rect x="2" y="6" width="24" height="14" rx="3"/>
                        <path d="M6 6 L 8 0 L 20 0 L 22 6"/>
                      </g>
                    )}
                    {i === 2 && (
                      <g transform={`translate(${72}, ${rowY + 34})`} stroke={INK} strokeWidth="1.6" fill="none">
                        <path d="M2 14 C 2 6, 18 6, 18 14"/>
                        <path d="M2 14 L 18 14"/>
                        <path d="M6 4 L 8 0 M10 4 L 12 0 M14 4 L 16 0"/>
                      </g>
                    )}
                    {i === 3 && (
                      <g transform={`translate(${68}, ${rowY + 38})`} stroke={INK} strokeWidth="1.6" fill="none">
                        <path d="M2 10 L 4 4 L 22 4 L 24 10 Z"/>
                        <circle cx="7"  cy="12" r="2.5"/>
                        <circle cx="19" cy="12" r="2.5"/>
                      </g>
                    )}
                    <text x="124" y={rowY + 42} fontFamily={SANS} fontSize="22" fontWeight="600" fill={INK}>{row.label}</text>
                    <text x="124" y={rowY + 66} fontFamily={SANS} fontSize="15" fill={MUTED}>{row.sub}</text>
                    <text x="416" y={rowY + 54} fontFamily={SANS} fontSize="22" fill={MUTED} textAnchor="end">›</text>

                    {isTapped && (
                      <g transform={`translate(${250}, ${rowY + 46})`}>
                        <circle r={20 + tapT * 70} fill="none" stroke={ACCENT} strokeWidth="2" opacity={1 - tapT}/>
                        <circle r={6 + tapT * 8}   fill={ACCENT} opacity={0.7 * (1 - tapT)}/>
                      </g>
                    )}
                  </g>
                )
              })}
            </g>
          )}
        </g>

        {globalTime > endT - 0.6 && (
          <g opacity={clamp((globalTime - (endT - 0.6)) / 0.4, 0, 1)}>
            <line x1="1660" y1="600" x2="1820" y2="600" stroke={ACCENT} strokeWidth="2" strokeDasharray="6 6"/>
            <polygon points="1820,600 1810,594 1810,606" fill={ACCENT}/>
          </g>
        )}
      </svg>
    </div>
  )
}

// ─────────── C. Dashboard scene (7–11 s) ───────────

function DashboardScene({ globalTime, startT, endT }: { globalTime: number; startT: number; endT: number }) {
  const entryProg = Easing.easeOutCubic(clamp((globalTime - startT) / 0.6, 0, 1))
  const exitProg  = Easing.easeInCubic(clamp((globalTime - (endT - 0.5)) / 0.5, 0, 1))
  const opacity   = entryProg * (1 - exitProg)
  const slideX    = (1 - entryProg) * 120

  const newOrderT  = clamp((globalTime - startT - 0.5) / 0.5, 0, 1)
  const statusFlip = globalTime > startT + 2.2
  const elapsedSec = Math.max(0, globalTime - (startT + 0.5))

  const orders = [
    { room: '218', label: 'Handtücher',     status: 'ERLEDIGT',       color: POS,     dim: true },
    { room: '142', label: 'Taxi · 14:30',   status: 'IN BEARBEITUNG', color: ACCENT2, dim: true },
    { room: '301', label: 'Spa-Slot 16:00', status: 'BESTÄTIGT',      color: ACCENT,  dim: true },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, opacity, willChange: 'opacity' }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Dashboard window */}
        <g transform={`translate(${slideX}, 0)`} opacity={entryProg}>
          <g transform="translate(140, 180)">
            <rect x="0" y="0" width="1140" height="760" rx="14" fill={SURFACE} stroke={INK} strokeWidth="2"/>
            <rect x="0" y="0" width="1140" height="52"  rx="14" fill={BG}      stroke={HAIR} strokeWidth="1"/>
            <rect x="0" y="38" width="1140" height="14" fill={BG}/>
            <line x1="0" y1="52" x2="1140" y2="52" stroke={INK} strokeWidth="1.5"/>
            <circle cx="24" cy="26" r="7" fill="none" stroke={INK} strokeWidth="1.2"/>
            <circle cx="46" cy="26" r="7" fill="none" stroke={INK} strokeWidth="1.2"/>
            <circle cx="68" cy="26" r="7" fill="none" stroke={INK} strokeWidth="1.2"/>
            <text x="100" y="32" fontFamily={MONO} fontSize="14" fill={MUTED} letterSpacing="0.1em">
              NA-MAX STAFF DASHBOARD · MIRABELL
            </text>
            <text x="1116" y="32" fontFamily={MONO} fontSize="13" fill={POS} textAnchor="end" letterSpacing="0.1em">
              ● LIVE
            </text>

            {/* Sidebar */}
            <rect x="0" y="52" width="200" height="708" fill={BG}/>
            <line x1="200" y1="52" x2="200" y2="760" stroke={HAIR}/>
            {['Eingang', 'In Arbeit', 'Erledigt', 'Zimmer', 'Personal'].map((label, i) => (
              <g key={i}>
                <rect x="16" y={80 + i * 48} width="168" height="36" rx="8"
                      fill={i === 0 ? SURFACE : 'none'}
                      stroke={i === 0 ? HAIR : 'none'} strokeWidth="1"/>
                <text x="32" y={102 + i * 48} fontFamily={SANS} fontSize="16"
                      fontWeight={i === 0 ? 600 : 500} fill={i === 0 ? INK : MUTED}>{label}</text>
                {i === 0 && (
                  <g>
                    <circle cx="172" cy={98 + i * 48} r="10" fill={ACCENT}/>
                    <text x="172" y={102 + i * 48} fontFamily={MONO} fontSize="12" fontWeight="700"
                          fill="#fff" textAnchor="middle">{newOrderT > 0 ? '4' : '3'}</text>
                  </g>
                )}
              </g>
            ))}

            <text x="232" y="100" fontFamily={SANS} fontSize="22" fontWeight="700" fill={INK}>Eingang</text>
            <text x="232" y="126" fontFamily={SANS} fontSize="14" fill={MUTED}>Aktuelle Anfragen · automatisch sortiert</text>
            <text x="1116" y="118" fontFamily={MONO} fontSize="13" fill={MUTED} textAnchor="end" letterSpacing="0.1em">
              HEUTE · 14:{String(Math.floor(elapsedSec * 6) % 60).padStart(2, '0')}
            </text>

            {/* New incoming order */}
            {newOrderT > 0 && (
              <g transform={`translate(${232}, ${160 - (1 - newOrderT) * 30})`} opacity={newOrderT}>
                <rect x="0" y="0" width="884" height="124" rx="12" fill="#eaf6fd" stroke={ACCENT} strokeWidth="2"/>
                <rect x="20" y="20" width="60" height="24" rx="12" fill={ACCENT}/>
                <text x="50" y="36" fontFamily={MONO} fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle" letterSpacing="0.14em">NEU</text>
                <text x="96" y="40" fontFamily={SANS} fontSize="22" fontWeight="700" fill={INK}>Zimmer 304 · Cappuccino</text>
                <text x="96" y="68" fontFamily={SANS} fontSize="16" fill={MUTED}>Zimmerservice · vor {Math.max(0, Math.floor(elapsedSec))} Sek.</text>

                <g transform="translate(96, 86)">
                  {!statusFlip ? (
                    <g>
                      <rect x="0" y="0" width="180" height="28" rx="14" fill={SURFACE} stroke={ACCENT} strokeWidth="1.5"/>
                      <circle cx="14" cy="14" r="4" fill={ACCENT}>
                        <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite"/>
                      </circle>
                      <text x="28" y="18" fontFamily={MONO} fontSize="12" fontWeight="700" fill={ACCENT2} letterSpacing="0.14em">PENDING</text>
                    </g>
                  ) : (
                    <g>
                      <rect x="0" y="0" width="220" height="28" rx="14" fill={ACCENT2}/>
                      <circle cx="14" cy="14" r="4" fill="#fff"/>
                      <text x="28" y="18" fontFamily={MONO} fontSize="12" fontWeight="700" fill="#fff" letterSpacing="0.14em">IN BEARBEITUNG</text>
                    </g>
                  )}
                </g>

                <g transform="translate(720, 32)" opacity={statusFlip ? 0.4 : 1}>
                  <rect x="0" y="0" width="148" height="60" rx="10"
                        fill={statusFlip ? BG : INK}
                        stroke={statusFlip ? HAIR : INK} strokeWidth="1.5"/>
                  <text x="74" y="38" fontFamily={SANS} fontSize="16" fontWeight="600"
                        fill={statusFlip ? MUTED : '#fff'} textAnchor="middle">
                    {statusFlip ? '✓ Übernommen' : 'Annehmen'}
                  </text>
                </g>

                {!statusFlip && newOrderT > 0.6 && (
                  <g transform="translate(794, 62)">
                    <circle r={14 + ((globalTime * 2) % 1) * 30} fill="none" stroke={ACCENT} strokeWidth="2"
                            opacity={1 - ((globalTime * 2) % 1)}/>
                  </g>
                )}
              </g>
            )}

            {/* Existing dim orders */}
            {orders.map((o, i) => (
              <g key={i} transform={`translate(232, ${320 + i * 96})`} opacity="0.55">
                <rect x="0" y="0" width="884" height="80" rx="10" fill={SURFACE} stroke={HAIR} strokeWidth="1"/>
                <text x="20" y="36" fontFamily={SANS} fontSize="18" fontWeight="600" fill={INK}>Zimmer {o.room} · {o.label}</text>
                <text x="20" y="60" fontFamily={SANS} fontSize="14" fill={MUTED}>vor {3 + i * 4} Min.</text>
                <g transform="translate(720, 26)">
                  <rect x="0" y="0" width="148" height="28" rx="14" fill="none" stroke={o.color} strokeWidth="1.5"/>
                  <text x="74" y="18" fontFamily={MONO} fontSize="11" fontWeight="700" fill={o.color}
                        textAnchor="middle" letterSpacing="0.14em">{o.status}</text>
                </g>
              </g>
            ))}
          </g>
        </g>

        {/* Right caption */}
        <g transform={`translate(0, ${(1 - entryProg) * 40})`} opacity={entryProg}>
          <text x={1370} y={290} fontFamily={SANS} fontSize="68" fontWeight="700" fill={INK}    letterSpacing="-0.02em">Personal</text>
          <text x={1370} y={356} fontFamily={SANS} fontSize="68" fontWeight="700" fill={ACCENT} letterSpacing="-0.02em">reagiert.</text>
          <text x={1370} y={416} fontFamily={SANS} fontSize="28" fontWeight="500" fill={MUTED}  letterSpacing="-0.01em">Echtzeit. Ein Tap.</text>
          <text x={1370} y={454} fontFamily={SANS} fontSize="28" fontWeight="500" fill={MUTED}  letterSpacing="-0.01em">Keine Telefonate.</text>

          <g transform="translate(1370, 540)" fontFamily={MONO} fontSize="14" fill={MUTED} letterSpacing="0.08em">
            <text x="0" y="0">Ø REAKTION</text>
            <text x="0" y="36" fontSize="38" fill={INK} fontWeight="700" letterSpacing="0em">
              {(2.1 + Math.sin(globalTime * 2) * 0.1).toFixed(1)}s
            </text>
            <line x1="0" y1="60" x2="380" y2="60" stroke={HAIR}/>
            <text x="0" y="92">UMSATZ / GAST</text>
            <text x="0" y="128" fontSize="38" fill={POS} fontWeight="700" letterSpacing="0em">+27%</text>
          </g>
        </g>
      </svg>
    </div>
  )
}

// ─────────── D. Claim scene (11–15 s) ───────────

function ClaimScene({ globalTime, startT, endT }: { globalTime: number; startT: number; endT: number }) {
  const local     = clamp((globalTime - startT) / (endT - startT), 0, 1)
  const entryProg = Easing.easeOutCubic(clamp((globalTime - startT) / 0.7, 0, 1))

  const t1 = clamp((globalTime - startT - 0.0) / 0.5, 0, 1)
  const t2 = clamp((globalTime - startT - 0.6) / 0.5, 0, 1)
  const t3 = clamp((globalTime - startT - 1.2) / 0.5, 0, 1)
  const t4 = clamp((globalTime - startT - 1.8) / 0.5, 0, 1)
  const tickT = clamp((globalTime - startT - 2.4) / 1.6, 0, 1)

  const scale = 0.985 + local * 0.025

  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: entryProg,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      willChange: 'opacity, transform',
    }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <line x1="240" y1="540" x2="1680" y2="540" stroke={HAIR} strokeWidth="1" opacity={entryProg}/>
        <Crosshair x={240}  y={540}/>
        <Crosshair x={1680} y={540}/>

        <g transform={`translate(0, ${(1 - Easing.easeOutCubic(t1)) * 24})`} opacity={t1}>
          <text x={960} y={460} fontFamily={SANS} fontSize="118" fontWeight="700" fill={INK} letterSpacing="-0.025em" textAnchor="middle">
            In 24 Stunden aktiv.
          </text>
        </g>
        <g transform={`translate(0, ${(1 - Easing.easeOutCubic(t2)) * 24})`} opacity={t2}>
          <text x={960} y={610} fontFamily={SANS} fontSize="84" fontWeight="700" fill={ACCENT} letterSpacing="-0.02em" textAnchor="middle">
            Ohne App. Ohne IT.
          </text>
        </g>
        <g transform={`translate(960, ${740 + (1 - t3) * 16})`} opacity={t3}>
          <text x={0} y={0} fontFamily={SANS} fontSize="44" fontWeight="700" fill={INK} letterSpacing="-0.01em" textAnchor="middle">
            Na-Max
            <tspan fill={MUTED} fontWeight="500" letterSpacing="0.04em" dx="14">· digitale Gästebetreuung</tspan>
          </text>
        </g>
        <g transform="translate(960, 840)" opacity={t4}>
          <rect x="-180" y="0" width="360" height="64" rx="32" fill={ACCENT}/>
          <text x={0} y={42} fontFamily={SANS} fontSize="22" fontWeight="600" fill="#fff" textAnchor="middle">
            14-Tage Pilot starten  →
          </text>
        </g>

        <g fontFamily={MONO} fontSize="14" fill={MUTED} letterSpacing="0.1em">
          {([
            ['KEINE INTEGRATION', 300],
            ['KEIN APP-DOWNLOAD', 560],
            ['DSGVO · EU-SERVER', 820],
            ['JEDERZEIT KÜNDBAR', 1080],
          ] as [string, number][]).map(([label, x], i) => {
            const ti = clamp(tickT * 4 - i * 0.6, 0, 1)
            return (
              <g key={i} opacity={ti} transform={`translate(${x}, 960)`}>
                <circle cx="10" cy="-4" r="10" fill="none" stroke={POS} strokeWidth="1.5"/>
                <path d="M 5 -4 L 9 0 L 16 -8" fill="none" stroke={POS} strokeWidth="2"/>
                <text x="30" y="0">{label}</text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

// ─────────── Master video ───────────

function NaMaxVideoInner() {
  const time = useTime()

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: BG }}>
      <GridBG     time={time}/>
      <FrameChrome/>

      <RoomScene      globalTime={time} startT={0}    endT={3.0}/>
      <PhoneScene     globalTime={time} startT={3.0}  endT={7.0}/>
      <DashboardScene globalTime={time} startT={7.0}  endT={11.0}/>
      <ClaimScene     globalTime={time} startT={11.0} endT={15.0}/>

      {/* Progress dots — 4 сцены */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 10,
      }}>
        {[0, 3, 7, 11].map((s, i) => {
          const next = [3, 7, 11, 15][i]
          const active = time >= s && time < next
          const past   = time >= next
          return (
            <div key={i} style={{
              width: active ? 36 : 12, height: 4, borderRadius: 2,
              background: past ? INK : active ? ACCENT : HAIR,
              transition: 'width 240ms ease, background 240ms ease',
            }}/>
          )
        })}
      </div>
    </div>
  )
}

// ─────────── Default export — ready-to-embed component ───────────

export default function NaMaxVideo({
  controls = false,
}: { controls?: boolean } = {}) {
  return (
    <Stage
      width={1920} height={1080}
      duration={15}
      background={BG}
      autoplay loop
      controls={controls}
    >
      <NaMaxVideoInner/>
    </Stage>
  )
}
