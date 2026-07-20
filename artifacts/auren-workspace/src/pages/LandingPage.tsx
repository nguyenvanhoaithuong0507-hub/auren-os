import { useLocation } from "wouter";
import { ViewTransition } from "react";

export default function LandingPage() {
  const [, navigate] = useLocation();

  return (
    <ViewTransition default="none" enter="fade-in">
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl w-full space-y-8">
            {/* Pre-header */}
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-8 opacity-80">
                [introducing]
              </p>
            </div>

            {/* Main headline */}
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
                ai design{"\n"}
                <span className="text-accent">os</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Build, design, and manage intelligent agents with an intuitive operating system purpose-built for AI.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => navigate("/build")}
                className="px-8 py-3 bg-foreground text-background rounded-md font-medium transition-smooth hover:opacity-90 active:scale-95"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/projects")}
                className="px-8 py-3 border border-border rounded-md font-medium transition-smooth hover:bg-secondary active:scale-95"
              >
                View Examples
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Why AuRen OS</h2>
              <p className="text-muted-foreground text-lg">Everything you need to create sophisticated AI agents</p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "⚙️",
                  title: "Build & Configure",
                  description: "Design complex AI workflows with an intuitive visual editor and configuration system."
                },
                {
                  icon: "📚",
                  title: "Rich Library",
                  description: "Access pre-built components, tools, and templates to accelerate your development."
                },
                {
                  icon: "🧩",
                  title: "Extensible",
                  description: "Create custom extensions and integrations to extend the capabilities of your agents."
                }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-lg border border-border bg-background/50 hover:bg-background transition-smooth">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to build with AI?</h2>
            <p className="text-muted-foreground">Start creating intelligent agents today.</p>
            <button
              onClick={() => navigate("/build")}
              className="px-8 py-3 bg-accent text-background rounded-md font-medium transition-smooth hover:opacity-90 active:scale-95"
            >
              Start Building
            </button>
          </div>
        </section>
      </main>
    </ViewTransition>
  );
}
