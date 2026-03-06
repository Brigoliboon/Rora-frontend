'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 rora-animated-bg" />

      {/* Signup Card */}
      <div className="w-full max-w-md">
        <div className="bg-[#0a0f1a]/90 backdrop-blur-sm rounded-2xl border border-[#1e293b] p-8 sm:p-10">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f1f5f9]">
              Create Account
            </h2>
            <p className="text-sm text-[#94a3b8]">
              Sign up to start creating
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg bg-[#7f1d1d]/20 border border-[#dc2626]/30 p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#dc2626] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#fca5a5]">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-[#94a3b8]">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#111827] border border-[#334155] rounded-xl text-[#f1f5f9] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/30 focus:border-[#14b8a6] transition-all duration-300"
                placeholder="John Doe"
              />
            </div>

            {/* Birthday */}
            <div className="space-y-2">
              <label htmlFor="birthday" className="block text-sm font-medium text-[#94a3b8]">
                Birthday
              </label>
              <input
                id="birthday"
                name="birthday"
                type="date"
                required
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full px-4 py-3 bg-[#111827] border border-[#334155] rounded-xl text-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/30 focus:border-[#14b8a6] transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#94a3b8]">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#111827] border border-[#334155] rounded-xl text-[#f1f5f9] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/30 focus:border-[#14b8a6] transition-all duration-300"
                placeholder="name@example.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[#94a3b8]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#111827] border border-[#334155] rounded-xl text-[#f1f5f9] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/30 focus:border-[#14b8a6] transition-all duration-300 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1e293b]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0a0f1a]/90 text-[#64748b]">or</span>
            </div>
          </div>

          {/* Sign in Link */}
          <div className="text-center text-sm text-[#94a3b8]">
            <span>Already have an account? </span>
            <a href="/login" className="font-medium text-[#f1f5f9] hover:text-[#14b8a6] transition-colors">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
