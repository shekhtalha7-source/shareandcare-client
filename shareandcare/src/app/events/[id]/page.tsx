import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getEventById } from "@/lib/api";
import JoinButton from "@/components/JoinButton";

type Params = Promise<{ id: string }>;

async function EventDetailsContent({ params }: { params: Params }) {
  await connection();

  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

  const date = new Date(event.eventDate);
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const isExpired = date < startOfToday;

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/events"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to events
      </Link>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.thumbnail}
        alt={event.title}
        className="mt-6 h-72 w-full rounded-2xl object-cover sm:h-96"
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
          {event.eventType}
        </span>
        {isExpired && (
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500">
            Ended
          </span>
        )}
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">{event.title}</h1>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
        <p>📍 {event.location}</p>
        <p>📅 {formattedDate}</p>
      </div>

      <p className="mt-6 leading-relaxed text-muted-foreground">
        {event.description}
      </p>

      <div className="mt-8">
        {isExpired ? (
          <button
            disabled
            className="w-full cursor-not-allowed rounded-lg bg-muted px-4 py-3 text-muted-foreground sm:w-auto"
          >
            Event ended
          </button>
        ) : (
          <JoinButton eventId={event._id} />
        )}
      </div>
    </div>
  );
}

export default function EventDetailsPage({ params }: { params: Params }) {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-muted-foreground">
          Loading event...
        </div>
      }
    >
      <EventDetailsContent params={params} />
    </Suspense>
  );
}