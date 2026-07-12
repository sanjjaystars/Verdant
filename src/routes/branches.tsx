import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { branches } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RatingBadge } from "@/components/RatingBadge";
import { Badge } from "@/components/ui/badge";
import { Zap, FileText, Factory, MapPin, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/branches")({
  head: () => ({ meta: [{ title: "Branches · Verdant" }] }),
  component: BranchesPage,
});

function BranchesPage() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<string>("all");

  const regions = Array.from(new Set(branches.map((b) => b.region)));
  const filtered = branches.filter(
    (b) =>
      (region === "all" || b.region === region) &&
      (q === "" ||
        `${b.name} ${b.city} ${b.code} ${b.manager}`.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <AppShell title="Branch Management" subtitle={`${filtered.length} of ${branches.length} branches`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, code, city…" className="pl-8" />
        </div>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All regions</SelectItem>
            {regions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((b) => (
          <Card key={b.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3">
              <div>
                <CardTitle className="text-base">{b.name}</CardTitle>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {b.city} · {b.region}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">Code {b.code} · Mgr {b.manager}</p>
              </div>
              <RatingBadge rating={b.rating} />
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">ESG score</span>
                  <span className="font-semibold">{b.esgScore}/100</span>
                </div>
                <Progress value={b.esgScore} />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                <div className="rounded-md bg-muted/60 p-2">
                  <div className="flex items-center gap-1 text-muted-foreground"><Factory className="h-3 w-3" />tCO₂e</div>
                  <div className="mt-0.5 text-sm font-semibold">{b.emissions.toFixed(1)}</div>
                </div>
                <div className="rounded-md bg-muted/60 p-2">
                  <div className="flex items-center gap-1 text-muted-foreground"><Zap className="h-3 w-3" />kWh</div>
                  <div className="mt-0.5 text-sm font-semibold">{(b.energy / 1000).toFixed(1)}k</div>
                </div>
                <div className="rounded-md bg-muted/60 p-2">
                  <div className="flex items-center gap-1 text-muted-foreground"><FileText className="h-3 w-3" />Paper</div>
                  <div className="mt-0.5 text-sm font-semibold">{(b.paper / 1000).toFixed(1)}k</div>
                </div>
              </div>
              <Badge
                variant="secondary"
                className={b.trend < 0 ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive"}
              >
                {b.trend < 0 ? "▼" : "▲"} {Math.abs(b.trend).toFixed(1)}% MoM
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
