import { Suspense } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import RecentEvents from "@/components/RecentEvents";
import Gallery from "@/components/Gallery";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-muted" />
              ))}
            </div>
          </div>
        }
      >
        <RecentEvents />
      </Suspense>
      <Gallery />
      <Newsletter />
    </>
  );
}