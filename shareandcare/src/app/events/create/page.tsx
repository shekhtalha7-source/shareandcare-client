"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const minDate = useSyncExternalStore(subscribe, getMinDate, () => "");

  function validate(f: FormData): Errors {
    const e: Errors = {};
    const title = String(f.get("title") || "").trim();
    const description = String(f.get("description") || "").trim();
    const thumbnail = String(f.get("thumbnail") || "").trim();
    const location = String(f.get("location") || "").trim();
    const eventDate = String(f.get("eventDate") || "");

    if (title.length < 3) e.title = "Title must be at least 3 characters";
    if (description.length < 20)
      e.description = "Description must be at least 20 characters";
    if (!f.get("eventType")) e.eventType = "Please select an event type";
    if (!isValidImageUrl(thumbnail))
      e.thumbnail = "Enter a valid image link (http or https)";
    if (location.length < 3) e.location = "Location is required";

    if (!eventDate) e.eventDate = "Pick an event date";
    else if (minDate && eventDate < minDate)
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

    setLoading(true);
    try {
      const { data } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.token}`,
        },
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
        toast.error(result.message || "Could not create the event");
        return;
      }

      toast.success("Event created successfully");
      router.push("/events");
      router.refresh();
    } catch {
      toast.error("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  }

  const err = (name: string) =>
    errors[name] ? (
      <p className="text-sm text-red-500">{errors[name]}</p>
    ) : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Create an event</h1>
      <p className="mt-2 text-muted-foreground">
        Organise a drive and invite your community to join.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="title">Event title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Winter Clothes Distribution"
          />
          {err("title")}
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventType">Event type</Label>
          <select
            id="eventType"
            name="eventType"
            defaultValue=""
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="" disabled>
              Select a type
            </option>
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
            placeholder="What will happen, who it helps, what volunteers should bring..."
          />
          {err("description")}
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail">Thumbnail image URL</Label>
          <Input id="thumbnail" name="thumbnail" placeholder="https://..." />
          {err("thumbnail")}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Mirpur 10, Dhaka"
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
            />
            {err("eventDate")}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
        >
          {loading ? "Creating..." : "Create event"}
        </Button>
      </form>
    </div>
  );
}