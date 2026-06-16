import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div
      id="notfound-layout"
      className="flex min-h-screen flex-col items-center justify-center space-y-6 bg-background p-6 text-center"
    >
      <div
        id="notfound-icon-wrap"
        className="flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive"
      >
        <AlertCircle className="size-8" />
      </div>

      <div id="notfound-text-wrap" className="max-w-sm space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The link you are trying to visit might be outdated, misspelled, or
          deleted by its owner.
        </p>
      </div>

      <Link to="/">
        <Button size="sm" className="h-10 font-semibold shadow-sm">
          <ArrowLeft className="mr-2 size-4" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
