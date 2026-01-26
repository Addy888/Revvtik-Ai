import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Brain, Lightbulb, Rocket, Shield } from "lucide-react"

const values = [
  {
    icon: Brain,
    title: "AI-First Approach",
    description: "We leverage cutting-edge AI to provide personalized, adaptive learning experiences.",
  },
  {
    icon: Rocket,
    title: "Continuous Innovation",
    description: "Our platform evolves constantly with new features and improved AI capabilities.",
  },
  {
    icon: Shield,
    title: "Data Privacy",
    description: "Your practice sessions and data are protected with enterprise-grade security.",
  },
  {
    icon: Lightbulb,
    title: "Practical Learning",
    description: "Real-world scenarios and immediate feedback to accelerate your growth.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 lg:pt-40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              About <span className="text-gradient">RevvTik</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We&apos;re on a mission to democratize sales training through artificial intelligence, making world-class
              coaching accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                RevvTik was born from a simple observation: traditional sales training is expensive, time-consuming, and
                often ineffective. Sales professionals need practice, but real practice opportunities are limited.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our AI-powered platform changes that. By simulating realistic sales conversations, providing instant
                feedback, and adapting to each user&apos;s skill level, we&apos;ve created a training environment that
                accelerates learning like never before.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value) => (
                <div key={value.title} className="rounded-xl border border-border/50 bg-card p-6">
                  <value.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
