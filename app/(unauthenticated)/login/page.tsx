'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
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

      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="bg-[#0a0f1a]/90 backdrop-blur-sm rounded-2xl border border-[#1e293b] p-8 sm:p-10">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f1f5f9]">
              Welcome back
            </h2>
            <p className="text-sm text-[#94a3b8]">
              Sign in to continue creating
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
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
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

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[#94a3b8]">
                  Password
                </label>
                <div className="text-xs">
                  <a href="#" className="font-medium text-[#94a3b8] hover:text-[#f1f5f9] transition-colors">
                    Forgot?
                  </a>
                </div>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
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

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#334155] bg-[#111827] text-[#14b8a6] focus:ring-[#14b8a6]/30 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#94a3b8] cursor-pointer">
                Remember me
              </label>
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
                  Signing in...
                </>
              ) : (
                'Sign in'
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

          {/* Sign up Link */}
          <div className="text-center text-sm text-[#94a3b8]">
            <span>Don't have an account? </span>
            <a href="/signup" className="font-medium text-[#f1f5f9] hover:text-[#14b8a6] transition-colors">
              Sign up free
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
