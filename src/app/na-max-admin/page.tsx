'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Property {
  id: string; slug: string; name: string; type: string
  city: string; plan: string; trial_ends: string; created_at: string
}

interface Lead {
  id: string; property_type: string; rooms: string; city: string
  guest_mix: string; hotel_name: string; email: string; created_at: string
}

const PLAN_COLORS: Record<string, string> = {
  trial:      'bg-amber-100 text-amber-700',
  starter:    'bg-sky-100 text-sky-700',
  global:     'bg-emerald-100 text-emerald-700',
  enterprise: 'bg-purple-100 text-purple-700',
}

// ─── Auth gate ────────────────────────────────────────────────────────────────

function useAdminAuth() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw]         = useState('')
  const [err, setErr]       = useState(false)

  useEffect(() => {
    setAuthed(sessionStorage.getItem('na-max-admin') === 'ok')
  }, [])

  const login = async () => {
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) { sessionStorage.setItem('na-max-admin', 'ok'); setAuthed(true) }
    else { setErr(true) }
  }

  return { authed, pw, setPw, login, err }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { authed, pw, setPw, login, err } = useAdminAuth()
  const [tab, setTab]             = useState<'properties' | 'leads'>('properties')
  const [properties, setProperties] = useState<Property[]>([])
  const [leads, setLeads]           = useState<Lead[]>([])
  const [loading, setLoading]       = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)
    const [{ data: props }, { data: ls }] = await Promise.all([
      supabase.rpc('admin_get_all_properties'),
      supabase.rpc('admin_get_all_leads'),
    ])
    setProperties((props as Property[]) ?? [])
    setLeads((ls as Lead[]) ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { if (authed) loadData() }, [authed, loadData])

  const updatePlan = async (id: string, plan: string) => {
    await supabase.rpc('admin_update_plan', { p_id: id, p_plan: plan })
    setProperties(prev => prev.map(p => p.id === id ? { ...p, plan } : p))
  }

  const deleteProperty = async (id: string, name: string) => {
    if (!confirm(`„${name}" wirklich löschen?`)) return
    await supabase.rpc('admin_delete_property', { p_id: id })
    setProperties(prev => prev.filter(p => p.id !== id))
  }

  // ── Login screen ─────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <h1 className="text-xl font-bold text-brand-navy mb-1">Na-Max Admin</h1>
          <p className="text-sm text-brand-muted mb-6">Nur für internen Gebrauch</p>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="Passwort"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm mb-3
                       focus:outline-none focus:ring-2 focus:ring-brand-sky/40"
          />
          {err && <p className="text-xs text-red-500 mb-3">Falsches Passwort</p>}
          <button
            onClick={login}
            className="w-full py-2.5 bg-brand-sky text-white rounded-xl text-sm font-semibold"
          >
            Einloggen →
          </button>
        </div>
      </div>
    )
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-brand-surface">

      {/* Header */}
      <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg">Na-Max Admin</h1>
          <p className="text-white/50 text-xs">{properties.length} Objekte · {leads.length} Leads</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-brand-sky rounded-lg text-sm font-semibold hover:bg-brand-sky-dark transition-colors"
          >
            + Neuer Kunde
          </button>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white px-6">
        <div className="flex gap-6">
          {(['properties', 'leads'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 text-sm font-semibold border-b-2 transition-colors ${
                tab === t
                  ? 'border-brand-sky text-brand-sky'
                  : 'border-transparent text-brand-muted hover:text-brand-slate'
              }`}
            >
              {t === 'properties'
                ? `Objekte (${properties.length})`
                : `Leads (${leads.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {loading && <p className="text-sm text-brand-muted">Lädt…</p>}

        {/* ── Properties Tab ─────────────────────────────────────────────── */}
        {tab === 'properties' && !loading && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  {['Objekt', 'Typ', 'Stadt', 'Plan', 'Erstellt', 'Link', 'Aktionen'].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {properties.map(p => (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-brand-navy">{p.name}</td>
                    <td className="px-4 py-3 text-brand-slate capitalize">{p.type}</td>
                    <td className="px-4 py-3 text-brand-slate">{p.city}</td>
                    <td className="px-4 py-3">
                      <select
                        value={p.plan}
                        onChange={e => updatePlan(p.id, e.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${PLAN_COLORS[p.plan] ?? 'bg-slate-100'}`}
                      >
                        <option value="trial">trial</option>
                        <option value="starter">starter</option>
                        <option value="global">global</option>
                        <option value="enterprise">enterprise</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-brand-muted text-xs">
                      {new Date(p.created_at).toLocaleDateString('de-AT')}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-sky hover:underline text-xs"
                      >
                        /{p.slug} ↗
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteProperty(p.id, p.name)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                      >
                        Löschen
                      </button>
                    </td>
                  </tr>
                ))}
                {properties.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-brand-muted text-sm">
                      Noch keine Objekte
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Leads Tab ──────────────────────────────────────────────────── */}
        {tab === 'leads' && !loading && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  {['Hotel / Pension', 'E-Mail', 'Typ', 'Zimmer', 'Stadt', 'Gäste', 'Datum'].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map(l => (
                  <tr key={l.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-brand-navy">{l.hotel_name || '—'}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${l.email}`} className="text-brand-sky hover:underline">
                        {l.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-brand-slate">{l.property_type || '—'}</td>
                    <td className="px-4 py-3 text-brand-slate">{l.rooms || '—'}</td>
                    <td className="px-4 py-3 text-brand-slate">{l.city || '—'}</td>
                    <td className="px-4 py-3 text-brand-slate text-xs">{l.guest_mix || '—'}</td>
                    <td className="px-4 py-3 text-brand-muted text-xs">
                      {new Date(l.created_at).toLocaleDateString('de-AT')}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-brand-muted text-sm">
                      Noch keine Leads
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Add Property Modal ─────────────────────────────────────────────── */}
      {showAddForm && (
        <AddPropertyModal
          onClose={() => setShowAddForm(false)}
          onAdded={() => { setShowAddForm(false); loadData() }}
        />
      )}
    </div>
  )
}

// ─── Add Property Modal ───────────────────────────────────────────────────────

function AddPropertyModal({ onClose, onAdded }: { onClose: () => void; onAdded: () => void }) {
  const [form, setForm] = useState({ name: '', slug: '', type: 'pension', city: '', plan: 'trial' })
  const [saving, setSaving] = useState(false)
  const [err, setErr]       = useState('')

  const toSlug = (v: string) => v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  const handleNameChange = (name: string) => {
    setForm(f => ({ ...f, name, slug: toSlug(name) }))
  }

  const save = async () => {
    if (!form.name || !form.slug || !form.city) { setErr('Bitte alle Felder ausfüllen'); return }
    setSaving(true)
    const { error } = await supabase.rpc('admin_create_property', {
      p_name: form.name, p_slug: form.slug,
      p_type: form.type, p_city: form.city, p_plan: form.plan,
    })
    setSaving(false)
    if (error) { setErr(error.message); return }
    onAdded()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-lg font-bold text-brand-navy mb-5">Neues Objekt anlegen</h2>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Name *</label>
            <input value={form.name} onChange={e => handleNameChange(e.target.value)}
              placeholder="Pension Schönbrunn"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky/40" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">URL-Slug *</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted">na-max.com/</span>
              <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: toSlug(e.target.value) }))}
                placeholder="pension-schoenbrunn"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky/40" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Typ</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none">
                <option value="hotel">Hotel</option>
                <option value="pension">Pension / B&B</option>
                <option value="apartment">Apartment</option>
                <option value="hostel">Hostel</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Plan</label>
              <select value={form.plan} onChange={e => setForm(f => ({ ...f, plan: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none">
                <option value="trial">Trial</option>
                <option value="starter">Starter €29</option>
                <option value="global">Global €59</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Stadt *</label>
            <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
              placeholder="Wien"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky/40" />
          </div>
        </div>

        {err && <p className="mt-3 text-xs text-red-500">{err}</p>}

        <div className="flex gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm text-brand-slate hover:bg-slate-50 transition-colors">
            Abbrechen
          </button>
          <button onClick={save} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-brand-sky text-white text-sm font-semibold hover:bg-brand-sky-dark transition-colors disabled:opacity-60">
            {saving ? 'Speichert…' : 'Anlegen →'}
          </button>
        </div>
      </div>
    </div>
  )
}
