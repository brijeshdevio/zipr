import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Link2,
  MousePointerClick,
} from "lucide-react";
import { api } from "@/api/axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";

export function Analytics() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { loading: authLoading, user } = useAuth();

  const fetchAnalytics = useCallback(async () => {
    if (!id) return;
    setLoading(true);

    try {
      const response = (await api.get(`/links/${id}/analytics`)).data?.data;
      setData(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    (async () => {
      await fetchAnalytics();
    })();
  }, [id, navigate, fetchAnalytics]);

  const formatDatePrecise = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    } catch {
      return "N/A";
    }
  };

  const getRelativeTime = (isoStr: string) => {
    try {
      const ms = new Date().getTime() - new Date(isoStr).getTime();
      const seconds = Math.floor(ms / 1000);
      if (seconds < 5) return "Just now";
      if (seconds < 60) return `${seconds}s ago`;
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h ago`;
      return formatDatePrecise(isoStr);
    } catch {
      return "Recently";
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="mx-auto">
          <Spinner className="size-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/login", {
      replace: true,
    });
  }

  console.log(data);
  const shortUrl = `${window.location.origin}/r/${data.shortCode}`;

  return (
    <div
      id="analytics-layout"
      className="flex min-h-screen flex-col bg-background text-foreground"
    >
      {/* HEADER NAVBAR */}
      <header
        id="analytics-navbar"
        className="sticky top-0 z-40 border-b border-border bg-card"
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Link2 className="size-5 shrink-0 text-primary" />
            <span className="text-lg font-bold tracking-tight">ShortTrack</span>
          </div>

          <Button
            id="back-to-dashboard-btn"
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="h-8 border-border text-xs font-medium hover:bg-muted"
          >
            <ArrowLeft className="mr-1 size-3.5" />
            Back to Dashboard
          </Button>
        </div>
      </header>
      {/* CORE INFO */}
      <main
        id="analytics-main-content"
        className="mx-auto w-full max-w-5xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">
                Analytics Report
              </h1>
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 px-2 py-0.5 text-xs leading-none font-bold text-primary"
              >
                /r/{data.shortCode}
              </Badge>
            </div>
            <p className="line-clamp-1 max-w-2xl text-xs break-all text-muted-foreground">
              Destination:{" "}
              <a
                href={data.longUrl}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-foreground"
              >
                {data.longUrl}
              </a>
            </p>
          </div>
        </div>

        {/* METRICS CARD & SUMMARY */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Total Clicks Large Metric Display */}
          <Card className="col-span-3 flex flex-col justify-between rounded-xl border-border bg-card p-5 shadow-sm md:col-span-1">
            <div className="space-y-1.5">
              <span className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Total Link Impressions
              </span>
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-5xl font-black tracking-tighter text-foreground">
                  {data.totalClicks}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  clicks
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 border-t border-border/50 pt-4 text-xs text-muted-foreground">
              <MousePointerClick className="size-3.5 text-primary" />
              <span>Click tracking active in real time</span>
            </div>
          </Card>

          {/* Link Information Card */}
          <Card className="col-span-3 space-y-4 rounded-xl border-border bg-card p-5 shadow-sm md:col-span-2">
            <h3 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
              Link Configuration
            </h3>

            <div className="grid grid-cols-1 gap-4 pt-1 text-xs sm:grid-cols-2">
              <div className="space-y-1">
                <span className="block font-medium text-muted-foreground">
                  Short Track URL
                </span>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 leading-relaxed font-bold break-all text-foreground hover:underline"
                >
                  {shortUrl}
                  <ExternalLink className="size-3" />
                </a>
              </div>

              <div className="space-y-1">
                <span className="block font-medium text-muted-foreground">
                  Original Destination
                </span>
                <span
                  className="line-clamp-2 leading-relaxed font-semibold break-all text-foreground"
                  title={data.longUrl}
                >
                  {data.longUrl}
                </span>
              </div>

              <div className="space-y-1 border-t border-border/50 pt-2 sm:col-span-2">
                <span className="block font-medium text-muted-foreground">
                  Created Date
                </span>
                <span className="flex items-center gap-1 font-semibold text-foreground">
                  <Clock className="size-3 text-muted-foreground" />
                  {formatDatePrecise(data.createdAt)}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* CLICK LOGS TABLE (Last 10 Clicks) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight">
              Recent Activity Stream
            </h3>
            <span className="text-xs font-medium text-muted-foreground">
              Showing last 10 clicks
            </span>
          </div>

          <Card className="overflow-hidden rounded-xl border-border bg-card shadow-sm">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border">
                  <TableHead className="w-[100px] text-xs font-bold text-muted-foreground uppercase">
                    Click #
                  </TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground uppercase">
                    Elapsed Time
                  </TableHead>
                  <TableHead className="text-right text-xs font-bold text-muted-foreground uppercase">
                    Timestamp (Local)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentClicks.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      No clicks recorded yet. Try visiting your shortlink to
                      update the stream!
                    </TableCell>
                  </TableRow>
                ) : (
                  data.recentClicks
                    .slice(0, 10)
                    .map(
                      (
                        click: { id: string; createdAt: string },
                        index: number
                      ) => (
                        <TableRow
                          key={click.id}
                          className="border-border transition-colors hover:bg-muted/20"
                        >
                          <TableCell className="font-mono text-xs font-bold">
                            #{data.recentClicks.length - index}
                          </TableCell>
                          <TableCell className="text-xs font-semibold text-foreground">
                            {getRelativeTime(click.createdAt)}
                          </TableCell>
                          <TableCell className="text-right text-xs font-medium text-muted-foreground">
                            {formatDatePrecise(click.createdAt)}
                          </TableCell>
                        </TableRow>
                      )
                    )
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
}
