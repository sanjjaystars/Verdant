import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { emissionEntries, emissionsBreakdown, branches } from "@/lib/mock-data";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/emissions")({
  head: () => ({ meta: [{ title: "Carbon Emissions · Verdant" }] }),
  component: EmissionsPage,
});

const FACTORS = { Electricity: 0.82, Travel: 0.23, Waste: 0.5, Fleet: 2.6 };

function EmissionsPage() {
  return (
    <AppShell title="Carbon Emissions Tracker" subtitle="Auto-calculated using standard emission factors">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Breakdown by source</CardTitle>
            <CardDescription>tCO₂e · this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={emissionsBreakdown} dataKey="value" nameKey="source" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {emissionsBreakdown.map((_, i) => <Cell key={i} fill={`var(--color-chart-${i + 1})`} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plus className="h-4 w-4" /> Log emission entry</CardTitle>
            <CardDescription>CO₂e is auto-calculated with GHG Protocol emission factors.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Branch</Label>
                <Select defaultValue={branches[0].id}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{branches.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Source</Label>
                <Select defaultValue="Electricity">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(FACTORS).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Quantity</Label>
                <Input type="number" placeholder="e.g. 4200" />
              </div>
              <div className="space-y-1.5">
                <Label>Unit</Label>
                <Input placeholder="kWh, km, kg, L…" />
              </div>
              <div className="sm:col-span-2 flex items-center justify-between rounded-lg bg-muted/60 p-3">
                <div>
                  <p className="text-xs text-muted-foreground">Calculated CO₂e</p>
                  <p className="font-display text-lg font-semibold">— tCO₂e</p>
                </div>
                <Button type="button">Save entry</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent entries</CardTitle>
          <CardDescription>Auto-calculated from raw activity data</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">CO₂e (t)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emissionEntries.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="text-muted-foreground">{e.date}</TableCell>
                  <TableCell className="font-medium">{e.branch}</TableCell>
                  <TableCell><Badge variant="secondary">{e.source}</Badge></TableCell>
                  <TableCell className="text-right">{e.quantity.toLocaleString()} {e.unit}</TableCell>
                  <TableCell className="text-right font-semibold">{e.co2e.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
