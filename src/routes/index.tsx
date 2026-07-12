import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { RatingBadge } from "@/components/RatingBadge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Factory, Zap, FileText, Leaf, Download, Sparkles, TrendingDown } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { branches, monthlyTrend, emissionsBreakdown, totals } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Verdant ESG Monitor" },
      { name: "description", content: "Bank-wide overview of emissions, energy, paper usage and ESG score." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const t = totals();
  const ranked = [...branches].sort((a, b) => b.esgScore - a.esgScore);

  return (
    <AppShell
      title="Sustainability Overview"
      subtitle="Bank-wide ESG performance · July 2026"
      actions={
        <Button size="sm" className="hidden sm:inline-flex">
          <Download className="mr-1.5 h-4 w-4" /> Export
        </Button>
      }
    >
      {/* AI insight banner */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-navy/5">
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">AI insight</p>
              <p className="text-sm text-muted-foreground">
                Bank-wide emissions fell <span className="font-medium text-success">4.2%</span> MoM. Kolkata Park St drove
                63% of the remaining variance — consider an HVAC audit and a paper-lite retrofit.
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">View recommendations</Button>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Carbon emissions" value={t.emissions.toFixed(1)} unit="tCO₂e" delta={-4.2} icon={Factory} accent="green" />
        <StatCard label="Energy consumption" value={(t.energy / 1000).toFixed(1)} unit="MWh" delta={-3.6} icon={Zap} accent="amber" />
        <StatCard label="Paper usage" value={(t.paper / 1000).toFixed(1)} unit="k sheets" delta={-1.2} icon={FileText} accent="navy" />
        <StatCard label="ESG score" value={String(t.esg)} unit="/ 100" delta={2.4} deltaGoodDirection="up" icon={Leaf} accent="green" />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Emissions & energy trend</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis yAxisId="left" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="emissions" name="tCO₂e" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="energy" name="kWh" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emissions by source</CardTitle>
            <CardDescription>tCO₂e · this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={emissionsBreakdown} dataKey="value" nameKey="source" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {emissionsBreakdown.map((e, i) => (
                    <Cell key={i} fill={`var(--color-chart-${i + 1})`} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard + branch bars */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Branch emissions</CardTitle>
            <CardDescription>Current month · tCO₂e</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={[...branches].sort((a, b) => b.emissions - a.emissions)} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={11} width={130} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="emissions" fill="var(--color-chart-1)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branch leaderboard</CardTitle>
            <CardDescription>By ESG score</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ranked.map((b, i) => (
              <div key={b.id} className="flex items-center gap-3 rounded-lg border p-3">
                <span className="w-6 text-center font-display text-sm font-semibold text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.city} · {b.region}</p>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <TrendingDown className="h-3 w-3" />{b.esgScore}
                </Badge>
                <RatingBadge rating={b.rating} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
