"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authFetch } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EventItem } from "@/types/event";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Donation",
  "Food Distribution",
  "Education",
  "Health Camp",
  "Other",
];

type Errors = Partial<Record<string, string>>;

const subscribe = () => () => {};

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function isValidImageUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const minDate = useSyncExternalStore(subscribe, getMinDate, () => "");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`
        );
        if (!res.ok) throw new Error();
        setEvent(await res.json());
      } catch {
        toast.error("Could not load the event");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function validate(f: FormData): Errors {
    const e: Errors = {};
    const date = String(f.get("eventDate") || "");

    if (String(f.get("title")).trim().length < 3)
      e.title = "Title must be at least 3 characters";
    if (String(f.get("description")).trim().length < 20)
      e.description = "Description must be at least 20 characters";
    if (!f.get("eventType")) e.eventType = "Please select an event type";
    if (!isValidImageUrl(String(f.get("thumbnail")).trim()))
      e.thumbnail = "Enter a valid image link (http or https)";
    if (String(f.get("location")).trim().length < 3)
      e.location = "Location is required";

    if (!date) e.eventDate = "Pick an event date";
    else if (minDate && date < minDate)
      e.eventDate = "Event date must be in the future";

    return e;
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setSaving(true);
    try {
      const res = await authFetch(`/events/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: String(form.get("title")).trim(),
          description: String(form.get("description")).trim(),
          eventType: form.get("eventType"),
          thumbnail: String(form.get("thumbnail")).trim(),
          location: String(form.get("location")).trim(),
          eventDate: form.get("eventDate"),
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Could not update the event");
        return;
      }
      toast.success("Event updated successfully");
      router.push("/events/manage");
      router.refresh();
    } catch {
      toast.error("Network error. Is the server running?");
    } finally {
      setSaving(false);
    }
  }

  const err = (name: string) =>
    errors[name] ? (
      <p className="text-sm text-red-500">{errors[name]}</p>
    ) : null;

  if (loading) {
    return (
      <div className="mx-auto mt-12 h-96 max-w-2xl animate-pulse rounded-2xl bg-muted" />
    );
  }
  if (!event) {
    return (
      <p className="py-24 text-center text-muted-foreground">
        Event not found.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Update event</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="title">Event title</Label>
          <Input id="title" name="title" defaultValue={event.title} />
          {err("title")}
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventType">Event type</Label>
          <select
            id="eventType"
            name="eventType"
            defaultValue={event.eventType}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          >
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {err("eventType")}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={event.description}
          />
          {err("description")}
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail">Thumbnail image URL</Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            defaultValue={event.thumbnail}
          />
          {err("thumbnail")}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={event.location}
            />
            {err("location")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventDate">Event date</Label>
            <Input
              id="eventDate"
              name="eventDate"
              type="date"
              min={minDate}
              defaultValue={event.eventDate.slice(0, 10)}
            />
            {err("eventDate")}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.push("/events/manage")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="flex-1 bg-emerald-500 text-white hover:bg-emerald-600"
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}