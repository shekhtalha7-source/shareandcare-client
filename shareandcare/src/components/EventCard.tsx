import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EventItem } from "@/types/event";

export default function EventCard({ event }: { event: EventItem }) {
  const date = new Date(event.eventDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.thumbnail}
        alt={event.title}
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {event.eventType}
        </span>
        <h3 className="mt-3 line-clamp-1 text-lg font-semibold">
          {event.title}
        </h3>
        <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" />
            {date}
          </p>
        </div>
        <Link
          href={`/events/${event._id}`}
          className={cn(
            buttonVariants(),
            "mt-auto w-full bg-emerald-500 text-white hover:bg-emerald-600"
          )}
        >
          View Event
        </Link>
      </div>
    </article>
  );
}