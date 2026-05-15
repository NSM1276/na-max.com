'use client'

/**
 * Na-Max Hero Animation v2 — Digitale Willkommenskarte
 * 3 Schritte: QR-Code → Gast scannt → Seite öffnet sich
 * Loop: 12s
 */

import React from 'react'
import { Stage, useTime, clamp, Easing } from '@/components/anim/Stage'

// ─── Design tokens ────────────────────────────────────────────────────────────
const INK     = '#0b1c30'
const ACCENT  = '#1ea1e6'
const MUTED   = '#7c8a99'
const HAIR    = '#d3dae2'
const BG      = '#f5f7fa'
const SURFACE = '#ffffff'
const GREEN   = '#0d8a55'
const SANS    = "Inter, 'Helvetica Neue', system-ui, sans-serif"
const MONO    = "'JetBrains Mono', ui-monospace, monospace"

// ─── QR Code pattern ─────────────────────────────────────────────────────────
function QRPattern({ x, y, size }: { x: number; y: number; size: number }) {
  const cell = size / 10
  const cells = [
    [0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2], // top-left finder
    [7,0],[8,0],[9,0],[7,1],[9,1],[7,2],[8,2],[9,2], // top-right finder
    [0,7],[1,7],[2,7],[0,8],[2,8],[0,9],[1,9],[2,9], // bottom-left finder
    [4,0],[5,1],[4,2],[6,2],[5,3],[4,4],[6,4],       // data
    [3,3],[5,5],[3,6],[6,6],[4,7],[5,8],[3,9],[6,9],
    [7,4],[8,3],[9,5],[8,6],[7,7],[9,8],
  ]
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} fill={SURFACE} rx="4"/>
      {cells.map(([cx, cy], i) => (
        <rect key={i} x={x + cx * cell + 1} y={y + cy * cell + 1}
              width={cell - 2} height={cell - 2} fill={INK} rx="1"/>
      ))}
    </g>
  )
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepDots({ activeStep }: { activeStep: number }) {
  return (
    <div style={{
      position: 'absolute', bottom: 32, left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', gap: 12, alignItems: 'center',
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width:  i === activeStep ? 40 : 10,
          height: 6,
          borderRadius: 3,
          background: i === activeStep ? ACCENT : i < activeStep ? INK : HAIR,
          transition: 'width 400ms ease, background 400ms ease',
        }}/>
      ))}
    </div>
  )
}

// ─── Scene 1: QR-Code auf dem Tisch (0–4s) ───────────────────────────────────
function SceneQR({ t, globalTime }: { t: number; globalTime: number }) {
  const entry = Easing.easeOutCubic(clamp(t / 0.6, 0, 1))
  const exit  = Easing.easeInCubic(clamp((t - 3.5) / 0.5, 0, 1))
  const op    = entry * (1 - exit)
  const pulse = 0.5 + Math.sin(globalTime * 2.2) * 0.5

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">

        {/* Card on table */}
        <g transform="translate(960, 480)">
          {/* Shadow */}
          <ellipse cx="0" cy="220" rx="200" ry="18" fill={INK} opacity="0.08"/>
          {/* Card */}
          <rect x="-170" y="-220" width="340" height="440" rx="24" fill={SURFACE}
                stroke={HAIR} strokeWidth="2"/>
          {/* Top accent bar */}
          <rect x="-170" y="-220" width="340" height="8" rx="4" fill={ACCENT}/>

          {/* QR Code */}
          <QRPattern x={-110} y={-180} size={220}/>

          {/* Pulsing rings */}
          <circle cx="0" cy="-70" r={140 + pulse * 20} fill="none"
                  stroke={ACCENT} strokeWidth="1.5" opacity={0.15 + pulse * 0.1}/>
          <circle cx="0" cy="-70" r={170 + pulse * 25} fill="none"
                  stroke={ACCENT} strokeWidth="1" opacity={0.08 + pulse * 0.06}/>

          {/* Text below QR */}
          <text x="0" y="80" fontFamily={SANS} fontSize="22" fontWeight="700"
                fill={INK} textAnchor="middle">Pension Schönbrunn</text>
          <text x="0" y="112" fontFamily={SANS} fontSize="16" fill={MUTED}
                textAnchor="middle">Scannen für Hotelinfos</text>
          <text x="0" y="138" fontFamily={SANS} fontSize="16" fill={MUTED}
                textAnchor="middle">Scan for hotel info</text>
          <text x="0" y="174" fontFamily={MONO} fontSize="12" fill={HAIR}
                textAnchor="middle" letterSpacing="0.12em">na-max.com</text>
        </g>

        {/* Left label */}
        <g transform={`translate(0, ${(1 - entry) * 30})`} opacity={entry}>
          <text x={200} y={420} fontFamily={SANS} fontSize="72" fontWeight="700"
                fill={INK} letterSpacing="-0.02em">Schritt 1</text>
          <text x={200} y={510} fontFamily={SANS} fontSize="44" fontWeight="700"
                fill={ACCENT} letterSpacing="-0.01em">QR-Code ausdrucken.</text>
          <text x={200} y={570} fontFamily={SANS} fontSize="26" fill={MUTED}>
            Einmal laminieren — fertig für Jahre.
          </text>
        </g>

        {/* Step badge */}
        <g transform="translate(1600, 380)">
          <circle cx="0" cy="0" r="60" fill={ACCENT} opacity="0.1"/>
          <text x="0" y="12" fontFamily={MONO} fontSize="48" fontWeight="700"
                fill={ACCENT} textAnchor="middle">1</text>
          <text x="0" y="50" fontFamily={MONO} fontSize="13" fill={ACCENT}
                textAnchor="middle" letterSpacing="0.1em">VON 3</text>
        </g>
      </svg>
    </div>
  )
}

// ─── Scene 2: Gast scannt (4–8s) ─────────────────────────────────────────────
function SceneScan({ t, globalTime }: { t: number; globalTime: number }) {
  const entry   = Easing.easeOutCubic(clamp(t / 0.6, 0, 1))
  const exit    = Easing.easeInCubic(clamp((t - 3.5) / 0.5, 0, 1))
  const op      = entry * (1 - exit)
  const scanY   = ((globalTime * 0.4) % 1) * 300 + 200
  const scanned = t > 2.0
  const okT     = Easing.easeOutCubic(clamp((t - 2.0) / 0.5, 0, 1))

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">

        {/* Phone */}
        <g transform="translate(850, 90)">
          {/* Shadow */}
          <ellipse cx="240" cy="940" rx="200" ry="16" fill={INK} opacity="0.08"/>
          {/* Body */}
          <rect x="0" y="0" width="480" height="920" rx="56" fill={SURFACE}
                stroke={INK} strokeWidth="2.5"/>
          <rect x="18" y="18" width="444" height="884" rx="40" fill={BG}
                stroke={HAIR} strokeWidth="1"/>
          {/* Notch */}
          <rect x="170" y="30" width="140" height="24" rx="12" fill={INK}/>

          {/* Camera viewfinder */}
          <rect x="48" y="100" width="384" height="420" rx="20" fill={INK} opacity="0.05"/>
          {/* Corner brackets */}
          {[[48, 100], [432, 100], [48, 520], [432, 520]].map(([cx, cy], i) => {
            const dx = cx < 240 ? 1 : -1
            const dy = cy < 300 ? 1 : -1
            return (
              <g key={i} stroke={scanned ? GREEN : ACCENT} strokeWidth="3.5" fill="none">
                <line x1={cx} y1={cy} x2={cx + 36 * dx} y2={cy}/>
                <line x1={cx} y1={cy} x2={cx} y2={cy + 36 * dy}/>
              </g>
            )
          })}

          {/* QR inside viewfinder (small) */}
          <g opacity="0.7">
            <QRPattern x={140} y={210} size={200}/>
          </g>

          {/* Scan line */}
          {!scanned && (
            <>
              <line x1="68" y1={scanY} x2="412" y2={scanY}
                    stroke={ACCENT} strokeWidth="2.5" opacity="0.9"/>
              <rect x="68" y={scanY - 50} width="344" height="50"
                    fill={ACCENT} opacity="0.06"/>
            </>
          )}

          {/* Scanned checkmark */}
          {scanned && (
            <g transform="translate(240, 310)" opacity={okT}>
              <circle cx="0" cy="0" r={60 * okT} fill={GREEN} opacity="0.15"/>
              <circle cx="0" cy="0" r="40" fill={GREEN} opacity={okT}/>
              <path d={`M -18 0 L -6 14 L 20 -14`} fill="none"
                    stroke={SURFACE} strokeWidth="4.5" strokeLinecap="round"/>
            </g>
          )}

          {/* Status bar */}
          <text x="52" y="90" fontFamily={MONO} fontSize="16" fill={INK} letterSpacing="0.08em">
            9:41
          </text>

          {/* Bottom status */}
          <text x="240" y="590" fontFamily={SANS} fontSize="20" fill={scanned ? GREEN : MUTED}
                textAnchor="middle" fontWeight={scanned ? 700 : 400}>
            {scanned ? '✓ Erkannt' : 'Kamera hält QR-Code...'}
          </text>

          {/* URL bar */}
          <rect x="40" y="630" width="400" height="44" rx="22" fill={SURFACE} stroke={HAIR} strokeWidth="1"/>
          <text x="240" y="658" fontFamily={MONO} fontSize="14" fill={MUTED}
                textAnchor="middle" letterSpacing="0.04em">
            {scanned ? 'na-max.com/pension-schoenbrunn' : '...'}
          </text>
        </g>

        {/* Left label */}
        <g transform={`translate(0, ${(1 - entry) * 30})`} opacity={entry}>
          <text x={200} y={420} fontFamily={SANS} fontSize="72" fontWeight="700"
                fill={INK} letterSpacing="-0.02em">Schritt 2</text>
          <text x={200} y={510} fontFamily={SANS} fontSize="44" fontWeight="700"
                fill={ACCENT} letterSpacing="-0.01em">Gast scannt.</text>
          <text x={200} y={570} fontFamily={SANS} fontSize="26" fill={MUTED}>
            Kein Download. Kein Login.
          </text>
          <text x={200} y={614} fontFamily={SANS} fontSize="26" fill={MUTED}>
            Browser öffnet — fertig.
          </text>
        </g>

        {/* Step badge */}
        <g transform="translate(1600, 380)">
          <circle cx="0" cy="0" r="60" fill={ACCENT} opacity="0.1"/>
          <text x="0" y="12" fontFamily={MONO} fontSize="48" fontWeight="700"
                fill={ACCENT} textAnchor="middle">2</text>
          <text x="0" y="50" fontFamily={MONO} fontSize="13" fill={ACCENT}
                textAnchor="middle" letterSpacing="0.1em">VON 3</text>
        </g>
      </svg>
    </div>
  )
}

// ─── Scene 3: Gast-Seite öffnet sich (8–12s) ─────────────────────────────────
function ScenePage({ t }: { t: number }) {
  const entry  = Easing.easeOutCubic(clamp(t / 0.7, 0, 1))
  const op     = entry
  const langDE = t < 2.5
  const langT  = Easing.easeOutCubic(clamp((t - 2.0) / 0.4, 0, 1))

  const blocks = [
    { icon: '📶', de: 'WLAN',       en: 'WiFi',         val: 'GuestWifi · wien2025' },
    { icon: '🔑', de: 'Check-in',   en: 'Check-in',     val: langDE ? '15:00 – 22:00 Uhr' : '3 PM – 10 PM' },
    { icon: '🍳', de: 'Frühstück',  en: 'Breakfast',    val: langDE ? '7:00 – 10:00 Uhr' : '7 AM – 10 AM' },
    { icon: '🅿️', de: 'Parken',     en: 'Parking',      val: langDE ? 'Garage 200m · €18/Tag' : 'Garage 200m · €18/day' },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">

        {/* Phone with guest page */}
        <g transform="translate(820, 60)">
          <ellipse cx="260" cy="960" rx="220" ry="16" fill={INK} opacity="0.08"/>
          <rect x="0" y="0" width="520" height="950" rx="56" fill={SURFACE}
                stroke={INK} strokeWidth="2.5"/>
          <rect x="18" y="18" width="484" height="914" rx="40" fill="#f5f7fa"
                stroke={HAIR} strokeWidth="1"/>
          <rect x="185" y="28" width="150" height="24" rx="12" fill={INK}/>

          {/* Hero image placeholder */}
          <rect x="18" y="58" width="484" height="160" fill={ACCENT} opacity="0.15" rx="4"/>
          <text x="260" y="148" fontFamily={SANS} fontSize="18" fill={ACCENT}
                textAnchor="middle" opacity="0.6">[ Foto des Hotels ]</text>

          {/* Lang switcher */}
          <rect x="390" y="68" width="96" height="36" rx="18" fill={SURFACE}
                stroke={HAIR} strokeWidth="1"/>
          <rect x={langDE ? '392' : '440'} y="70" width="46" height="32" rx="16"
                fill={ACCENT} style={{ transition: 'x 400ms ease' }}/>
          <text x="415" y="92" fontFamily={MONO} fontSize="14" fontWeight="700"
                fill={langDE ? SURFACE : MUTED} textAnchor="middle">DE</text>
          <text x="463" y="92" fontFamily={MONO} fontSize="14" fontWeight="700"
                fill={langDE ? MUTED : SURFACE} textAnchor="middle">EN</text>

          {/* Property name */}
          <rect x="18" y="228" width="484" height="64" fill={SURFACE} rx="4"/>
          <text x="42" y="258" fontFamily={SANS} fontSize="22" fontWeight="700"
                fill={INK}>Pension Schönbrunn</text>
          <text x="42" y="282" fontFamily={SANS} fontSize="15" fill={MUTED}>
            {langDE ? 'Wien · Willkommen!' : 'Vienna · Welcome!'}
          </text>

          {/* Content blocks */}
          {blocks.map((b, i) => {
            const blockEntry = Easing.easeOutCubic(clamp((t - 0.2 - i * 0.15) / 0.4, 0, 1))
            return (
              <g key={i} transform={`translate(0, ${(1 - blockEntry) * 20})`} opacity={blockEntry}>
                <rect x="28" y={308 + i * 96} width="464" height="80" rx="16"
                      fill={SURFACE} stroke={HAIR} strokeWidth="1"/>
                <text x="72" y={354 + i * 96} fontFamily={SANS} fontSize="20">{b.icon}</text>
                <text x="108" y={348 + i * 96} fontFamily={SANS} fontSize="17"
                      fontWeight="600" fill={INK}>
                  {langDE ? b.de : b.en}
                </text>
                <text x="108" y={370 + i * 96} fontFamily={SANS} fontSize="14" fill={MUTED}>
                  {b.val}
                </text>
              </g>
            )
          })}
        </g>

        {/* Language switch arrow */}
        {t > 1.8 && t < 3.2 && (
          <g opacity={Math.min(langT, 1 - clamp((t - 2.8) / 0.4, 0, 1))}>
            <path d="M 1375 400 L 1420 450 L 1375 500" fill="none"
                  stroke={ACCENT} strokeWidth="3" strokeLinecap="round"/>
            <text x="1240" y="448" fontFamily={SANS} fontSize="24" fill={ACCENT}
                  fontWeight="600">Sprache wechseln</text>
          </g>
        )}

        {/* Left label */}
        <g transform={`translate(0, ${(1 - entry) * 30})`} opacity={entry}>
          <text x={160} y={380} fontFamily={SANS} fontSize="72" fontWeight="700"
                fill={INK} letterSpacing="-0.02em">Schritt 3</text>
          <text x={160} y={470} fontFamily={SANS} fontSize="44" fontWeight="700"
                fill={ACCENT} letterSpacing="-0.01em">Seite öffnet sich.</text>
          <text x={160} y={535} fontFamily={SANS} fontSize="26" fill={MUTED}>
            Auf Deutsch. Auf Englisch.
          </text>
          <text x={160} y={579} fontFamily={SANS} fontSize="26" fill={MUTED}>
            In der Sprache des Gastes.
          </text>

          {/* Checkmarks */}
          {[
            'WLAN-Passwort sofort sichtbar',
            'Check-in & Frühstückszeiten',
            'Parken & Kontakt',
            'Immer aktuell — ohne Drucker',
          ].map((text, i) => {
            const ti = Easing.easeOutCubic(clamp((t - 0.6 - i * 0.2) / 0.4, 0, 1))
            return (
              <g key={i} transform={`translate(160, ${640 + i * 52})`} opacity={ti}>
                <circle cx="12" cy="12" r="12" fill={GREEN} opacity="0.15"/>
                <text x="12" y="17" fontFamily={MONO} fontSize="14" fill={GREEN}
                      textAnchor="middle">✓</text>
                <text x="36" y="17" fontFamily={SANS} fontSize="20" fill={INK}>{text}</text>
              </g>
            )
          })}
        </g>

        {/* Step badge */}
        <g transform="translate(1600, 380)">
          <circle cx="0" cy="0" r="60" fill={GREEN} opacity="0.1"/>
          <text x="0" y="12" fontFamily={MONO} fontSize="48" fontWeight="700"
                fill={GREEN} textAnchor="middle">✓</text>
          <text x="0" y="50" fontFamily={MONO} fontSize="13" fill={GREEN}
                textAnchor="middle" letterSpacing="0.1em">LIVE</text>
        </g>
      </svg>
    </div>
  )
}

// ─── Background grid ──────────────────────────────────────────────────────────
function GridBG({ time }: { time: number }) {
  const ox = (time * 3) % 40
  const oy = (time * 1.5) % 40
  return (
    <div style={{
      position: 'absolute', inset: 0, background: BG,
      backgroundImage: `radial-gradient(${HAIR} 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      backgroundPosition: `${-ox}px ${-oy}px`,
      opacity: 0.5,
    }}/>
  )
}

// ─── Main inner ───────────────────────────────────────────────────────────────
function NaMaxVideoInner() {
  const time = useTime()

  // Local time per scene
  const t1 = clamp(time, 0, 4)
  const t2 = clamp(time - 4, 0, 4)
  const t3 = clamp(time - 8, 0, 4)

  const step = time < 4 ? 0 : time < 8 ? 1 : 2

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: BG }}>
      <GridBG time={time}/>
      <SceneQR   t={t1} globalTime={time}/>
      <SceneScan t={t2} globalTime={time}/>
      <ScenePage t={t3}/>
      <StepDots  activeStep={step}/>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function NaMaxVideo({ controls = false }: { controls?: boolean } = {}) {
  return (
    <Stage
      width={1920} height={1080}
      duration={12}
      background={BG}
      autoplay loop
      controls={controls}
    >
      <NaMaxVideoInner/>
    </Stage>
  )
}
