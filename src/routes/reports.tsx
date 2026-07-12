import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { branches, totals } from "@/lib/mock-data";
import { Download, FileText, Building2, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "ESG Reports · Verdant" }] }),
  component: ReportsPage,
});

const templates = [
  { id: "t1", name: "Bank-wide monthly ESG report", scope: "All branches", format: "PDF" },
  { id: "t2", name: "Branch performance card", scope: "Per branch", format: "PDF" },
  { id: "t3", name: "Emissions ledger export", scope: "All entries", format: "CSV" },
  { id: "t4", name: "Regulatory disclosure (BRSR)", scope: "Bank-wide", format: "PDF" },
];

function ReportsPage() {
  const t = totals();

  return (
    <AppShell title="ESG Reports" subtitle="Generate and export sustainability disclosures">
      <Card>
        <CardHeader>
          <CardTitle>Generate report</CardTitle>
          <CardDescription>Choose scope, format and date range</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3 md:grid-cols-4">
            <div className="space-y-1.5">
              <Label>Scope</Label>
              <Select defaultValue="all">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Bank-wide</SelectItem>
                  {branches.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>From</Label>
              <Input type="date" defaultValue="2026-01-01" />
            </div>
            <div className="space-y-1.5">
              <Label>To</Label>
              <Input type="date" defaultValue="2026-07-31" />
            </div>
            <div className="space-y-1.5">
              <Label>Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-4 flex items-center justify-between rounded-lg bg-muted/60 p-4">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2"><Leaf className="h-4 w-4 text-primary" /> ESG {t.esg}/100</div>
                <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-navy" /> {branches.length} branches</div>
                <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-warning" /> {(t.paper / 1000).toFixed(1)}k sheets</div>
              </div>
              <Button><Download className="mr-1.5 h-4 w-4" /> Generate</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((tpl) => (
          <Card key={tpl.id}>
            <CardContent className="flex items-center justify-between gap-3 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{tpl.name}</p>
                  <p className="text-xs text-muted-foreground">{tpl.scope}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{tpl.format}</Badge>
                <Button size="sm" variant="outline"><Download className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
