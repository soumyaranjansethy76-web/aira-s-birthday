import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Petals } from "@/components/birthday/petals";
import { startMusic } from "@/lib/music-box";
import { cn } from "@/lib/utils";

export function Envelope({ onOpened }: { onOpened: () => void }) {
  const [phase, setPhase] = useState<"sealed" | "opening">("sealed");

  useEffect(() => {
    if (phase !== "opening") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(onOpened, reduced ? 120 : 1550);
    return () => window.clearTimeout(t);
  }, [phase, onOpened]);

  function open() {
    if (phase !== "sealed") return;
    startMusic();
    setPhase("opening");
  }

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-16">
      <img
        src="/images/garden.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/35" />
      <div className="absolute inset-0 bg-linear-to-b from-ink/20 via-transparent to-ink/50" />
      <Petals />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        <p className="font-display text-sm tracking-[0.28em] text-foam/80 uppercase">
          For you
        </p>
        <h1 className="mt-3 font-sans text-5xl font-medium text-foam sm:text-6xl">
          あいら
        </h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-foam/80">
          今日のために、手紙を書きました。
        </p>

        <button
          type="button"
          onClick={open}
          disabled={phase !== "sealed"}
          aria-label="手紙を開ける"
          className="envelope-scene mt-10 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-petal"
        >
          <div className={cn("envelope", phase === "opening" && "opening")}>
            <div className="envelope-letter">
              <p className="font-sans text-sm text-rose">あいらへ</p>
              <div className="mt-3 space-y-2" aria-hidden="true">
                <span className="block h-1.5 w-11/12 rounded-full bg-paper" />
                <span className="block h-1.5 w-9/12 rounded-full bg-paper" />
                <span className="block h-1.5 w-10/12 rounded-full bg-paper" />
              </div>
            </div>
            <div className="envelope-body" />
            <div className="envelope-flap" />
            <div className="envelope-seal" aria-hidden="true">
              <Heart className="size-4 fill-surface text-surface" strokeWidth={1.75} />
            </div>
          </div>
        </button>

        <p className="mt-8 text-sm text-foam/75">
          {phase === "sealed" ? "封を、そっと開けて" : "どうぞ。"}
        </p>
      </div>
    </section>
  );
}
