import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { paperMonthly, branches } from "@/lib/mock-data";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Progress } from "@/components/ui/progress";
import { Trees, Droplet, Zap } from "lucide-react";

export const Route = createFileRoute("/paper")({
  head: () => ({ meta: [{ title: "Paper Usage · Verdant" }] }),
  component: PaperPage,
});

function PaperPage() {
  const totalPaper = branches.reduce((a, b) => a + b.paper, 0);
  // ~8,333 sheets per tree
  const treesSaved = Math.round((268000 - 235300) / 8333 * 5);
  const waterSaved = Math.round((268000 - 235300) * 0.01);
  const energySavedKwh = Math.round((268000 - 235300) * 0.03);

  return (
    <AppShell title="Paper Usage Tracker" subtitle="Digitization savings & reduction targets">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/25">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary"><Trees className="h-6 w-6" /></div>
            <div>
              <p className="font-display text-2xl font-semibold">{treesSaved}</p>
              <p className="text-xs text-muted-foreground">Trees saved YTD</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/10 text-navy"><Droplet className="h-6 w-6" /></div>
            <div>
              <p className="font-display text-2xl font-semibold">{waterSaved.toLocaleString()} L</p>
              <p className="text-xs text-muted-foreground">Water saved by digital docs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/15 text-warning"><Zap className="h-6 w-6" /></div>
            <div>
              <p className="font-display text-2xl font-semibold">{energySavedKwh.toLocaleString()} kWh</p>
              <p className="text-xs text-muted-foreground">Embedded energy avoided</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paper vs. digitized documents</CardTitle>
          <CardDescription>Sheets — physical vs. digital equivalents</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paperMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend />
              <Bar dataKey="paper" name="Paper sheets" fill="var(--color-chart-4)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="digital" name="Digitized" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reduction targets by branch</CardTitle>
          <CardDescription>FY26 target: 20% below FY25 baseline · total {totalPaper.toLocaleString()} sheets used</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {branches.map((b) => {
            const target = 30000;
            const pct = Math.min(100, Math.round((b.paper / target) * 100));
            return (
              <div key={b.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{b.name}</span>
                  <span className="text-muted-foreground">{b.paper.toLocaleString()} / {target.toLocaleString()} sheets</span>
                </div>
                <Progress value={pct} />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </AppShell>
  );
}
