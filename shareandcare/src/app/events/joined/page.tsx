"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api-client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type JoinedItem = {
  _id: string;
  eventId: string;
  title: string;
  thumbnail: string;
  location: string;
  eventType: string;
  eventDate: string;
};

export default function JoinedEventsPage() {
  const [items, setItems] = useState<JoinedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await authFetch("/joined-events");
        if (!res.ok) throw new Error();
        setItems(await res.json());
      } catch {
        toast.error("Could not load your joined events");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Joined events</h1>
      <p className="mt-2 text-muted-foreground">
        Events you have joined, sorted by date.
      </p>

      {loading ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
          You have not joined any event yet.{" "}
          <Link href="/events" className="text-emerald-500 underline">
            Browse events
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((e) => (
            <article
              key={e._id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={e.thumbnail}
                alt={e.title}
                className="h-48 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {e.eventType}
                </span>
                <h3 className="mt-3 line-clamp-1 text-lg font-semibold">
                  {e.title}
                </h3>
                <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4 shrink-0" />
                    <span className="line-clamp-1">{e.location}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays className="size-4 shrink-0" />
                    {new Date(e.eventDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Link
                  href={`/events/${e.eventId}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "mt-auto w-full"
                  )}
                >
                  View Event
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}