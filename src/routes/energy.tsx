import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { energyDaily, anomalies, branches } from "@/lib/mock-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, BarChart, Bar } from "recharts";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/energy")({
  head: () => ({ meta: [{ title: "Energy · Verdant" }] }),
  component: EnergyPage,
});

const sevColor = { high: "bg-destructive/10 text-destructive", medium: "bg-warning/15 text-warning", low: "bg-muted text-muted-foreground" };

function EnergyPage() {
  return (
    <AppShell title="Energy Consumption Monitor" subtitle="Daily kWh vs. target · anomaly detection">
      <Card>
        <CardHeader>
          <CardTitle>Bank-wide daily consumption</CardTitle>
          <CardDescription>Last 30 days · target 7,000 kWh/day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={energyDaily}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <ReferenceLine y={7000} stroke="var(--color-chart-2)" strokeDasharray="4 4" label={{ value: "Target", fontSize: 11, fill: "var(--muted-foreground)" }} />
              <Area type="monotone" dataKey="consumption" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#g)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Consumption by branch</CardTitle>
            <CardDescription>kWh · this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={branches}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="code" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="energy" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Anomalies flagged</CardTitle>
            <CardDescription>AI-detected outliers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {anomalies.map((a, i) => (
              <div key={i} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{a.branch}</p>
                  <Badge className={sevColor[a.severity]} variant="secondary">{a.severity}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{a.metric} · {a.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">Detected {a.detected}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
