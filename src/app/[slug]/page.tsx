import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Property, ContentBlock, Photo } from '@/lib/supabase'
import GuestPageClient from '@/components/guest/GuestPageClient'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const { data } = await supabase
    .from('properties')
    .select('name, city')
    .eq('slug', params.slug)
    .single()

  if (!data) return { title: 'Na-Max' }
  return {
    title: `${data.name} · ${data.city}`,
    description: `Willkommen im ${data.name}. Alle Informationen für Ihren Aufenthalt.`,
  }
}

export default async function GuestPage({ params }: Props) {
  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!property) notFound()

  const [{ data: blocks }, { data: photos }] = await Promise.all([
    supabase.from('content_blocks').select('*').eq('property_id', property.id).order('position'),
    supabase.from('photos').select('*').eq('property_id', property.id).order('position'),
  ])

  return (
    <GuestPageClient
      property={property as Property}
      blocks={(blocks ?? []) as ContentBlock[]}
      photos={(photos ?? []) as Photo[]}
    />
  )
}
