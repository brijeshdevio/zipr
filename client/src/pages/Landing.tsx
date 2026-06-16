import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Link2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Zap,
  ShieldCheck,
  MousePointerClick,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Landing() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div
      id="landing-root"
      className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary"
    >
      {/* NAVBAR */}
      <header
        id="landing-navbar"
        className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Link2 className="size-5 shrink-0 text-primary" />
              <span className="text-lg font-extrabold tracking-tight">
                ShortTrack
              </span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
              <a
                href="#features"
                className="transition-colors hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="transition-colors hover:text-foreground"
              >
                How It Works
              </a>
              <a
                href="#metrics"
                className="transition-colors hover:text-foreground"
              >
                Enterprise
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Button
                  id="logout-landing-btn"
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  Logout
                </Button>
                <Button
                  id="dashboard-landing-btn"
                  size="sm"
                  className="h-8 rounded-lg bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-1 size-3.5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    id="login-landing-btn"
                    variant="ghost"
                    size="sm"
                    className="h-10"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    id="register-landing-btn"
                    size="sm"
                    className="h-10 font-semibold"
                  >
                    Get Started
                    <ArrowRight className="ml-1 size-3.5" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="landing-hero"
        className="relative overflow-hidden border-b border-border/40 pt-20 pb-16 md:pt-32 md:pb-24"
      >
        <div className="relative z-10 mx-auto max-w-7xl space-y-8 px-4 text-center sm:px-6 lg:px-8">
          {/* Subtle micro-pill badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-accent px-3 py-1 text-[11px] font-semibold tracking-tight text-accent-foreground">
            <Sparkles className="size-3 shrink-0 text-primary" />
            <span>Next-Generation Links with Zero Latency</span>
          </div>

          {/* Typography-heavy page title */}
          <div className="mx-auto max-w-4xl space-y-4">
            <h1 className="text-4xl leading-none font-black tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Smarter Links. <br className="hidden sm:inline" />
              <span className="text-primary">Instant Audience Analytics.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              ShortTrack empowers you to secure, shorten, track, and optimize
              every link you share. Transform bulky URLs into high-performing
              promotional assets with real-time analytics.
            </p>
          </div>

          {/* Call-to-action buttons */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
              <Button
                id="hero-main-cta"
                size="lg"
                className="h-10 w-full px-6 sm:w-auto"
              >
                {isLoggedIn ? "Access Dashboard" : "Shorten Links for Free"}
                <ArrowRight className="ml-1.5 size-4" />
              </Button>
            </Link>
            <Button
              id="hero-secondary-cta"
              size="lg"
              variant="outline"
              className="h-11 w-full rounded-lg border-border px-6 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground sm:w-auto"
            >
              <a href="#features">See How It Works</a>
            </Button>
          </div>

          {/* Interactive visual mockup container */}
          <div className="mx-auto max-w-5xl pt-12">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card p-2 shadow-2xl">
              <div className="flex h-6 w-full items-center gap-1.5 rounded-t-lg border-b border-border bg-muted/40 px-4">
                <div className="size-2 rounded-full bg-destructive/40" />
                <div className="size-2 rounded-full bg-accent-foreground/20" />
                <div className="size-2 rounded-full bg-primary/20" />
                <span className="ml-4 font-mono text-[10px] text-muted-foreground select-none">
                  shorttrack.io/dashboard
                </span>
              </div>
              <div className="space-y-6 rounded-b-lg bg-background/50 p-4 text-left sm:p-6">
                {/* Simulated dashboard items inside hero illustration */}
                <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold tracking-tight text-foreground">
                        /r/cyber-promo
                      </span>
                      <Badge
                        variant="secondary"
                        className="rounded bg-secondary px-1.5 py-px font-mono text-[10px] text-secondary-foreground"
                      >
                        Active
                      </Badge>
                    </div>
                    <p className="line-clamp-1 text-xs break-all text-muted-foreground">
                      https://corporate.mainstage.analytics/user/campaign/840d-294021
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-start">
                    <div className="text-right">
                      <span className="block text-xs font-semibold text-muted-foreground">
                        Total Clicks
                      </span>
                      <span className="text-lg font-black text-foreground">
                        14,295
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="pointer-events-none h-8 border-border text-xs"
                    >
                      <BarChart3 className="mr-1 size-3.5 text-primary" />
                      Metrics
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 text-xs font-semibold sm:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                    <MousePointerClick className="size-5 text-primary" />
                    <div>
                      <span className="block text-[10px] font-medium text-muted-foreground">
                        99.9% ATTRIBUTION
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        Click Streams
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                    <Zap className="size-5 text-primary" />
                    <div>
                      <span className="block text-[10px] font-medium text-muted-foreground">
                        UNDER 45MS
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        Fastest Redirects
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                    <ShieldCheck className="size-5 text-primary" />
                    <div>
                      <span className="block text-[10px] font-medium text-muted-foreground">
                        JWT SECURITIZATION
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        Protected Logs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="scroll-mt-12 border-b border-border/40 bg-card py-20"
      >
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Fully Featured Link Management Engine
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Everything you need to deliver, manage, and understand user
              interactions without the complexity of traditional marketing
              software.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Feature 1 */}
            <Card className="flex flex-col justify-between space-y-4 rounded-xl border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <Lock className="size-5" />
                </div>
                <h3 className="text-base font-bold tracking-tight">
                  Authenticated Workspace
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Strict email & password security with standard cookie JWT
                  verification. Store, load, update, or remove your links and
                  access reports in total confidence.
                </p>
              </div>
            </Card>

            {/* Feature 2 */}
            <Card className="flex flex-col justify-between space-y-4 rounded-xl border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <MousePointerClick className="size-5" />
                </div>
                <h3 className="text-base font-bold tracking-tight">
                  Instant Real-time Redirects
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  A modern redirect server parses `/r/:code` paths with extreme
                  speed, increments total counters in the database, and safely
                  routes your traffic instantly.
                </p>
              </div>
            </Card>

            {/* Feature 3 */}
            <Card className="flex flex-col justify-between space-y-4 rounded-xl border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <BarChart3 className="size-5" />
                </div>
                <h3 className="text-base font-bold tracking-tight">
                  Detailed Recency Logs
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Display precisely when users engaged with your content. Access
                  your activity logs detailing the exact timestamp of the last
                  10 clicks sequentially.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how-it-works"
        className="scroll-mt-12 border-b border-border/40 bg-background py-20"
      >
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Shorten and track in 3 quick steps
            </h2>
            <p className="text-sm text-muted-foreground">
              A streamlined flow designed to get your custom campaigns up and
              running in under a minute.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center space-y-4 text-center">
              <div className="flex size-12 items-center justify-center rounded-full border border-border bg-card text-sm font-bold tracking-tight text-foreground shadow-sm">
                01
              </div>
              <h3 className="text-base font-bold">Paste Destination Link</h3>
              <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                Log into your custom dashboard and paste your destination URL
                into the generator fields.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center space-y-4 text-center">
              <div className="flex size-12 items-center justify-center rounded-full border border-border bg-card text-sm font-bold tracking-tight text-foreground shadow-sm">
                02
              </div>
              <h3 className="text-base font-bold">Add Custom Clean Codes</h3>
              <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                Optional custom code values let you build memorable links for
                social media, newsletters, or promo cards.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center space-y-4 text-center">
              <div className="flex size-12 items-center justify-center rounded-full border border-border bg-card text-sm font-bold tracking-tight text-foreground shadow-sm">
                03
              </div>
              <h3 className="text-base font-bold">
                Monitor Redirect Performance
              </h3>
              <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                Watch impressions update in real time on your dashboard. Use
                analytics to view detailed click logs immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        id="cta"
        className="relative overflow-hidden bg-background py-20"
      >
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Card className="space-y-6 overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-2xl sm:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to take control of your links?
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
              Create an account now to start creating secure shortened URLs,
              updating destinations, and monitoring clicks in real time.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
                <Button
                  id="cta-action-btn"
                  size="lg"
                  className="h-10 w-full px-8 sm:w-auto"
                >
                  {isLoggedIn ? "Visit My Dashboard" : "Create Free Account"}
                  <ArrowRight className="ml-1.5 size-4" />
                </Button>
              </Link>
              {!isLoggedIn && (
                <Button
                  id="cta-login-btn"
                  size="lg"
                  variant="outline"
                  className="h-10 px-8 sm:w-auto"
                >
                  <Link to="/login">Sign In Instead</Link>
                </Button>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="landing-footer"
        className="mt-auto border-t border-border bg-card py-12 text-xs text-muted-foreground"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Link2 className="size-4 shrink-0 text-primary" />
            <span className="font-extrabold tracking-tight text-foreground">
              ShortTrack
            </span>
            <span className="text-muted-foreground">
              | secure URL shortener engine.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span>
              &copy; {new Date().getFullYear()} ShortTrack. All rights reserved.
            </span>
            <a
              href="#features"
              className="transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              Security
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
