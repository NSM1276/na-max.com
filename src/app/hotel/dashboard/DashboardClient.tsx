'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { supabase, Property, ContentBlock, Photo } from '@/lib/supabase'
import imageCompression from 'browser-image-compression'
import QRCode from 'qrcode'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'inhalt' | 'fotos' | 'qr'

const BLOCK_TYPES = [
  { type: 'wifi',      label: 'WLAN' },
  { type: 'checkin',   label: 'Check-in' },
  { type: 'checkout',  label: 'Check-out' },
  { type: 'breakfast', label: 'Frühstück' },
  { type: 'parking',   label: 'Parkplatz' },
  { type: 'contact',   label: 'Kontakt' },
  { type: 'other',     label: 'Sonstiges' },
]

interface Props {
  property: Property
  initialBlocks: ContentBlock[]
  initialPhotos: Photo[]
  userId: string
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DashboardClient({ property, initialBlocks, initialPhotos }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('inhalt')
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialBlocks)
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos)

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-card sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-brand-navy">Na-Max</span>
            <span className="text-brand-muted text-sm hidden sm:inline">/ {property.name}</span>
          </div>
          <button
            onClick={() => supabase.auth.signOut().then(() => { window.location.href = '/hotel/login' })}
            className="text-sm text-brand-muted hover:text-brand-slate transition"
          >
            Abmelden
          </button>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <nav className="flex gap-1">
            {([
              { id: 'inhalt', label: 'Inhalt' },
              { id: 'fotos',  label: 'Fotos' },
              { id: 'qr',     label: 'QR-Code' },
            ] as { id: Tab; label: string }[]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-brand-sky text-brand-sky'
                    : 'border-transparent text-brand-muted hover:text-brand-slate'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {activeTab === 'inhalt' && (
          <InhaltTab
            property={property}
            blocks={blocks}
            setBlocks={setBlocks}
          />
        )}
        {activeTab === 'fotos' && (
          <FotosTab
            property={property}
            photos={photos}
            setPhotos={setPhotos}
          />
        )}
        {activeTab === 'qr' && (
          <QRTab property={property} />
        )}
      </main>
    </div>
  )
}

// ─── Tab: Inhalt ──────────────────────────────────────────────────────────────

function InhaltTab({
  property,
  blocks,
  setBlocks,
}: {
  property: Property
  blocks: ContentBlock[]
  setBlocks: (blocks: ContentBlock[]) => void
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-brand-muted mb-4">
        Pflegen Sie hier die Inhalte für Ihre Gäste. Jeder Block erscheint in der Gäste-App.
      </p>
      {BLOCK_TYPES.map((bt) => {
        const existing = blocks.find((b) => b.type === bt.type) ?? null
        return (
          <BlockItem
            key={bt.type}
            blockType={bt.type}
            label={bt.label}
            block={existing}
            property={property}
            onSave={(saved) => {
              setBlocks(
                existing
                  ? blocks.map((b) => (b.id === saved.id ? saved : b))
                  : [...blocks, saved]
              )
            }}
            onDelete={(id) => setBlocks(blocks.filter((b) => b.id !== id))}
          />
        )
      })}
    </div>
  )
}

function BlockItem({
  blockType,
  label,
  block,
  property,
  onSave,
  onDelete,
}: {
  blockType: string
  label: string
  block: ContentBlock | null
  property: Property
  onSave: (block: ContentBlock) => void
  onDelete: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const [form, setForm] = useState({
    title_de: block?.title_de ?? '',
    title_en: block?.title_en ?? '',
    body_de:  block?.body_de  ?? '',
    body_en:  block?.body_en  ?? '',
  })

  // Sync form when block changes from outside
  useEffect(() => {
    setForm({
      title_de: block?.title_de ?? '',
      title_en: block?.title_en ?? '',
      body_de:  block?.body_de  ?? '',
      body_en:  block?.body_en  ?? '',
    })
  }, [block])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  async function handleSave() {
    setSaving(true)
    if (block) {
      // Optimistic: update immediately
      const optimistic = { ...block, ...form } as ContentBlock
      onSave(optimistic)
      showToast('Gespeichert')
      setExpanded(false)
      const { data, error } = await supabase
        .from('content_blocks')
        .update(form)
        .eq('id', block.id)
        .select()
        .single()
      setSaving(false)
      if (error) {
        onSave(block) // revert
        showToast('Fehler beim Speichern')
        setExpanded(true)
      } else {
        onSave(data as ContentBlock)
      }
    } else {
      const { data, error } = await supabase
        .from('content_blocks')
        .insert({ ...form, property_id: property.id, type: blockType, position: 0 })
        .select()
        .single()
      setSaving(false)
      if (error) { showToast('Fehler beim Speichern'); return }
      onSave(data as ContentBlock)
      showToast('Erstellt')
      setExpanded(false)
    }
  }

  async function handleDelete() {
    if (!block) return
    setDeleting(true)
    // Optimistic: remove immediately
    onDelete(block.id)
    setExpanded(false)
    const { error } = await supabase.from('content_blocks').delete().eq('id', block.id)
    setDeleting(false)
    if (error) {
      onSave(block) // revert — put it back
      showToast('Fehler beim Löschen')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* Row */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-brand-navy">{label}</span>
          {block ? (
            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-sky/10 text-brand-sky font-medium">Aktiv</span>
          ) : (
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-brand-muted">Nicht angelegt</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!block && !expanded && (
            <span className="text-xs text-brand-sky font-medium">+ Hinzufügen</span>
          )}
          <svg
            className={`w-4 h-4 text-brand-muted transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Expanded form */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-brand-slate mb-1">Titel (Deutsch)</label>
              <input
                type="text"
                value={form.title_de}
                onChange={(e) => setForm({ ...form, title_de: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky/40 focus:border-brand-sky"
                placeholder="z.B. WLAN"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-brand-slate mb-1">Titel (Englisch)</label>
              <input
                type="text"
                value={form.title_en}
                onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky/40 focus:border-brand-sky"
                placeholder="e.g. WiFi"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-brand-slate mb-1">Inhalt (Deutsch)</label>
              <textarea
                rows={4}
                value={form.body_de}
                onChange={(e) => setForm({ ...form, body_de: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky/40 focus:border-brand-sky resize-none"
                placeholder="Passwort: HotelXYZ2024"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-brand-slate mb-1">Inhalt (Englisch)</label>
              <textarea
                rows={4}
                value={form.body_en}
                onChange={(e) => setForm({ ...form, body_en: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky/40 focus:border-brand-sky resize-none"
                placeholder="Password: HotelXYZ2024"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-1" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-brand-sky hover:bg-brand-sky-dark text-white text-sm font-medium transition disabled:opacity-50 shadow-cta hover:shadow-cta-hover"
            >
              {saving ? 'Speichern…' : 'Speichern'}
            </button>
            {block && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium transition disabled:opacity-50"
              >
                {deleting ? 'Löschen…' : 'Löschen'}
              </button>
            )}
            <button
              onClick={() => setExpanded(false)}
              className="ml-auto text-sm text-brand-muted hover:text-brand-slate transition"
            >
              Abbrechen
            </button>
          </div>
          {toast && (
            <p className="text-xs text-brand-sky font-medium">{toast}</p>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Tab: Fotos ───────────────────────────────────────────────────────────────

function FotosTab({
  property,
  photos,
  setPhotos,
}: {
  property: Property
  photos: Photo[]
  setPhotos: (photos: Photo[]) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getPublicUrl = useCallback((path: string) => {
    const { data } = supabase.storage.from('property-photos').getPublicUrl(path)
    return data.publicUrl
  }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (photos.length >= 2) {
      setError('Maximal 2 Fotos erlaubt. Bitte löschen Sie zuerst ein Foto.')
      return
    }

    setUploading(true)
    setError(null)

    try {
      let fileToUpload: File | Blob = file
      try {
        fileToUpload = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        })
      } catch {
        // compression failed, upload original
        fileToUpload = file
      }

      const ext = file.name.split('.').pop() ?? 'jpg'
      const path = `${property.id}/${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('property-photos')
        .upload(path, fileToUpload, { contentType: file.type })

      if (uploadError) throw uploadError

      const { data: photoData, error: dbError } = await supabase
        .from('photos')
        .insert({ property_id: property.id, storage_path: path, position: photos.length })
        .select()
        .single()

      if (dbError) throw dbError

      setPhotos([...photos, photoData as Photo])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload fehlgeschlagen')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function handleDelete(photo: Photo) {
    const { error: storageError } = await supabase.storage
      .from('property-photos')
      .remove([photo.storage_path])

    if (storageError) {
      setError(storageError.message)
      return
    }

    const { error: dbError } = await supabase
      .from('photos')
      .delete()
      .eq('id', photo.id)

    if (dbError) {
      setError(dbError.message)
      return
    }

    setPhotos(photos.filter((p) => p.id !== photo.id))
  }

  return (
    <div>
      <p className="text-sm text-brand-muted mb-4">
        Laden Sie bis zu 2 Fotos Ihres Hotels hoch. Diese erscheinen in der Gäste-App.
      </p>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group rounded-2xl overflow-hidden bg-slate-100 shadow-card aspect-video">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getPublicUrl(photo.storage_path)}
              alt="Hotel Foto"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <button
                onClick={() => handleDelete(photo)}
                className="px-4 py-2 rounded-xl bg-white text-red-500 text-sm font-medium hover:bg-red-50 transition shadow"
              >
                Löschen
              </button>
            </div>
          </div>
        ))}

        {photos.length < 2 && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="aspect-video rounded-2xl border-2 border-dashed border-slate-200 hover:border-brand-sky flex flex-col items-center justify-center gap-2 text-brand-muted hover:text-brand-sky transition disabled:opacity-50"
          >
            {uploading ? (
              <>
                <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm">Hochladen…</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm">Foto hinzufügen</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      <p className="text-xs text-brand-muted">
        Unterstützte Formate: JPG, PNG, WebP. Fotos werden automatisch komprimiert.
      </p>
    </div>
  )
}

// ─── Tab: QR-Code ─────────────────────────────────────────────────────────────

function QRTab({ property }: { property: Property }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const guestUrl = `https://na-max.com/${property.slug}`

  useEffect(() => {
    if (!canvasRef.current) return
    QRCode.toCanvas(canvasRef.current, guestUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: '#0F1E2E',
        light: '#FFFFFF',
      },
    })
  }, [guestUrl])

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `qr-${property.slug}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div>
      <p className="text-sm text-brand-muted mb-6">
        Drucken Sie diesen QR-Code aus und stellen Sie ihn ins Zimmer. Gäste können ihn scannen, um direkt zu Ihren Informationen zu gelangen.
      </p>

      <div className="bg-white rounded-2xl shadow-card p-8 flex flex-col items-center gap-5 max-w-sm">
        <canvas ref={canvasRef} className="rounded-xl" />

        <div className="text-center">
          <p className="text-xs text-brand-muted mb-1">URL</p>
          <a
            href={guestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-sky hover:underline font-mono"
          >
            {guestUrl}
          </a>
        </div>

        <button
          onClick={handleDownload}
          className="w-full py-2.5 rounded-xl bg-brand-navy hover:bg-brand-slate text-white text-sm font-medium transition flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Als PNG herunterladen
        </button>
      </div>

      <p className="text-xs text-brand-muted mt-4">
        Tipp: Drucken Sie den QR-Code mindestens in 5×5 cm Größe aus, damit er gut lesbar ist.
      </p>
    </div>
  )
}
