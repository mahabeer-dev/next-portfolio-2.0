"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  resumeFileName,
  type Market,
  type ProfileId,
} from "@/lib/resume";

export default function ResumeDownloadDialog() {
  const [open, setOpen] = useState(false);
  const [market, setMarket] = useState<Market>(DEFAULT_MARKET);
  const [profile, setProfile] = useState<ProfileId>(DEFAULT_PROFILE);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const marketHint = MARKETS.find((m) => m.id === market)?.hint;
  const profileHint = PROFILES.find((p) => p.id === profile)?.hint;

  async function handleDownload() {
    setStatus("loading");
    try {
      const res = await fetch(
        `/api/resume?market=${market}&profile=${profile}`
      );
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
