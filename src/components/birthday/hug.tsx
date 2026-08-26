import { useRef, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hug() {
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);

  function start() {
    if (done) return;
    setHolding(true);
    timer.current = window.setTimeout(() => {
      setDone(true);
      setHolding(false);
    }, 1500);
  }

  function stop() {
    setHolding(false);
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onPointerDown={start}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        onContextMenu={(e) => e.preventDefault()}
        aria-label="長押しで、抱きしめる"
        className={cn(
          "relative flex size-24 items-center justify-center rounded-full",
          "bg-surface text-rose shadow-[var(--shadow-paper)]",
          "transition-[transform,background-color] duration-150 ease-out",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose",
          "select-none touch-manipulation",
          holding && "scale-[0.96] bg-petal",
          done && "bg-rose text-surface",
        )}
      >
        {(holding || done) && (
          <span className="hug-ring absolute inset-0 rounded-full bg-petal/40" aria-hidden="true" />
        )}
        <Heart
          className={cn("relative size-8", done && "fill-surface")}
          strokeWidth={1.6}
        />
      </button>
      <p className="mt-5 min-h-12 max-w-xs text-center text-sm leading-relaxed text-muted">
        {done
          ? "届いた。今日も、ちゃんとそばにいるよ。"
          : holding
            ? "そのままで。"
            : "長押しして。少しだけでいい。"}
      </p>
    </div>
  );
}
