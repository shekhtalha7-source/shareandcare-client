import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Tag, User } from "lucide-react";
import JoinButton from "@/components/JoinButton";
import { getEventById } from "@/lib/api";

async function EventDetails({ id }: { id: string }) {
  const event = await getEventById(id);
  if (!event) notFound();

  const date = new Date(event.eventDate).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="relative mt-5 overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-64 w-full bg-muted object-cover sm:h-96"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 p-6 text-white sm:p-8">
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold">
            {event.eventType}
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="text-xl font-semibold">About this event</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </section>

        <aside className="h-fit space-y-5 rounded-2xl border bg-card p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-semibold">Event details</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <CalendarDays className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <div>
                <p className="text-muted-foreground">Date</p>
                <p className="font-medium">{date}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Tag className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <div>
                <p className="text-muted-foreground">Type</p>
                <p className="font-medium">{event.eventType}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <User className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <div className="min-w-0">
                <p className="text-muted-foreground">Organiser</p>
                <p className="break-all font-medium">{event.creatorEmail}</p>
              </div>
            </li>
          </ul>
          <JoinButton eventId={event._id} />
        </aside>
      </div>
    </>
  );
}

function DetailsSkeleton() {
  return (
    <div className="mt-5 space-y-6">
      <div className="h-64 animate-pulse rounded-3xl bg-muted sm:h-96" />
      <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
      <div className="h-24 animate-pulse rounded bg-muted" />
    </div>
  );
}

export default function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-500"
      >
        <ArrowLeft className="size-4" />
        Back to events
      </Link>

      <Suspense fallback={<DetailsSkeleton />}>
        <DetailsLoader params={params} />
      </Suspense>
    </div>
  );
}

async function DetailsLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EventDetails id={id} />;
}