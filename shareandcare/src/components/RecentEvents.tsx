import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EventCard from "@/components/EventCard";
import { getRecentEvents } from "@/lib/api";
import { Suspense } from "react";

 async function RecentEventsContent() {
  const events = await getRecentEvents();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Upcoming events
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join a drive happening near you.
          </p>
        </div>
        <Link
          href="/events"
          className="hidden items-center gap-1 text-sm font-medium text-emerald-600 hover:underline sm:flex dark:text-emerald-400"
        >
          View all <ArrowRight className="size-4" />
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
          No upcoming events yet. Be the first to create one.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
export default function RecentEvents() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-muted-foreground">
          Loading events...
        </div>
      }
    >
      <RecentEventsContent />
    </Suspense>
  );
}