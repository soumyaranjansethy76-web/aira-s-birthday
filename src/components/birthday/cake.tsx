import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/birthday/reveal";
import { cn } from "@/lib/utils";

const CANDLES = [0, 1, 2, 3, 4];

export function Cake() {
  const [lit, setLit] = useState(false);
  const [wished, setWished] = useState(false);
  const [smoking, setSmoking] = useState(false);

  function light() {
    setLit(true);
    setWished(false);
    setSmoking(false);
  }

  function wish() {
    setLit(false);
    setSmoking(true);
    setWished(true);
  }

  return (
    <section className="px-5 py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <figure className="overflow-hidden rounded-xl">
            <img
              src="/images/cake.jpg"
              alt="バラのクリームで飾った、小さなバースデーケーキ"
              className="aspect-4/3 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
            />
          </figure>
        </Reveal>

        <Reveal delay={80}>
          <p className="font-display text-sm tracking-[0.22em] text-rose uppercase">A cake, for you</p>
          <h2 className="mt-3 font-sans text-3xl font-medium sm:text-4xl">ケーキに、火を灯して</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            お願いごとは、声に出さなくていい。心の中で、そっと。
          </p>

          <div className="mt-8 flex flex-col items-center sm:items-start">
            <div
              className="flex items-end justify-center gap-4 rounded-lg bg-paper px-7 pt-5 pb-4"
              aria-hidden="true"
            >
              {CANDLES.map((i) => (
                <div key={i} className="flex w-5 flex-col items-center">
                  <div className="flex h-5 items-end justify-center">
                    {lit ? <span className="flame" /> : smoking ? <span className="smoke" /> : <span className="h-4" />}
                  </div>
                  <span className={cn("mt-0.5 h-10 w-1.5 rounded-full", i % 2 === 0 ? "bg-rose" : "bg-petal")} />
                  <span className="mt-1 size-2 rounded-full bg-ink/20" />
                </div>
              ))}
            </div>

            <div className="mt-6 flex min-h-12 items-center">
              {!lit && !wished ? (
                <Button type="button" onClick={light}>
                  キャンドルに火を灯す
                </Button>
              ) : lit ? (
                <Button type="button" onClick={wish}>
                  お願いごとをする
                </Button>
              ) : (
                <p className="font-sans text-lg text-rose">叶いますように。</p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
