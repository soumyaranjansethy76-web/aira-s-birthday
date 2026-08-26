import { ChevronDown } from "lucide-react";
import { Cake } from "@/components/birthday/cake";
import { Hug } from "@/components/birthday/hug";
import { MusicToggle } from "@/components/birthday/music-toggle";
import { Petals } from "@/components/birthday/petals";
import { PrivateWish } from "@/components/birthday/private-wish";
import { Reveal } from "@/components/birthday/reveal";

const NOTES = [
  {
    ja: "今日は、輝かなくていい。",
    en: "You don't have to sparkle today. You already do — quietly, without trying.",
  },
  {
    ja: "がんばっているところ、見てるよ。",
    en: "I notice how hard you try. Even the parts you never mention.",
  },
  {
    ja: "あなたがいると、空気がやさしくなる。",
    en: "Rooms feel warmer when you're in them. That's not a small thing.",
  },
  {
    ja: "小さく感じた日も、ここに戻ってきて。",
    en: "If a day ever makes you feel small, come back here. I'll still mean every word.",
  },
];

const WISHES = [
  { ja: "やさしい朝を", en: "Mornings that don't rush you" },
  { ja: "心が軽くなる時間を", en: "Hours that feel light in your chest" },
  { ja: "あなたのペースで", en: "A year that moves at your pace" },
  { ja: "笑って、休んで", en: "Laughter, and rest without apology" },
  { ja: "大切にされること", en: "To be cared for, the way you care" },
  { ja: "あなたらしく", en: "To stay yourself, even as you grow" },
];

export function Experience() {
  return (
    <div className="relative bg-bg text-ink">
      <MusicToggle />

      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-24">
        <img
          src="/images/garden.jpg"
          alt="夕暮れの桜並木"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-0 bg-linear-to-b from-ink/15 via-ink/30 to-ink/55" />
        <Petals />
        <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
          <p className="font-display text-sm tracking-[0.32em] text-foam/80 uppercase">
            Happy Birthday
          </p>
          <h1 className="mt-4 font-sans text-6xl font-medium text-foam sm:text-7xl">あいら</h1>
          <p className="mt-6 font-sans text-xl text-petal sm:text-2xl">生まれてきてくれて、ありがとう</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-foam/80">
            今日という日が、あなたにいちばんやさしくありますように。
          </p>
        </div>
        <a
          href="#letter"
          className="absolute bottom-16 left-1/2 z-10 flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-ink/40 text-foam transition-[transform,opacity] duration-150 ease-out hover:bg-ink/55"
          aria-label="手紙へ"
        >
          <ChevronDown className="size-5" strokeWidth={1.5} />
        </a>
      </section>

      <section id="letter" className="px-5 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <figure className="overflow-hidden rounded-xl">
              <img
                src="/images/letter.jpg"
                alt="朝の光の中の手紙と花"
                className="aspect-4/3 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
              />
            </figure>
          </Reveal>
          <Reveal delay={80}>
            <article className="paper-card rounded-xl px-6 py-8 sm:px-9 sm:py-10">
              <p className="font-display text-sm tracking-[0.2em] text-rose uppercase">A letter</p>
              <h2 className="mt-2 font-sans text-3xl font-medium">あいらへ</h2>
              <div className="mt-6 space-y-5 text-base leading-loose text-ink">
                <p>うまく言おうとすると、言葉が足りなくなる。でも、あなたには、ちゃんと手間をかけたい人なんだと思う。</p>
                <p>
                  あなたがいると、何でもない時間が、少し大切に感じられる。聴いてくれること。そばにいてくれること。自分では気づいていない、やさしい強さ。
                </p>
                <p>
                  今日は、好きなものを食べて、ゆっくり休んで、「大切に思われている」って、ちゃんと感じられますように。
                </p>
                <p className="font-display text-lg italic leading-relaxed text-muted">
                  I made this because you deserve a day that was thought about. A day arranged with patience. A day that says, plainly — I'm glad you were born.
                </p>
                <p>生まれてきてくれて、ありがとう。お誕生日おめでとう。</p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-8 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-display text-sm tracking-[0.22em] text-rose uppercase">Things I keep noticing</p>
            <h2 className="mt-2 font-sans text-3xl font-medium sm:text-4xl">伝えたい、小さなこと</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {NOTES.map((note, i) => (
              <Reveal key={note.ja} delay={i * 70}>
                <article className="paper-card h-full rounded-lg p-6 sm:p-7">
                  <p className="text-lg font-medium leading-relaxed">{note.ja}</p>
                  <p className="mt-3 font-display text-base italic leading-relaxed text-muted">{note.en}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cake />

      <section className="relative overflow-hidden px-5 py-24 sm:py-32">
        <img
          src="/images/night.jpg"
          alt="月の映る庭の池"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-night/70" />
        <div className="relative z-10 mx-auto max-w-5xl text-foam">
          <Reveal>
            <p className="font-display text-sm tracking-[0.22em] text-petal uppercase">For this year</p>
            <h2 className="mt-2 font-sans text-3xl font-medium sm:text-4xl">今年の、お願いごと</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-foam/75">
              大きな夢じゃなくていい。あなたが、少し楽に息ができるように。
            </p>
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WISHES.map((w, i) => (
              <Reveal key={w.ja} delay={i * 50}>
                <article className="rounded-lg bg-foam/10 px-5 py-5 outline outline-1 outline-foam/15">
                  <p className="text-lg font-medium">{w.ja}</p>
                  <p className="mt-1 font-display text-sm italic text-foam/70">{w.en}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <figure className="overflow-hidden rounded-xl">
              <img
                src="/images/bouquet.jpg"
                alt="芍薬と桜の花束"
                className="aspect-3/4 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
              />
            </figure>
          </Reveal>
          <Reveal delay={80} className="flex flex-col gap-8">
            <div>
              <p className="font-display text-sm tracking-[0.22em] text-rose uppercase">A small bouquet</p>
              <h2 className="mt-2 font-sans text-3xl font-medium sm:text-4xl">花を、届けたかった</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                本当なら、手渡ししたかった。今日は画面の向こうからでも、あなたが少し華やいだ気持ちになれますように。
              </p>
            </div>
            <PrivateWish />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 pb-36 sm:py-32">
        <img
          src="/images/window.jpg"
          alt="窓辺の花とティーカップ"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="relative z-10 mx-auto max-w-md">
          <Reveal>
            <div className="paper-card rounded-xl px-6 py-10 text-center sm:px-8">
              <p className="font-display text-sm tracking-[0.22em] text-rose uppercase">Before you go</p>
              <h2 className="mt-3 font-sans text-3xl font-medium">ひとつだけ、渡したいもの</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                もし今日、ひとつだけ贈れるなら。大切にされている、という感覚を。
              </p>
              <div className="mt-8">
                <Hug />
              </div>
              <p className="mt-10 font-display text-2xl italic text-ink">Happy birthday, あいら.</p>
              <p className="mt-2 text-sm text-muted">今日も、明日も、その先も。</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
