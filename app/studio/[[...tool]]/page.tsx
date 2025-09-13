'use client'

/**
 * Sanity Studio embedded in Next.js
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import dynamic from 'next/dynamic'

// Render Studio client-side only to avoid hydration mismatches
const Studio = dynamic(() => Promise.resolve(() => <NextStudio config={config} />), {
  ssr: false,
})

export default function StudioPage() {
  return <Studio />
}
