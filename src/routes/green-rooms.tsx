import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { greenRooms } from "@/lib/mock-data";
import { Thermometer, Droplets, Users, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/green-rooms")({
  head: () => ({ meta: [{ title: "Green Rooms · Verdant" }] }),
  component: GreenRoomsPage,
});

const statusStyle = {
  ok: "bg-success/15 text-success border-success/30",
  warn: "bg-warning/15 text-warning border-warning/30",
  alert: "bg-destructive/10 text-destructive border-destructive/30",
} as const;

function GreenRoomsPage() {
  const [rooms, setRooms] = useState(greenRooms);

  useEffect(() => {
    const id = setInterval(() => {
      setRooms((prev) =>
        prev.map((r) => ({
          ...r,
          temp: +(r.temp + (Math.random() - 0.5) * 0.3).toFixed(1),
          humidity: Math.max(35, Math.min(80, +(r.humidity + (Math.random() - 0.5) * 1.2).toFixed(0))),
        })),
      );
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <AppShell title="Green Room Monitoring" subtitle="Simulated real-time sensor data · updates every 2.5s">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rooms.map((r) => (
          <Card key={r.id} className={cn("border-2", statusStyle[r.status])}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{r.room}</CardTitle>
                  <CardDescription>{r.branch}</CardDescription>
                </div>
                <Badge variant="secondary" className="uppercase text-[10px] tracking-wider">
                  <Activity className="mr-1 h-3 w-3" />
                  {r.status === "ok" ? "Normal" : r.status === "warn" ? "Warning" : "Threshold breach"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2">
              <Metric icon={Thermometer} label="Temp" value={`${r.temp}°C`} accent={r.temp > 26 ? "warn" : "ok"} />
              <Metric icon={Droplets} label="Humidity" value={`${r.humidity}%`} accent={r.humidity > 65 ? "warn" : "ok"} />
              <Metric icon={Users} label="Occupancy" value={String(r.occupancy)} accent="ok" />
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

function Metric({ icon: Icon, label, value, accent }: { icon: typeof Thermometer; label: string; value: string; accent: "ok" | "warn" }) {
  return (
    <div className="rounded-lg bg-background/70 p-2.5 backdrop-blur">
      <div className={cn("flex items-center gap-1 text-[11px]", accent === "warn" ? "text-warning" : "text-muted-foreground")}>
        <Icon className="h-3 w-3" />{label}
      </div>
      <div className="mt-0.5 font-display text-lg font-semibold">{value}</div>
    </div>
  );
}
