import Hero from "@/components/Hero";
import Features from "@/components/Features";
import RecentEvents from "@/components/RecentEvents";
import Gallery from "@/components/Gallery";
import Newsletter from "@/components/Newsletter";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <RecentEvents />
      <Gallery />
      <Newsletter />
      <Suspense fallback={<p>Loading events...</p>}>
        
      </Suspense>
    </>
  );
}