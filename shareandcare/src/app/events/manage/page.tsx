"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EventItem } from "@/types/event";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await authFetch("/my-events");
        if (!res.ok) throw new Error();
        setEvents(await res.json());
      } catch {
        toast.error("Could not load your events");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await authFetch(`/events/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Could not delete the event");
        return;
      }
      setEvents((prev) => prev.filter((e) => e._id !== id));
      toast.success("Event deleted");
    } catch {
      toast.error("Network error. Is the server running?");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage events</h1>
          <p className="mt-2 text-muted-foreground">
            Events you created. Update or delete them here.
          </p>
        </div>
        <Link
          href="/events/create"
          className={cn(
            buttonVariants(),
            "bg-emerald-500 text-white hover:bg-emerald-600"
          )}
        >
          New event
        </Link>
      </div>

      {loading ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
          You have not created any event yet.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <article
              key={e._id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={e.thumbnail}
                alt={e.title}
                className="h-48 w-full bg-muted object-cover"
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

                <div className="mt-auto flex gap-2 pt-5">
                  {confirmId === e._id ? (
                    <>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        disabled={deletingId === e._id}
                        onClick={() => handleDelete(e._id)}
                      >
                        {deletingId === e._id ? "Deleting..." : "Confirm"}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setConfirmId(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`/events/manage/${e._id}/edit`}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "flex-1"
                        )}
                      >
                        <Pencil className="mr-2 size-4" />
                        Update
                      </Link>
                      <Button
                        variant="outline"
                        className="flex-1 text-red-500"
                        onClick={() => setConfirmId(e._id)}
                      >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}