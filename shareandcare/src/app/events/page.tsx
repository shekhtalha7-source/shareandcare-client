import { Suspense } from "react";
import EventCard from "@/components/EventCard";
import EventFilters from "@/components/EventFilters";
import { getEvents } from "@/lib/api";

async function EventList({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; type?: string }>;
}) {
  const { search = "", type = "" } = await searchParams;
  const events = await getEvents({ search, type });

  return (
    <>
      <div className="mt-8">
        <EventFilters initialSearch={search} initialType={type} />
      </div>

      {events.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
          No events match your search.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </>
  );
}

export default function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; type?: string }>;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Upcoming events</h1>
      <p className="mt-2 text-muted-foreground">
        Find a community drive and join in one click.
      </p>

      <Suspense
        fallback={
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        }
      >
        <EventList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}