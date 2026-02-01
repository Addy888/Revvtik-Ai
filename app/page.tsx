"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowRight,
  Mic,
  MessageSquare,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "AI Sales Coach",
    description:
      "Practice real sales conversations with our intelligent AI that adapts to your responses.",
  },
  {
    icon: Mic,
    title: "Voice Training",
    description:
      "Improve your pitch delivery with voice-enabled practice sessions and real-time feedback.",
  },
  {
    icon: Target,
    title: "Objection Handling",
    description:
      "Master common objections with scenario-based training and expert responses.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor your improvement with detailed analytics and performance metrics.",
  },
]

const stats = [
  { value: "10x", label: "Faster Learning" },
  { value: "500+", label: "Sales Scenarios" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "AI Availability" },
]

export default function HomePage() {
  const router = useRouter()
  const supabase = createClient()

  // 🔥 ONLY FIX: remove ?code=xxxx from URL
  useEffect(() => {
    const cleanOAuthCode = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.replace("/")
      }
    }
    cleanOAuthCode()
  }, [router, supabase])

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Zap className="h-4 w-4" />
              AI-Powered Sales Training
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              AI Sales Learning <span className="text-gradient">Made Simple</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-pretty leading-relaxed">
              Transform your sales skills with personalized AI coaching. Practice pitches, handle objections, and get
              instant feedback—all in one powerful platform.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="glow-cyan group">
                <Link href="/auth/signup">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Give Feedback</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/50 bg-card/30 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary lg:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
