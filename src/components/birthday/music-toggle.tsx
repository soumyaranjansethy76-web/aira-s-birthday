import { useEffect, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { isMusicPlaying, subscribeMusic, toggleMusic } from "@/lib/music-box";
import { cn } from "@/lib/utils";

export function MusicToggle() {
  const [on, setOn] = useState(() => isMusicPlaying());

  useEffect(() => {
    setOn(isMusicPlaying());
    return subscribeMusic(setOn);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={on ? "音楽を止める" : "オルゴールを鳴らす"}
      aria-pressed={on}
      className={cn(
        "fixed top-4 right-4 z-40 flex size-11 items-center justify-center rounded-full",
        "paper-card text-rose",
        "transition-[transform,background-color,color,opacity] duration-150 ease-out",
        "hover:bg-paper active:scale-[0.96]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose",
        on && "bg-rose text-surface hover:bg-rose-deep",
      )}
    >
      {on ? <Music2 className="size-4" strokeWidth={1.75} /> : <VolumeX className="size-4" strokeWidth={1.75} />}
    </button>
  );
}
