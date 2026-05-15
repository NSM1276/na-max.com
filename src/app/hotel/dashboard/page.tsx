import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Property, ContentBlock, Photo } from '@/lib/supabase'
import DashboardClient from './DashboardClient'

export default async function HotelDashboardPage() {
  const supabase = createSupabaseServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/hotel/login')
  }

  // Fetch property for this owner
  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('owner_id', session.user.id)
    .single()

  if (!property) {
    return (
      <div className="min-h-screen bg-brand-surface flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-card p-10 text-center max-w-sm">
          <div className="w-12 h-12 rounded-full bg-brand-sky/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-brand-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-brand-navy mb-2">Ihr Konto wird eingerichtet</h1>
          <p className="text-brand-slate text-sm">
            Wir richten Ihr Hotel-Konto gerade ein. Dies dauert in der Regel 1–2 Werktage. Sie erhalten eine E-Mail, sobald alles bereit ist.
          </p>
          <p className="text-brand-muted text-xs mt-4">
            Fragen?{' '}
            <a href="mailto:hallo@na-max.com" className="text-brand-sky hover:underline">
              hallo@na-max.com
            </a>
          </p>
        </div>
      </div>
    )
  }

  // Fetch content blocks
  const { data: blocks } = await supabase
    .from('content_blocks')
    .select('*')
    .eq('property_id', property.id)
    .order('position')

  // Fetch photos
  const { data: photos } = await supabase
    .from('photos')
    .select('*')
    .eq('property_id', property.id)
    .order('position')

  return (
    <DashboardClient
      property={property as Property}
      initialBlocks={(blocks ?? []) as ContentBlock[]}
      initialPhotos={(photos ?? []) as Photo[]}
      userId={session.user.id}
    />
  )
}
