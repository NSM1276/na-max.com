import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Na-Max Staff Portal',
  description: 'Staff Dashboard — Na-Max Hotel Service',
  robots: { index: false, follow: false }, // Закрыто от поисковиков
}

// Staff layout — без Navbar и Footer лендинга
export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
