import Header from '@/components/ui/header'
import { HeroSection } from '@/components/ui/hero-section'
import { FeaturesSection } from '@/components/ui/features-section'
import { StatsSection } from '@/components/ui/stats-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-grid-glow -z-10"></div>
      <div className="fixed top-0 left-0 right-0 h-[70vh] bg-gradient-to-br from-emerald-400/10 via-blue-500/10 to-purple-400/10 blur-3xl -z-10"></div>
      <div className="fixed bottom-0 right-0 w-1/2 h-[50vh] bg-gradient-to-tl from-blue-500/10 via-purple-400/10 to-emerald-400/10 blur-3xl -z-10"></div>
      
      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-emerald-400 animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: Math.random() * 0.5
            }}
          />
        ))}
      </div>
      
      <Header />
      
      {/* Main content */}
      <div className="relative">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
      </div>
    </main>
  )
}