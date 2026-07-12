import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  unit?: string;
  delta?: number; // percentage; negative = improvement for emissions
  deltaGoodDirection?: "down" | "up";
  icon: LucideIcon;
  accent?: "green" | "navy" | "amber" | "red";
};

const accentMap = {
  green: "bg-primary/10 text-primary",
  navy: "bg-navy/10 text-navy",
  amber: "bg-warning/15 text-warning",
  red: "bg-destructive/10 text-destructive",
} as const;

export function StatCard({
  label,
  value,
  unit,
  delta,
  deltaGoodDirection = "down",
  icon: Icon,
  accent = "green",
}: Props) {
  const isGood =
    delta === undefined ? undefined : deltaGoodDirection === "down" ? delta < 0 : delta > 0;
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-semibold tracking-tight">
                {value}
              </span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", accentMap[accent])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {delta !== undefined && (
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-medium",
                isGood ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive",
              )}
            >
              {delta < 0 ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
              {Math.abs(delta).toFixed(1)}%
            </span>
            <span className="text-muted-foreground">vs previous month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
