# Na-Max — Digitale Willkommenskarte

SaaS-Produkt für Hotels, Pensionen und Apartmentvermietungen im DACH-Raum.  
Gäste scannen einen QR-Code und sehen sofort eine mehrsprachige Hotelinfo-Seite — ohne App, ohne Login.

**Live:** [www.na-max.com](https://www.na-max.com)  
**GitHub:** [NSM1276/na-max.com](https://github.com/NSM1276/na-max.com)

---

## Stack

| Layer | Technologie |
|-------|-------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom brand tokens |
| Animationen | Framer Motion |
| Datenbank | Supabase (PostgreSQL + Auth + Storage) |
| Hosting | Vercel (auto-deploy von GitHub `master`) |
| DNS | IONOS → A `@` 76.76.21.21, CNAME `www` → cname.vercel-dns.com |

---

## Lokale Entwicklung

```bash
npm install
npm run dev
# → http://localhost:3000
```

**Pflichtdatei:** `.env.local` im Root (nicht im Git):
```
NEXT_PUBLIC_SUPABASE_URL=https://wuyyeeadepmzjqihlixb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Dieselben Werte müssen auch in Vercel unter **Settings → Environment Variables** stehen.  
Falls Login mit "Invalid API key" fehlschlägt → Vercel-Wert prüfen/aktualisieren.

---

## Deployment

```bash
git add .
git commit -m "dein commit message"
git push origin master
# Vercel deployt automatisch in ~1-2 Minuten
```

Build-Status prüfen: [vercel.com → na-max-com → Deployments](https://vercel.com/nasim2131-6695s-projects/na-max-com/deployments)

---

## Projektstruktur

```
src/
├── app/
│   ├── (marketing)/
│   │   └── page.tsx              ← Landing Page (alle Sections)
│   ├── [slug]/
│   │   └── page.tsx              ← Gäste-Seite (z.B. /pension-demo)
│   ├── hotel/
│   │   ├── dashboard/
│   │   │   ├── page.tsx          ← Server Component (Auth-Check)
│   │   │   └── DashboardClient.tsx ← Admin-Dashboard (3 Tabs)
│   │   └── login/
│   │       └── page.tsx          ← Magic Link Login
│   └── api/
│       └── admin/auth/route.ts
├── components/
│   ├── sections/                 ← Landing Page Sections
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── DemoSection.tsx       ← Live Preview Demo (kein Supabase)
│   │   ├── FeaturesSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FaqSection.tsx
│   │   └── RegistrationFunnelSection.tsx  ← id="pilot"
│   ├── guest/
│   │   └── GuestPageClient.tsx   ← Gäste-Seite (DE/EN, Blöcke)
│   ├── hero/
│   │   └── NaMaxVideo.tsx        ← 3-step Hero Animation (12s Loop)
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileStickyCtaBar.tsx
│   └── ui/
│       ├── Button.tsx
│       └── SectionWrapper.tsx
└── lib/
    ├── constants.ts              ← Alle Texte, Preise, Features
    ├── supabase-server.ts        ← Server-side Supabase client (@supabase/ssr)
    └── motion.ts                 ← Framer Motion Varianten
```

---

## Supabase

**Projekt-ID:** `wuyyeeadepmzjqihlixb`  
**Dashboard:** [supabase.com/dashboard/project/wuyyeeadepmzjqihlixb](https://supabase.com/dashboard/project/wuyyeeadepmzjqihlixb)

### Tabellen

| Tabelle | Zweck |
|---------|-------|
| `properties` | Hotel/Pension/Apartment — slug, name, city, plan |
| `content_blocks` | WiFi, Check-in, Frühstück, Regeln (DE + EN Felder) |
| `photos` | Fotos (Supabase Storage, max 2 pro Objekt) |
| `leads` | Anfragen von der Landing Page (RegistrationFunnel) |

### RLS-Policies
- `properties`, `content_blocks`, `photos` → **Public SELECT** (Gäste lesen ohne Auth)
- Nur der Eigentümer kann seine eigenen Daten schreiben (owner_id = auth.uid())

### Demo-Daten
`/pension-demo` → slug `pension-demo` in DB mit 6 Content-Blöcken (WiFi, Check-in, Frühstück, Parken, Regeln, Kontakt)

### Auth
Magic Link (Supabase E-Mail OTP). Kein Passwort nötig.  
`/hotel/dashboard` → leitet zu `/hotel/login` um wenn nicht eingeloggt.

---

## Features

- **DemoSection** — Live Preview auf der Landing Page: linke Seite editierbar, rechts Phone-Mockup aktualisiert sich sofort. Kein Supabase, nur lokaler State. Reset-Knopf.
- **DE/EN Sprache** — Gäste-Seite erkennt `navigator.language`, Umschalter oben rechts
- **Mobile-first** — responsive, iOS safe-area-inset-bottom, sticky CTA Bar
- **Optimistic UI** — Dashboard speichert sofort, macht bei Fehler rückgängig
- **onError auf Bildern** — kaputte Bilder werden ausgeblendet (kein [?] placeholder)

---

## Preise

| Plan | Preis | Sprachen |
|------|-------|---------|
| Trial | 14 Tage gratis | DE + EN |
| Starter | €29/Monat | DE + EN |
| Global | €59/Monat | 20+ Sprachen |

---

## Bekannte Offene Punkte

- [ ] PDF-Download — druckbare A4-Karte mit QR-Code (geplant)
- [ ] Per-Hotel Branding — eigene Farben (color_bg, color_primary in DB)
- [ ] Supabase Realtime — Gäste-Seite ohne Reload aktualisieren
- [ ] Sticky Section-Nav auf Gäste-Seite (WiFi · Check-in · Frühstück)
- [ ] Hamburger-Menü auf Mobile (Navbar-Links aktuell nur auf Desktop)

---

## Letzter QA-Test (2026-05-15)

| # | Status | Was |
|---|--------|-----|
| Landing Page Sections | ✅ | Alle Sections sichtbar |
| Demo Section | ✅ | Live edit + Phone preview funktioniert |
| "Pilot starten" Buttons | ✅ | Scrollen zur Registrierungsform (id="pilot") |
| /hotel/dashboard → /hotel/login | ✅ | Auth-Redirect korrekt |
| Mobile 375px | ✅ | Tabs, Layout, Sticky-Bar OK |
| /pension-demo Gäste-Seite | ⚠️ | Daten in DB, RLS public gelöst — prüfen |
| Login Magic Link | ❌ | "Invalid API key" — Vercel env var prüfen/aktualisieren |
