import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  A: "bg-success text-success-foreground",
  B: "bg-primary/85 text-primary-foreground",
  C: "bg-warning text-warning-foreground",
  D: "bg-orange-500 text-white",
  E: "bg-destructive text-destructive-foreground",
};

export function RatingBadge({ rating, className }: { rating: "A" | "B" | "C" | "D" | "E"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md font-display font-semibold text-sm",
        map[rating],
        className,
      )}
      aria-label={`Green rating ${rating}`}
    >
      {rating}
    </span>
  );
}
