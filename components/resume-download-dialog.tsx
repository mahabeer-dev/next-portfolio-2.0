"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Loader2, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MARKETS,
  PROFILES,
  DEFAULT_MARKET,
  DEFAULT_PROFILE,
  projects as resumeProjects,
  defaultProjectIds,
  resumeFileName,
  type Market,
  type ProfileId,
} from "@/lib/resume";

export default function ResumeDownloadDialog() {
  const [open, setOpen] = useState(false);
  const [market, setMarket] = useState<Market>(DEFAULT_MARKET);
  const [profile, setProfile] = useState<ProfileId>(DEFAULT_PROFILE);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const defaults = useMemo(() => defaultProjectIds(profile), [profile]);
  const [selected, setSelected] = useState<number[]>(defaults);

  // Switching profile re-seeds the selection with that profile's own picks,
  // so the checkboxes always start from a sensible default rather than
  // carrying over a selection that made sense for a different role.
  useEffect(() => {
    setSelected(defaultProjectIds(profile));
  }, [profile]);

  const marketHint = MARKETS.find((m) => m.id === market)?.hint;
  const profileHint = PROFILES.find((p) => p.id === profile)?.hint;

  const isDefaultSelection =
    selected.length === defaults.length &&
    defaults.every((id) => selected.includes(id));

  function toggleProject(id: number) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function handleDownload() {
    setStatus("loading");
    try {
      const params = new URLSearchParams({ market, profile });
      // Only send the param when it differs from the defaults, so a plain
      // download keeps producing the canonical URL.
      if (!isDefaultSelection && selected.length > 0) {
        params.set("projects", selected.join(","));
      }
      const res = await fetch(`/api/resume?${params}`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = resumeFileName(market, profile);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      setStatus("idle");
      setOpen(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full min-[400px]:w-auto text-sm"
          aria-label="Download Resume"
        >
          <Download className="mr-2 h-4 w-4" aria-hidden="true" />
          Download Resume
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Resume</DialogTitle>
          <DialogDescription>
            Pick the version that matches the role — the resume is tailored to
            your answers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="resume-market">Applying for</Label>
            <Select
              value={market}
              onValueChange={(v) => setMarket(v as Market)}
            >
              <SelectTrigger id="resume-market">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MARKETS.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {marketHint && (
              <p className="text-xs text-muted-foreground">{marketHint}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume-profile">Profile</Label>
            <Select
              value={profile}
              onValueChange={(v) => setProfile(v as ProfileId)}
            >
              <SelectTrigger id="resume-profile">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROFILES.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {profileHint && (
              <p className="text-xs text-muted-foreground">{profileHint}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between gap-2">
              <Label>Projects</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {selected.length} selected
                </span>
                {!isDefaultSelection && (
                  <button
                    type="button"
                    onClick={() => setSelected(defaults)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    Reset
                  </button>
                )}
              </div>
            </div>

            <ScrollArea className="h-44 rounded-md border">
              <div className="p-2">
                {resumeProjects.map((p) => {
                  const relevant = p.profiles.includes(profile);
                  return (
                    <label
                      key={p.id}
                      htmlFor={`project-${p.id}`}
                      className="flex cursor-pointer items-start gap-2 rounded px-2 py-1.5 hover:bg-muted/60"
                    >
                      <Checkbox
                        id={`project-${p.id}`}
                        checked={selected.includes(p.id)}
                        onCheckedChange={() => toggleProject(p.id)}
                        className="mt-0.5"
                      />
                      <span className="min-w-0 flex-1 text-sm leading-tight">
                        {p.name}
                        {!relevant && (
                          <span className="ml-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                            other stack
                          </span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </ScrollArea>

            <p className="text-xs text-muted-foreground">
              {selected.length === 0
                ? "Nothing selected — the resume will use this profile's defaults."
                : selected.length > defaults.length
                  ? `More than the usual ${defaults.length} for this profile; the PDF may run past 2 pages.`
                  : "Pre-selected for this profile. Tick or untick to tailor it to a posting."}
            </p>
          </div>

          {status === "error" && (
            <p role="alert" className="text-sm text-destructive">
              Couldn&apos;t generate the PDF. Please try again.
            </p>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={status === "loading"}
          >
            Cancel
          </Button>
          <Button onClick={handleDownload} disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                Preparing…
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Download PDF
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
