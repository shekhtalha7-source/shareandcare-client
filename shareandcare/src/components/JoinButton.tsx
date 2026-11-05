"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function JoinButton({ eventId }: { eventId: string }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  // already joined? check once the user is known
  useEffect(() => {
    if (!session) return;
    let cancelled = false;

    async function check() {
      try {
        const { data } = await authClient.token();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/joined-events`,
          { headers: { Authorization: `Bearer ${data?.token}` } }
        );
        if (!res.ok) return;
        const list: { eventId: string }[] = await res.json();
        if (!cancelled && list.some((j) => j.eventId === eventId)) {
          setJoined(true);
        }
      } catch {
        /* ignore */
      }
    }
    check();
    return () => {
      cancelled = true;
    };
  }, [session, eventId]);

  async function handleJoin() {
    if (!session) {
      toast.error("Please login to join this event");
      router.push(`/login?redirect=/events/${eventId}`);
      return;
    }

    setLoading(true);
    try {
      const { data } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.token}`,
        },
        body: JSON.stringify({ eventId }),
      });
      const result = await res.json();

      if (res.status === 409) {
        setJoined(true);
        toast.info("You have already joined this event");
        return;
      }
      if (!res.ok) {
        toast.error(result.message || "Could not join the event");
        return;
      }

      setJoined(true);
      toast.success("You joined the event");
    } catch {
      toast.error("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleJoin}
      disabled={loading || isPending || joined}
      size="lg"
      className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
    >
      {joined ? "Joined" : loading ? "Joining..." : "Join Event"}
    </Button>
  );
}