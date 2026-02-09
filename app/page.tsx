'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Layers, 
  Eye, 
  RefreshCw, 
  Download, 
  ArrowRight, 
  ChevronRight,
  Users,
  Zap,
  CheckCircle2,
  Play
} from 'lucide-react';

// Aurora Background Animation Component
const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep night base */}
      <div className="absolute inset-0 bg-[#0a0f1a]" />
      
      {/* Aurora gradient layers */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 50% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
          `,
          animation: 'aurora-drift 25s ease-in-out infinite'
        }}
      />
      
      {/* Secondary aurora layer */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 50% 30% at 60% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 40% 60% at 30% 70%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
          `,
          animation: 'aurora-drift 20s ease-in-out infinite reverse'
        }}
      />
      
      {/* Subtle stars */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Navigation Component
const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#0a0f1a]/80 backdrop-blur-lg border-b border-white/5' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-white group-hover:aurora-gradient-text transition-all">
            Rora
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">
            How it Works
          </Link>
          <Link href="#community" className="text-sm text-slate-400 hover:text-white transition-colors">
            Community
          </Link>
          <Link 
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-sm text-slate-300">Now in Public Beta</span>
        </div>
        
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Design garments{' '}
          <span className="aurora-gradient-text">in motion</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Create, preview, and refine digital garment patterns with precision and ease. 
          Where your ideas take shape.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/dashboard"
            className="group px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 glow-hover"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/canvas"
            className="px-8 py-4 text-base font-medium text-slate-300 border border-slate-600 rounded-xl hover:border-teal-500/50 hover:text-white transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Explore Canvas
          </Link>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>SVG-based rendering</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>Deterministic patterns</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>Precision engineering</span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-xs">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-teal-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Layers,
      title: 'Create Patterns',
      description: 'Generate precise garment patterns from body measurements with parametric controls.',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Eye,
      title: 'Preview in Real Time',
      description: 'See your designs come to life instantly with synchronized 2D and 3D previews.',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: RefreshCw,
      title: 'Iterate with Drafts',
      description: 'Rapidly refine your designs. Save drafts, compare versions, and perfect every detail.',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      icon: Download,
      title: 'Export Final Designs',
      description: 'Download production-ready patterns in multiple formats for manufacturing.',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="features" className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What you can do
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything you need to transform ideas into wearable designs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/30 transition-all duration-500 glow-hover"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Canvas Preview Section
const CanvasPreviewSection: React.FC = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See it in action
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A glimpse of the canvas where your designs take shape.
          </p>
        </div>
        
        {/* Mock Canvas Interface */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111827] shadow-2xl">
          {/* Canvas Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0a0f1a]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-xs text-slate-500 font-mono">canvas.rora.app</div>
            <div className="w-16" />
          </div>
          
          {/* Canvas Body */}
          <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[400px]">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-1 border-r border-white/10 p-4 space-y-4">
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-8 bg-white/5 rounded" />
                <div className="h-8 bg-white/5 rounded" />
                <div className="h-8 bg-teal-500/20 rounded border border-teal-500/30" />
              </div>
              <div className="h-4 w-20 bg-white/10 rounded animate-pulse mt-6" />
              <div className="space-y-2">
                <div className="h-8 bg-white/5 rounded" />
                <div className="h-8 bg-white/5 rounded" />
              </div>
            </div>
            
            {/* Main Canvas Area */}
            <div className="lg:col-span-3 p-8 flex items-center justify-center bg-[#0a0f1a] relative">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10" 
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}
              />
              
              {/* Mock Pattern SVG */}
              <svg viewBox="0 0 200 240" className="w-48 h-56 drop-shadow-2xl">
                <defs>
                  <linearGradient id="patternGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {/* Bodice front pattern shape */}
                <path 
                  d="M70,20 Q100,15 130,20 L135,60 Q140,80 130,100 L130,140 L70,140 L70,100 Q60,80 65,60 Z" 
                  fill="url(#patternGrad)" 
                  stroke="#14b8a6" 
                  strokeWidth="1"
                  className="animate-pulse"
                  style={{ animationDuration: '3s' }}
                />
                {/* Seam lines */}
                <line x1="100" y1="20" x2="100" y2="140" stroke="#14b8a6" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.5" />
                <line x1="70" y1="60" x2="130" y2="60" stroke="#14b8a6" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.5" />
                {/* Notches */}
                <circle cx="100" cy="60" r="2" fill="#14b8a6" />
                <circle cx="100" cy="100" r="2" fill="#14b8a6" />
              </svg>
              
              {/* Floating UI elements */}
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
                  2D Pattern
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-teal-500/20 border border-teal-500/30 text-xs text-teal-400">
                  Live Preview
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-sm text-slate-500 mt-6">
          The actual canvas includes 3D mannequin preview, measurement controls, and export options.
        </p>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection: React.FC = () => {
  const steps = [
    { number: '01', label: 'Choose a garment', description: 'Start with a base pattern or community preset' },
    { number: '02', label: 'Adjust parameters', description: 'Fine-tune measurements and design details' },
    { number: '03', label: 'Preview instantly', description: 'See changes in real-time across 2D and 3D views' },
    { number: '04', label: 'Finalize & export', description: 'Download production-ready pattern files' }
  ];

  return (
    <section id="how-it-works" className="relative py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How it works
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            From concept to creation in four simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-teal-500/50 to-transparent" />
              )}
              
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 group-hover:from-teal-500/30 group-hover:to-cyan-500/30 transition-all" />
                  <span className="relative text-lg font-bold aurora-gradient-text">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.label}
                </h3>
                <p className="text-sm text-slate-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Community Section
const CommunitySection: React.FC = () => {
  const designs = [
    { name: 'Summer Breeze Dress', designer: 'Maria C.', likes: 234 },
    { name: 'Urban Streetwear', designer: 'Alex K.', likes: 189 },
    { name: 'Evening Gown', designer: 'Elena R.', likes: 312 },
    { name: 'Minimalist Blazer', designer: 'James W.', likes: 156 }
  ];

  return (
    <section id="community" className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Community creations
            </h2>
            <p className="text-slate-400 max-w-xl">
              Designed with inspiration from a growing creative community.
            </p>
          </div>
          
          <Link 
            href="/canvas/community"
            className="group flex items-center gap-2 text-teal-400 hover:text-cyan-400 transition-colors"
          >
            Explore community
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {designs.map((design, index) => (
            <div 
              key={index}
              className="group relative aspect-square rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-teal-500/30 transition-all"
            >
              {/* Placeholder pattern visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-20 h-20 opacity-30 group-hover:opacity-50 transition-opacity">
                  <path 
                    d="M30,20 Q50,15 70,20 L75,50 Q80,65 70,80 L30,80 Q20,65 25,50 Z" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    className="text-teal-400"
                  />
                </svg>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <h4 className="text-sm font-medium text-white truncate">
                  {design.name}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-400">by {design.designer}</span>
                  <span className="text-xs text-teal-400 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {design.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-bold aurora-gradient-text">2,400+</div>
            <div className="text-sm text-slate-400">Designs created</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div>
            <div className="text-3xl font-bold aurora-gradient-text">180+</div>
            <div className="text-sm text-slate-400">Community presets</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div>
            <div className="text-3xl font-bold aurora-gradient-text">50+</div>
            <div className="text-sm text-slate-400">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Technical Section
const TechnicalSection: React.FC = () => {
  return (
    <section className="relative py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <Zap className="w-4 h-4 text-teal-400" />
          <span className="text-sm text-slate-300">Built for precision</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Technical confidence
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">SVG-based rendering</h3>
            <p className="text-sm text-slate-400">
              Scalable, crisp patterns at any resolution. No pixelation, ever.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Deterministic generation</h3>
            <p className="text-sm text-slate-400">
              Same measurements, same pattern. Reproducible results guaranteed.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Measurement-driven</h3>
            <p className="text-sm text-slate-400">
              Patterns adapt to real body data, not arbitrary sizes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection: React.FC = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Strong aurora gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 100% at 50% 100%, rgba(20, 184, 166, 0.2) 0%, transparent 60%),
              radial-gradient(ellipse 80% 80% at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
            `
          }}
        />
      </div>
      
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to design your{' '}
          <span className="aurora-gradient-text">next garment</span>?
        </h2>
        
        <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto">
          Join creators who are reimagining how garments are designed.
        </p>
        
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 px-10 py-5 text-lg font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl hover:opacity-90 transition-all glow-hover"
        >
          Get Started Free
          <ArrowRight className="w-5 h-5" />
        </Link>
        
        <p className="mt-6 text-sm text-slate-500">
          No credit card required. Start creating in seconds.
        </p>
      </div>
    </section>
  );
};

// Footer
const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Rora</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/canvas" className="hover:text-white transition-colors">Canvas</Link>
            <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
          </div>
          
          <div className="text-sm text-slate-500">
            © 2025 Rora. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes aurora-drift {
          0%, 100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          33% {
            transform: translateX(20px) translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateX(-10px) translateY(10px) rotate(-1deg);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
      
      <AuroraBackground />
      <Navigation />
      
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <CanvasPreviewSection />
        <HowItWorksSection />
        <CommunitySection />
        <TechnicalSection />
        <FinalCTASection />
        <Footer />
      </div>
    </main>
  );
}
