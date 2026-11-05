import type { EventItem } from "@/types/event";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getRecentEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(`${API}/events/recent`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getEvents(params?: {
  type?: string;
  search?: string;
}): Promise<EventItem[]> {
  try {
    const query = new URLSearchParams();
    if (params?.type) query.set("type", params.type);
    if (params?.search) query.set("search", params.search);

    const res = await fetch(`${API}/events?${query.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getEventById(id: string): Promise<EventItem | null> {
  try {
    const res = await fetch(`${API}/events/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}