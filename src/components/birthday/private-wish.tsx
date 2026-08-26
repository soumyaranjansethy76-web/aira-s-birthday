import { useEffect, useState } from "react";
import { Download, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const KEY = "aira-birthday-wish";
const TEMPLATE_SRC = "/images/wish-template.jpg";

// The blank area in the supplied 1085 × 1536 birthday card.
// Keeping the text inside this box avoids the cats, flowers and decorations.
const TEXT_BOX = {
  left: 145,
  top: 515,
  width: 795,
  height: 735,
};

type TextLayout = {
  fontSize: number;
  lineHeight: number;
  lines: string[];
  totalHeight: number;
};

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const paragraphs = text.replace(/\r\n/g, "\n").split("\n");
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    if (!paragraph) {
      lines.push("");
      continue;
    }

    let line = "";
    for (const char of Array.from(paragraph)) {
      const candidate = line + char;
      if (line && ctx.measureText(candidate).width > maxWidth) {
        lines.push(line.trimEnd());
        line = char.trimStart();
      } else {
        line = candidate;
      }
    }

    if (line) lines.push(line.trimEnd());
  }

  return lines.length ? lines : [""];
}

function findTextLayout(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
): TextLayout {
  // Start large and automatically shrink until the complete wish fits.
  // This makes Japanese, English and mixed-language wishes wrap correctly.
  for (let fontSize = 42; fontSize >= 7; fontSize -= 1) {
    const lineHeight = Math.max(fontSize * 1.42, fontSize + 5);
    ctx.font = `500 ${fontSize}px "Zen Maru Gothic", "Hiragino Sans", "Yu Gothic", system-ui, sans-serif`;
    const lines = wrapText(ctx, text, maxWidth);
    const totalHeight = lines.length * lineHeight;

    if (totalHeight <= maxHeight) {
      return { fontSize, lineHeight, lines, totalHeight };
    }
  }

  // Extremely long text: use the smallest readable size and tighter leading.
  const fontSize = 7;
  const lineHeight = 8.2;
  ctx.font = `500 ${fontSize}px "Zen Maru Gothic", "Hiragino Sans", "Yu Gothic", system-ui, sans-serif`;
  const lines = wrapText(ctx, text, maxWidth);
  return { fontSize, lineHeight, lines, totalHeight: lines.length * lineHeight };
}

async function createWishCard(wish: string): Promise<Blob> {
  const image = new Image();
  image.src = TEMPLATE_SRC;
  image.decoding = "async";

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Birthday card image could not be loaded."));
  });

  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth || 1085;
  canvas.height = image.naturalHeight || 1536;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const padding = 18;
  const maxWidth = TEXT_BOX.width - padding * 2;
  const maxHeight = TEXT_BOX.height - padding * 2;

  const layout = findTextLayout(ctx, wish, maxWidth, maxHeight);

  ctx.font = `500 ${layout.fontSize}px "Zen Maru Gothic", "Hiragino Sans", "Yu Gothic", system-ui, sans-serif`;
  ctx.fillStyle = "#6b4540";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(255, 251, 246, 0.55)";
  ctx.shadowBlur = Math.max(1, layout.fontSize * 0.12);

  const centerX = TEXT_BOX.left + TEXT_BOX.width / 2;
  const startY =
    TEXT_BOX.top + TEXT_BOX.height / 2 - layout.totalHeight / 2 + layout.lineHeight / 2;

  layout.lines.forEach((line, index) => {
    ctx.fillText(line, centerX, startY + index * layout.lineHeight, maxWidth);
  });

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not create the wish image."));
      },
      "image/png",
      1,
    );
  });
}

export function PrivateWish() {
  const [wish, setWish] = useState("");
  const [saved, setSaved] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const existing = localStorage.getItem(KEY);
      if (existing) {
        setWish(existing);
        setSaved(true);
      }
    } catch {
      /* private storage may be blocked */
    }
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  async function saveAndCreateCard() {
    const next = wish.trim();
    setError("");

    if (!next) {
      setSaved(false);
      return;
    }

    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore private-storage restrictions */
    }

    setIsCreating(true);

    try {
      const blob = await createWishCard(next);
      const nextUrl = URL.createObjectURL(blob);

      setPreviewUrl((oldUrl) => {
        if (oldUrl) URL.revokeObjectURL(oldUrl);
        return nextUrl;
      });
      setSaved(true);
    } catch {
      setError("カードを作れなかったみたい。もう一度試してね。");
    } finally {
      setIsCreating(false);
    }
  }

  function downloadCard() {
    if (!previewUrl) return;

    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = "aira-wish-card.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <form
      className="paper-card rounded-xl p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        void saveAndCreateCard();
      }}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-rose" strokeWidth={1.7} />
        <p className="font-display text-sm tracking-[0.18em] text-rose uppercase">
          A wish, only yours
        </p>
      </div>

      <h3 className="mt-2 font-sans text-2xl font-medium">星に、お願いを</h3>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        ここに書いた願いを、かわいいバースデーカードにして保存できるよ。
      </p>

      <label htmlFor="wish" className="sr-only">
        お願いごと
      </label>

      <textarea
        id="wish"
        value={wish}
        onChange={(e) => {
          setWish(e.target.value);
          setSaved(false);
          setError("");
        }}
        rows={6}
        placeholder="今年、こうだったらいいな…"
        className="mt-5 w-full resize-y rounded-md bg-paper px-4 py-3 text-base leading-relaxed text-ink placeholder:text-muted/70 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button type="submit" size="md" disabled={!wish.trim() || isCreating}>
          <Heart className="size-4" fill="currentColor" />
          {isCreating ? "カードを作ってる…" : "願いを保存する"}
        </Button>

        {saved && !isCreating && (
          <span className="text-sm text-muted">カードできたよ ♡</span>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-rose-deep">{error}</p>}

      {previewUrl && !isCreating && (
        <div className="mt-6 overflow-hidden rounded-xl bg-paper p-3">
          <img
            src={previewUrl}
            alt="あなたの願いが入ったバースデーカード"
            className="mx-auto max-h-[520px] w-auto rounded-lg shadow-paper"
          />

          <Button
            type="button"
            size="lg"
            variant="outline"
            className="mt-4 w-full"
            onClick={downloadCard}
          >
            <Download className="size-4" />
            DownloadしてGalleryに保存 📸
          </Button>

          <p className="mt-3 text-center text-xs leading-relaxed text-muted">
            スマホではブラウザの「ダウンロード」に保存されるよ。端末によっては写真アプリにも自動で表示されます。
          </p>
        </div>
      )}
    </form>
  );
}
