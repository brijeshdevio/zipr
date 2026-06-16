import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowLeft, Home, Link2, Sparkles, HelpCircle } from "lucide-react";

export function ShortLinkNotFound() {
  return (
    <div
      id="shortlink-notfound-layout"
      className="flex min-h-screen flex-col items-center justify-center space-y-6 bg-background p-4 text-foreground sm:p-6 md:p-8"
    >
      <Link
        to="/"
        className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        <span className="text-xs font-semibold tracking-wider uppercase">
          Back to Home
        </span>
      </Link>

      <Card
        id="shortlink-notfound-card"
        className="w-full max-w-md overflow-hidden rounded-xl border-border bg-card shadow-xl"
      >
        {/* Subtle top decoration bar */}
        <div className="h-1 w-full bg-destructive" />

        <CardHeader className="pt-8 pb-4 text-center">
          <div className="mx-auto mb-3.5 flex size-12 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10 text-destructive">
            <Link2 className="size-6 rotate-45" />
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight">
            Short Link Not Found
          </CardTitle>
          <CardDescription className="mt-2 px-2 text-xs leading-relaxed text-muted-foreground">
            We couldn't resolve this request. The short URL code you are trying
            to reach does not exist or has been removed.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          {/* Helpful diagnostics check list */}
          <div className="space-y-3.5 rounded-lg border border-border bg-muted/40 p-4.5">
            <span className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">
              <HelpCircle className="size-3.5 text-primary" />
              What can I do?
            </span>

            <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>
                  Check for spelling errors or accidental spaces in the address
                  bar.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>
                  Verify that the creator did not delete or rename the short
                  link.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>
                  Generate some of your own secure redirects by signing up.
                </span>
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 px-6 pt-3 pb-8 sm:flex-row">
          <Link to="/">
            <Button className="h-10 w-full font-bold sm:flex-1">
              <Home className="mr-1.5 size-3.5" />
              Go to Home Page
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" className="h-10 w-full font-medium">
              <Sparkles className="mr-1.5 size-3.5 text-primary" />
              Shorten Yours
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <span className="text-center text-[11px] text-muted-foreground">
        Powered by{" "}
        <strong className="font-semibold text-foreground">ShortTrack</strong>{" "}
        secure linking engine
      </span>
    </div>
  );
}
