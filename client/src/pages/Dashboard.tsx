import { api } from "@/api/axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import {
  BarChart3,
  Calendar,
  Check,
  Copy,
  Edit2,
  ExternalLink,
  Link2,
  LogOut,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type LinkType = {
  id: string;
  longUrl: string;
  shortCode: string;
  clicks: number;
  userId: string;
  createdAt: string;
};

export function Dashboard() {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const [createLoading, setCreateLoading] = useState(false);

  const navigate = useNavigate();
  const { loading: authLoading, user } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login", {
        replace: true,
      });
      toast.success("Logged out successfully.");
    } catch (err: unknown) {
      toast.error("Could not logout.");
    }
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      await api.post("/links", { longUrl, ...(shortCode && { shortCode }) });
      toast.success("Link created successfully.");
      await handleLoadLinks();
      setLongUrl("");
    } catch (err: unknown) {
      toast.error("Could not create link.");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleLoadLinks = async () => {
    setLoading(true);
    try {
      const { data } = (await api.get("/links")).data;
      setLinks(data);
    } catch (err: unknown) {
      toast.error("Could not load links.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await api.delete(`/links/${id}`);
      toast.success("Link deleted successfully.");
      await handleLoadLinks();
    } catch (err: unknown) {
      toast.error("Could not delete link.");
    }
  };

  const handleUpdateLink = async (id: string) => {
    try {
      await api.put(`/links/${id}`);
      toast.success("Link updated successfully.");
      await handleLoadLinks();
    } catch (err: unknown) {
      toast.error("Could not update link.");
    }
  };

  useEffect(() => {
    (async () => {
      await handleLoadLinks();
    })();
  }, []);

  if (authLoading) {
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

  return (
    <>
      <div
        id="dashboard-layout"
        className="flex min-h-screen flex-col bg-background text-foreground"
      >
        {/* HEADER NAVBAR */}
        <header
          id="dashboard-navbar"
          className="sticky top-0 z-40 border-b border-border bg-card"
        >
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-2">
              <Link2 className="size-5 shrink-0 text-primary" />
              <span className="text-lg font-bold tracking-tight">Zipr</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="hidden text-xs font-medium text-muted-foreground sm:inline-block">
                Signed in as{" "}
                <span className="text-foreground">{user?.email}</span>
              </span>
              <Button
                id="logout-btn"
                variant="outline"
                size="sm"
                className="h-10 font-medium"
                onClick={handleLogout}
              >
                <LogOut className="mr-1 size-3.5" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* MAIN CONTAINER */}
        <main
          id="dashboard-main-content"
          className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                URL Shortener
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Create, update, and manage your shortened URLs with real-time
                redirect analytics.
              </p>
            </div>
          </div>

          {/* CREATE SHORT LINK CARD */}
          <Card
            id="create-link-card"
            className="rounded-xl border-border bg-card shadow-sm"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold">
                Shorten a New Destination
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Paste your heavy long-form destination link below. You can also
                specify an optional custom clean code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateLink} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                  {/* Long URL Link Input */}
                  <div className="space-y-1.5 md:col-span-7">
                    <label
                      htmlFor="destination-url"
                      className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                    >
                      Destination URL
                    </label>
                    <div className="relative">
                      <Link2 className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
                      <Input
                        id="destination-url"
                        type="text"
                        placeholder="https://example.com/some/very/long/path/to/resource"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        className="border-border bg-background pl-9 text-foreground"
                        required
                      />
                    </div>
                  </div>

                  {/* Custom Shortcode Link Input */}
                  <div className="space-y-1.5 md:col-span-3">
                    <label
                      htmlFor="custom-code"
                      className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                    >
                      Custom Code (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute top-2.5 left-3 text-xs font-medium text-muted-foreground select-none">
                        /r/
                      </span>
                      <Input
                        id="custom-code"
                        type="text"
                        placeholder="my-promo"
                        value={shortCode}
                        onChange={(e) => setShortCode(e.target.value)}
                        className="border-border bg-background pl-8 text-foreground focus-visible:ring-ring"
                      />
                    </div>
                  </div>

                  {/* Create/Submit Action */}
                  <div className="flex items-end md:col-span-2">
                    <Button
                      id="submit-shorten-btn"
                      type="submit"
                      className="h-10"
                      disabled={createLoading}
                    >
                      {createLoading ? (
                        "Creating..."
                      ) : (
                        <>
                          <Plus className="mr-1 size-4" />
                          Shorten
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* SECURE LINKS DATA Grid/Table */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold tracking-tight">
                Your Shortened Links
              </h2>
              {/* Search filter input */}
              {/* <div className="relative w-full sm:max-w-xs">
                <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
                <Input
                  id="search-links-input"
                  type="text"
                  placeholder="Search by destination or code..."
                  className="h-9 border-border bg-card pl-9 text-xs text-foreground focus-visible:ring-ring"
                />
              </div> */}
            </div>

            {loading ? (
              <div className="rounded-xl border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
                Loading your shortened URLs...
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {links.map((link: LinkType) => {
                  const shortUrl = `${window.location.origin}/r/${link.shortCode}`;

                  return (
                    <Card
                      key={link.id}
                      className="flex flex-col justify-between space-y-4 overflow-hidden rounded-xl border-border bg-card p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          {/* Clickable Shortlink */}
                          <a
                            href={shortUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex max-w-[70%] items-center gap-1.5 text-base font-bold tracking-tight break-all text-foreground hover:underline"
                          >
                            /r/{link.shortCode}
                            <ExternalLink className="inline size-3.5 text-muted-foreground" />
                          </a>

                          {/* Click counts badge */}
                          <Badge
                            variant="secondary"
                            className="shrink-0 rounded bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground"
                          >
                            {link.clicks} clicks
                          </Badge>
                        </div>

                        {/* Long original URL destination */}
                        <p
                          className="line-clamp-2 max-w-full text-xs leading-relaxed break-all text-muted-foreground"
                          title={link.longUrl}
                        >
                          {link.longUrl}
                        </p>
                      </div>

                      {/* Metadata & Actions buttons row */}
                      <div className="flex items-center justify-between border-t border-border/50 pt-2 text-xs">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="size-3" />
                          link.createdAt
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Quick copy to clipboard feedback action button */}
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            className="size-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                            title="Copy shortened link"
                          >
                            <Check className="size-3.5 font-bold text-primary" />
                          </Button>

                          {/* View analytics routing button */}
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() =>
                              navigate(`/link/${link.id}/analytics`)
                            }
                            className="size-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                            title="View analytics report"
                          >
                            <BarChart3 className="size-3.5" />
                          </Button>

                          {/* Edit modal toggle button */}
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            className="size-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                            title="Edit target destination"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>

                          {/* Destructive delete option */}
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => handleDeleteLink(link.id)}
                            className="size-7 rounded-md text-destructive hover:bg-destructive/10"
                            title="Delete link"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
