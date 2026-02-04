'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Loader2 } from 'lucide-react' // Optional: install lucide-react for icons, or replace with SVG

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          birthday,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      // After successful sign‑up, redirect to dashboard or verification page
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-950 px-4 transition-colors duration-300">
      <div className="w-full max-w-sm space-y-8 bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm dark:shadow-none">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create Account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sign up to start using the app</p>
        </div>
        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 py-2.5 bg-gray-50 dark:bg-neutral-950 border border-gray-300 dark:border-neutral-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors text-sm"
                placeholder="John Doe"
              />
            </div>
            {/* Birthday */}
            <div>
              <label htmlFor="birthday" className="block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Birthday
              </label>
              <input
                id="birthday"
                name="birthday"
                type="date"
                required
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="block w-full px-3 py-2.5 bg-gray-50 dark:bg-neutral-950 border border-gray-300 dark:border-neutral-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors text-sm"
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2.5 bg-gray-50 dark:bg-neutral-950 border border-gray-300 dark:border-neutral-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors text-sm"
                placeholder="name@example.com"
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2.5 bg-gray-50 dark:bg-neutral-950 border border-gray-300 dark:border-neutral-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white disabled:opacity-50 transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Signing up...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
