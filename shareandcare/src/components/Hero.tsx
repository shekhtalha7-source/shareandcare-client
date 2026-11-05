import Link from "next/link";
import { ArrowRight, HeartHandshake, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
  { value: "6+", label: "Event types" },
  { value: "Free", label: "To join" },
  { value: "1 click", label: "To volunteer" },
  { value: "Local", label: "Near you" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-background to-background dark:from-emerald-950/60" />
      <div className="absolute left-1/2 top-0 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6 md:py-28">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          <Sparkles className="size-4" />
          Winter drives are open
        </span>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Share Your Time,
          <span className="block text-emerald-500">
            Care For Your Community
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Find clothes and blanket drives, plantation days and cleanups near
          you. Join in one click, or create an event and invite your
          neighbours.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/events"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-emerald-500 text-white hover:bg-emerald-600"
            )}
          >
            Explore events
            <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link
            href="/events/create"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            <HeartHandshake className="mr-2 size-4" />
            Create an event
          </Link>
        </div>

        <dl className="mt-14 grid w-full grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-2xl font-bold sm:text-3xl">{s.value}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}