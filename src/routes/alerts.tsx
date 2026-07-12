import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { alertHistory, alertRules } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "SMS Alerts · Verdant" }] }),
  component: AlertsPage,
});

function AlertsPage() {
  return (
    <AppShell title="SMS Alerts" subtitle="Configurable alert rules and delivery history"
      actions={<Button size="sm"><Plus className="mr-1.5 h-4 w-4" />New rule</Button>}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Alert rules</CardTitle>
            <CardDescription>Trigger SMS when thresholds breach</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Metric</TableHead>
                  <TableHead>Threshold</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead className="text-right">Enabled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alertRules.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell><Badge variant="secondary">{r.metric}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{r.threshold}</TableCell>
                    <TableCell>{r.channel}</TableCell>
                    <TableCell className="text-right"><Switch defaultChecked={r.enabled} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Delivery stats</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Stat label="Sent" value="128" tone="success" />
            <Stat label="Pending" value="4" tone="warn" />
            <Stat label="Failed" value="1" tone="destructive" />
            <Stat label="Avg. response time" value="1.4 min" tone="muted" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alert history</CardTitle>
          <CardDescription>Recent SMS notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Rule</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alertHistory.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="text-muted-foreground">{a.time}</TableCell>
                  <TableCell className="font-medium">{a.rule}</TableCell>
                  <TableCell>{a.branch}</TableCell>
                  <TableCell>{a.channel}</TableCell>
                  <TableCell>{a.recipients}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="secondary"
                      className={a.status === "sent" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}
                    >
                      {a.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "success" | "warn" | "destructive" | "muted" }) {
  const map = {
    success: "bg-success/15 text-success",
    warn: "bg-warning/15 text-warning",
    destructive: "bg-destructive/10 text-destructive",
    muted: "bg-muted text-foreground",
  };
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={`rounded-full px-2 py-0.5 font-semibold ${map[tone]}`}>{value}</span>
    </div>
  );
}
