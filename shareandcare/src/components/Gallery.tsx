"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Maximize2, X } from "lucide-react";

type PastEvent = {
  src: string;
  title: string;
  tag: string;
  place: string;
  date: string;
  note: string;
};

const pastEvents: PastEvent[] = [
  {
    src: "/gallery/winter.jpg",
    title: "Winter Clothes Distribution",
    tag: "Donation",
    place: "Mirpur 10, Dhaka",
    date: "Dec 2025",
    note: "Warm garments given to families in need",
  },
  {
    src: "/gallery/blanket.jpg",
    title: "Blanket Drive",
    tag: "Donation",
    place: "Mohammadpur, Dhaka",
    date: "Jan 2026",
    note: "Blankets shared with street dwellers",
  },
  {
    src: "/gallery/tree.jpg",
    title: "Tree Plantation Day",
    tag: "Plantation",
    place: "Khulna Sadar",
    date: "Jul 2026",
    note: "Saplings planted by volunteers",
  },
  {
    src: "/gallery/cleanup.jpg",
    title: "Riverside Cleanup",
    tag: "Cleanup",
    place: "Rupsha, Khulna",
    date: "Aug 2026",
    note: "Plastic waste collected from the riverbank",
  },
  {
    src: "/gallery/free meal.jpg",
    title: "Free Meal Day",
    tag: "Food",
    place: "Gulshan 1, Dhaka",
    date: "Sep 2026",
    note: "Hot meals served to people in need",
  },
  {
    src: "/gallery/blood donation.jpg",
    title: "Blood Donation Camp",
    tag: "Health",
    place: "Khulna Medical College",
    date: "Oct 2026",
    note: "Donors joined hands to save lives",
  },
];

export default function Gallery() {
  const [active, setActive] = useState<PastEvent | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">Our past events</h2>
        <p className="mt-2 text-muted-foreground">
          A look back at what the ShareAndCare community has done together.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pastEvents.map((e) => (
          <button
            key={e.title}
            type="button"
            onClick={() => setActive(e)}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border bg-muted text-left shadow-sm transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={e.src}
              alt={e.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* ওপরের ব্যাজ ও তারিখ */}
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow">
                {e.tag}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-black/55 px-3 py-1 text-xs text-white backdrop-blur">
                <CalendarDays className="size-3" />
                {e.date}
              </span>
            </div>

            {/* নিচের ক্যাপশন */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-16 text-white">
              <h3 className="text-lg font-semibold leading-tight">{e.title}</h3>
              <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/85 opacity-0 transition-all duration-300 group-hover:max-h-12 group-hover:opacity-100">
                {e.note}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-white/75">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  {e.place}
                </span>
                <Maximize2 className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* লাইটবক্স */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-card shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
            >
              <X className="size-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.title}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-5">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {active.tag}
              </span>
              <h3 className="mt-3 text-xl font-semibold">{active.title}</h3>
              <p className="mt-1 text-muted-foreground">{active.note}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-4" />
                  {active.place}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-4" />
                  {active.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}