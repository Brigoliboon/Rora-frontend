// app/(authenticated)/layout.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { AuthProvider } from '@/components/AuthProvider'

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    // Wrap children in the Client-Side Provider
      <AuthProvider>        
        <main className="flex-1 h-screen  ">
          {children}
        </main>
    </AuthProvider>
  )
}
