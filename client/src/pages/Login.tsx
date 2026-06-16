import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { api } from "@/api/axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";

export function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { loading: authLoading, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/login", {
        email,
        password,
      });

      navigate("/dashboard", {
        replace: true,
      });
      toast.success("Logged in successfully.");
    } catch (err: unknown) {
      toast.error("Invalid Email or Password.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="mx-auto">
          <Spinner className="size-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (user) {
    navigate("/dashboard", {
      replace: true,
    });
  }

  return (
    <div
      id="signup-container"
      className="flex min-h-screen flex-col items-center justify-center space-y-6 bg-background p-4 sm:p-6 md:p-8"
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
        id="signup-card"
        className="w-full max-w-md border-border bg-card shadow-lg"
      >
        <CardHeader id="signup-header" className="space-y-1.5 pb-6">
          <CardTitle
            id="signup-title"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Welcome Back
          </CardTitle>
          <CardDescription
            id="signup-description"
            className="text-sm text-muted-foreground"
          >
            Sign in to your account to view your short URLs and analytics.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent id="signup-content" className="space-y-4">
            <div id="email-field" className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 border-border bg-background pl-9 text-foreground focus-visible:ring-ring"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div id="password-field" className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Lock className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 border-border bg-background pl-9 text-foreground focus-visible:ring-ring"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter
            id="signup-footer"
            className="mt-4 flex flex-col gap-4 pt-2"
          >
            <Button
              id="signup-submit-btn"
              type="submit"
              className="h-10 w-full"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight className="ml-1 size-4" />}
            </Button>

            <p
              id="login-link-msg"
              className="text-center text-xs text-muted-foreground"
            >
              Don't have an account yet?{" "}
              <Link
                id="to-signup-link"
                to="/signup"
                className="font-semibold text-foreground hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
